const { catchAsync } = require('../../utils');
const inviteService = require('./invite.service');

const getInvites = catchAsync(async (req, res) => {
  const invites = await inviteService.queryInvites(
    req.query,
    req.user.businessId
  );

  res.send({ success: true, data: invites });
});

const getInvite = catchAsync(async (req, res) => {
  const invite = await inviteService.getInviteById(req.params.inviteId);

  res.send({ success: true, data: invite });
});

module.exports = { getInvites, getInvite };
