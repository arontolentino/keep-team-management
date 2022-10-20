const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { TOKEN_TYPES } = require('../features/token/token.constants');
const { userService } = require('../features/user');

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }

  return token;
};

const jwtOptions = {
  secretOrKey: 'sampleSecret',
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error('Invalid token type');
    }

    const user = await userService.getUserById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
