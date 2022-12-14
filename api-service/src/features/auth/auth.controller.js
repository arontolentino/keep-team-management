const httpStatus = require('http-status');
const { catchAsync, ApiError } = require('../../utils');
const authService = require('./auth.service');
const { userService } = require('../user');
const { businessService } = require('../business');
const { tokenService } = require('../token');
const { inviteService } = require('../invite');
const knex = require('../../config/knex');
const { ROLE_TYPES } = require('./auth.constants');
const { TOKEN_TYPES } = require('../token/token.constants');

const login = catchAsync(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const tokens = await tokenService.generateAuthTokens(user);

  await authService.generateCookies(tokens, res, rememberMe);

  res.send({ success: true, data: user });
});

const register = catchAsync(async (req, res) => {
  await knex.transaction(async (trx) => {
    let user = await userService.getUserByEmail(req.body.email, trx);

    if (user) {
      throw new ApiError(409, 'Email is already registered');
    }

    const newBusiness = { name: req.body.businessName };

    const business = await businessService.createBusiness(newBusiness, trx);

    const newUser = {
      roleId: ROLE_TYPES.ADMIN,
      businessId: business.businessId,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };

    user = await userService.createUser(newUser, trx);

    const tokens = await tokenService.generateAuthTokens(user, trx);

    await authService.generateCookies(tokens, res);

    res.status(httpStatus.CREATED).send({ success: true, data: user });
  });
});

const activate = catchAsync(async (req, res) => {
  await knex.transaction(async (trx) => {
    let invite = await inviteService.getInviteById(req.params.inviteId, trx);

    if (!invite) {
      throw new ApiError(404, 'Invite not found');
    }

    const newUser = {
      roleId: invite.role.roleId,
      businessId: invite.businessId,
      email: invite.email,
      name: invite.name,
      password: req.body.password,
    };

    user = await userService.createUser(newUser, trx);

    const tokens = await tokenService.generateAuthTokens(user, trx);

    await authService.generateCookies(tokens, res);

    await inviteService.deleteInviteById(invite.inviteId, trx);

    res.status(httpStatus.CREATED).send({ success: true, data: user });
  });
});

const getMyself = catchAsync(async (req, res) => {
  const { user } = req;

  res.send(user);
});

const logout = catchAsync(async (req, res) => {
  const refreshToken = await tokenService.getToken(
    req.cookies.refreshToken,
    TOKEN_TYPES.REFRESH
  );

  if (!refreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }

  console.log(refreshToken);
  console.log(refreshToken.tokenId);

  await tokenService.deleteTokenById(refreshToken.tokenId);

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { login, register, logout, getMyself, activate };
