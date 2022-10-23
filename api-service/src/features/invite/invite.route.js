const express = require('express');
const { validate } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const inviteController = require('./invite.controller');
const inviteValidation = require('./invite.validation');

const router = express.Router();

router.get(
  '/',
  auth(['VIEW_USERS']),
  validate(inviteValidation.getInvites),
  inviteController.getInvites
);

router.get(
  '/:inviteId',
  validate(inviteValidation.getInvite),
  inviteController.getInvite
);

module.exports = router;
