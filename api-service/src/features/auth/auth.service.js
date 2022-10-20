const { ApiError } = require('../../utils');
const { userService } = require('../user');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  return user;
};

/**
 * Generate auth cookies
 * @param {object} tokens
 * @param {object} res
 * @param {boolean} rememberMe
 * @returns {Promise}
 */
const generateCookies = async (tokens, res, rememberMe = false) => {
  const { access, refresh } = tokens;

  res.cookie('accessToken', access.token, {
    expires: rememberMe ? null : access.expires,
    httpOnly: true,
  });

  res.cookie('refreshToken', refresh.token, {
    expires: rememberMe ? null : access.expires,
    httpOnly: true,
  });
};

module.exports = { loginUserWithEmailAndPassword, generateCookies };
