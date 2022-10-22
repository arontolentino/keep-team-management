const { catchAsync, ApiError } = require('../../utils');
const userService = require('./user.service');
const { inviteService } = require('../invite');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.queryUsers(req.query, req.user.businessId);

  res.send({ success: true, data: users });
});

const getInvites = catchAsync(async (req, res) => {
  const invites = await inviteService.queryInvites(
    req.query,
    req.user.businessId
  );

  res.send({ success: true, data: invites });
});

const inviteUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);

  if (user) {
    throw new ApiError(409, 'Email is already registered');
  }

  const invite = await inviteService.createInvite(
    req.body,
    req.user.businessId
  );

  res.send({ success: true, data: invite });
});

module.exports = { getUsers, inviteUser, getInvites };
