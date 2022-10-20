const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('objection');
const knex = require('../../config/knex');
const ApiError = require('../../utils/ApiError');

Model.knex(knex);

class Business extends Model {
  static get tableName() {
    return 'businesses';
  }

  static get idColumn() {
    return 'businessId';
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(['businessId', 'name', 'email']);
      },
    };
  }

  static get relationMappings() {
    const { User } = require('../user');
    const { Card } = require('../card');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'businesses.businessId',
          to: 'users.businessId',
        },
      },
      cards: {
        relation: Model.HasManyRelation,
        modelClass: Card,
        join: {
          from: 'businesses.businessId',
          to: 'cards.businessId',
        },
      },
      invites: {
        relation: Model.HasManyRelation,
        modelClass: Card,
        join: {
          from: 'businesses.businessId',
          to: 'invites.businessId',
        },
      },
    };
  }
}

module.exports = Business;
