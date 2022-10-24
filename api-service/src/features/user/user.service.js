const User = require('./user.model');

/**
 * Create a user
 * @param {Object} reqBody
 * @param {Object} trx
 * @returns {Promise<User>}
 */
const createUser = async (reqBody, trx = null) => {
  let user = await User.query(trx).insert(reqBody).returning('*');

  user = await getUserById(user.userId, trx);

  return user;
};

/**
 * @dec Get user by id
 * @param {uuid} userId
 * @param {object} trx
 * @returns {Promise<User>}
 */
const getUserById = async (userId, trx = null) => {
  return User.query(trx)
    .findById(userId)
    .withGraphFetched('[role(defaultSelects).[permissions()]]')
    .modify('defaultSelects');
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
 * @param {object} reqQuery
 * @param {uuid} businessId
 * @param {object} trx
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (reqQuery, businessId, trx = null) => {
  const users = await User.query(trx)
    .where('businessId', businessId)
    .withGraphFetched('[role(defaultSelects)]')
    .modify(function (builder) {
      if (reqQuery.searchTerm) {
        builder.where('businessId', businessId).andWhere((builder) => {
          builder
            .where('name', 'ilike', `%${reqQuery.searchTerm}%`)
            .orWhere('email', 'ilike', `%${reqQuery.searchTerm}%`);
        });
      }

      if (reqQuery.sortBy && reqQuery.sortDirection)
        builder.orderBy(reqQuery.sortBy, reqQuery.sortDirection);
    })
    .page(reqQuery.page - 1, reqQuery.pageSize);

  return users;
};

module.exports = { createUser, getUserByEmail, getUserById, queryUsers };
