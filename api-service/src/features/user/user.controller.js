const { catchAsync } = require('../../utils');
const userService = require('./user.service');
const { inviteService } = require('../invite');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.queryUsers(req.query);

  res.send({ success: true, data: users });
});

const inviteUser = catchAsync(async (req, res) => {
  const invite = await inviteService.createInvite(req.body);

  res.send({ success: true, data: invite });
});

module.exports = { getUsers, inviteUser };
