const userService = require('./user.service');
const userRoute = require('./user.route');
const userController = require('./user.controller');
const userValidation = require('./user.validation');
const User = require('./user.model');

module.exports = {
  User,
  userService,
  userRoute,
  userController,
  userValidation,
};
