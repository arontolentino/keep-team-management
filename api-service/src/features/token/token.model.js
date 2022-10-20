const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class Token extends Model {
  static get tableName() {
    return 'tokens';
  }

  static get idColumn() {
    return 'tokenId';
  }
}

module.exports = Token;
