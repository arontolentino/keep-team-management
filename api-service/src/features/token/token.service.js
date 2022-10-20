const jwt = require('jsonwebtoken');
const moment = require('moment');
const { TOKEN_TYPES } = require('./token.constants');
const Token = require('./token.model');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  console.log(process.env.JWT_SECRET);
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {Object} transaction
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, trx = null) => {
  const tokenDoc = await Token.query(trx).insert({
    token,
    userId,
    expires: expires.toDate(),
    type,
  });

  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User}  user
 * @param {Object} transaction
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user, transaction) => {
  const accessTokenExpires = moment().add(
    process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes'
  );

  const accessToken = generateToken(
    user.userId,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS
  );

  const refreshTokenExpires = moment().add(
    process.env.JTW_REFRESH_EXPIRATION_DAYS,
    'days'
  );

  const refreshToken = generateToken(
    user.userId,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH
  );

  await saveToken(
    refreshToken,
    user.userId,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH,
    transaction
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = { generateToken, generateAuthTokens };
