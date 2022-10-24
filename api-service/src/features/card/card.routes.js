const express = require('express');
const { validate } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const cardController = require('./card.controller');
const router = express.Router();

router.post(
  '/',
  auth(['ADD_CARD']),
  // validate(userValidation.inviteUser),
  cardController.createCard
);
