const express = require('express');
const { validate } = require('../../middlewares');
const authValidation = require('./auth.validation');
const authController = require('./auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);
router.post(
  '/activate/:inviteId',
  validate(authValidation.activate),
  authController.activate
);
router.get('/myself', auth(), authController.getMyself);
router.get('/logout', auth(), authController.logout);

module.exports = router;
