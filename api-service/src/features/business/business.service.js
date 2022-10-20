const Business = require('./business.model');

/**
 * Create a user
 * @param {Object} newBusiness
 * @param {Object} trx
 * @returns {Promise<User>}
 */
const createBusiness = async (newBusiness, trx = null) => {
  const business = await Business.query(trx).insert(newBusiness);

  return business;
};

module.exports = { createBusiness };
