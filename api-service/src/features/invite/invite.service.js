const { ROLE_TYPES } = require('../auth/auth.constants');
const Invite = require('./invite.model');

/**
 * Create an invite
 * @param {object} reqBody
 * @param {uuid} businessId
 * @param {object} trx
 * @returns {Promise<User>}
 */
const createInvite = async (reqBody, businessId, trx = null) => {
  const newInvite = {
    businessId,
    name: reqBody.name,
    email: reqBody.email,
    roleId: ROLE_TYPES[reqBody.role],
  };

  const invite = await Invite.query(trx)
    .insert(newInvite)
    .withGraphFetched('[role(defaultSelects)]');

  return invite;
};

/**
 * @dec Get invite by id
 * @param {uuid} inviteId
 * @param {object} trx
 * @returns {Promise<User>}
 */
const getInviteById = async (inviteId, trx = null) => {
  return Invite.query(trx)
    .findById(inviteId)
    .modify('defaultSelects')
    .withGraphFetched('[role(defaultSelects)]');
};

/**
 * Query for invites
 * @param {object} reqQuery
 * @param {uuid} businessId
 * @param {object} trx
 * @returns {Promise<QueryResult>}
 */
const queryInvites = async (reqQuery, businessId, trx = null) => {
  const invites = await Invite.query(trx)
    .where('businessId', businessId)
    .modify('defaultSelects')
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

  return invites;
};

/**
 * Delete invite by it
 * @param {string} inviteId
 * @param {object} trx
 * @returns {Promise<Post>}
 */
const deleteInviteById = async (inviteId, trx) => {
  return await Invite.query(trx).deleteById(inviteId);
};

module.exports = {
  createInvite,
  queryInvites,
  getInviteById,
  deleteInviteById,
};
