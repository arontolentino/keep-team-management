const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallback =
  (req, resolve, reject, requiredPermissions) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
      );
    }

    req.user = user;

    if (requiredPermissions && requiredPermissions.length) {
      const userPermissions = user.role.permissions.map(
        (permissionn) => permissionn.name
      );

      const hasRequiredPermissions = requiredPermissions.every(
        (requiredPermissions) => userPermissions.includes(requiredPermissions)
      );

      if (!hasRequiredPermissions) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
  };

/**
 * Auth Middleware
 * @param {boolean} optional
 */
const auth = (requiredPermissions) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject, requiredPermissions)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
