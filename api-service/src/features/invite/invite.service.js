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
    email: reqBody.name,
    roleId: ROLE_TYPES[reqBody.role],
  };

  const invite = await Invite.query(trx)
    .insert(newInvite)
    .withGraphFetched('[role(defaultSelects)]');

  return invite;
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

module.exports = { createInvite };
