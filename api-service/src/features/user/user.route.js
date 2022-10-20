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
router.post('/', userController.inviteUser);

module.exports = router;
