const express = require('express');
const { authRoute } = require('../features/auth');
const { userRoute } = require('../features/user');
const { inviteRoute } = require('../features/invite');

const router = express.Router();

const routes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/invites', route: inviteRoute },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
