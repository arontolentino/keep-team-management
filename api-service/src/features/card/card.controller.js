const { catchAsync, ApiError } = require('../../utils');
const { userService } = require('../user');
const cardService = require('./card.service');

const createCard = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.body.userId);

  if (!user) {
    throw new ApiError(409, 'User does not exist');
  }

  const card = await cardService.createCard(req.body, req.user.businessId);

  res.send({ success: true, data: card });
});

module.exports = { createCard };
