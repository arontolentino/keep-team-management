const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class Invite extends Model {
  static get tableName() {
    return 'invites';
  }

  static get idColumn() {
    return 'inviteId';
  }

  static get relationMappings() {
    const { Business } = require('../business');

    return {
      business: {
        relation: Model.BelongsToOneRelation,
        modelClass: Business,
        join: {
          from: 'invites.businessId',
          to: 'businessses.businessId',
        },
      },
    };
  }
}

module.exports = Invite;
