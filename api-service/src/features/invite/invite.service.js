const Invite = require('./invite.model');

/**
 * Create an invite
 * @param {Object} reqBody
 * @param {Object} trx
 * @returns {Promise<User>}
 */
const createInvite = async (reqBody, trx = null) => {
  const invite = await Invite.query(trx).insert(reqBody);

  return invite;
};

module.exports = { createInvite };
