const Card = require('./card.model');

/**
 * Create a card
 * @param {Object} reqBody
 * @param {Object} trx
 * @returns {Promise<User>}
 */
const createCard = async (reqBody, trx = null) => {
  const card = await Card.query(trx).insert(reqBody);

  return card;
};

module.exports = { createCard };
