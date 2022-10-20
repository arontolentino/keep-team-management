const User = require('./user.model');

/**
 * Create a user
 * @param {Object} reqBody
 * @param {Object} trx
 * @returns {Promise<User>}
 */
const createUser = async (reqBody, trx = null) => {
  const user = await User.query(trx).insert(reqBody);

  return user;
};

/**
 * @dec Get user by email
 * @param {string} email
 * @param {object} trx
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email, trx = null) => {
  return User.query(trx)
    .findOne({ email })
    .withGraphFetched('[role(defaultSelects).[permissions()]]')
    .modify('defaultSelects');
};

/**
 * Query for users
 * @param {Object} reqQuery
 * @param {Object} trx
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (reqQuery, trx = null) => {
  const users = await User.query(trx)
    .withGraphFetched('[role(defaultSelects)]')
    .page(reqQuery.page - 1, reqQuery.pageSize);

  return users;
};

module.exports = { createUser, getUserByEmail, queryUsers };
