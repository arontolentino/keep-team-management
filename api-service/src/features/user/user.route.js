const express = require('express');
const { validate } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const userController = require('./user.controller');
const userValidation = require('./user.validation');

const router = express.Router();

router.get(
  '/',
  auth(['VIEW_USERS']),
  validate(userValidation.getUsers),
  userController.getUsers
);
router.get(
  '/invited',
  auth(['VIEW_USERS']),
  // validate(userValidation.getUsers),
  userController.getUsers
);
router.post(
  '/',
  auth(['ADD_USERS']),
  validate(userValidation.inviteUser),
  userController.inviteUser
);

module.exports = router;
