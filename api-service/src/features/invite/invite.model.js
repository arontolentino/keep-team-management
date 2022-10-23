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

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(['inviteId', 'businessId', 'name', 'email']);
      },
    };
  }

  static get relationMappings() {
    const { Business } = require('../business');
    const { Role } = require('../role');

    return {
      business: {
        relation: Model.BelongsToOneRelation,
        modelClass: Business,
        join: {
          from: 'invites.businessId',
          to: 'businessses.businessId',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'invites.roleId',
          to: 'roles.roleId',
        },
      },
    };
  }
}

module.exports = Invite;
