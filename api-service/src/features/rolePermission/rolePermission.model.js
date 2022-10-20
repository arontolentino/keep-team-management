const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class RolePermission extends Model {
  static get tableName() {
    return 'rolePermissions';
  }

  static get idColumn() {
    return ['roleId', 'permissionId'];
  }
}

module.exports = RolePermission;
