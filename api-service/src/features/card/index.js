const Card = require('./card.model');
const cardController = require('./card.controller');
const cardService = require('./card.service');
const cardRoute = require('./card.routes');

module.exports = { Card, cardController, cardService, cardRoute };
