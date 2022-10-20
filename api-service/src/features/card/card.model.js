const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class Card extends Model {
  static get tableName() {
    return 'cards';
  }

  static get idColumn() {
    return 'cardId';
  }

  // static get modifiers() {
  //   return {
  //     defaultSelects(builder) {
  //       builder.select(['cardId', 'name', 'email']);
  //     },
  //   };
  // }

  static get relationMappings() {
    const { User } = require('../user');
    const { Business } = require('../business');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'cards.userId',
          to: 'users.userId',
        },
      },
      business: {
        relation: Model.BelongsToOneRelation,
        modelClass: Business,
        join: {
          from: 'cards.businessId',
          to: 'businesses.businessId',
        },
      },
    };
  }
}

module.exports = Card;
