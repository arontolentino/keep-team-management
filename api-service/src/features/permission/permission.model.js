const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class Permission extends Model {
  static get tableName() {
    return 'permissions';
  }

  static get idColumn() {
    return 'permissionId';
  }
}

module.exports = Permission;
