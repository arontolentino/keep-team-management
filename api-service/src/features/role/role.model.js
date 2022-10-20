const { Model } = require('objection');
const knex = require('../../config/knex');

Model.knex(knex);

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'roleId';
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(['roles.name']);
      },
    };
  }

  static get relationMappings() {
    const { Permission } = require('../permission');

    return {
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: 'roles.roleId',
          through: {
            from: 'rolePermissions.roleId',
            to: 'rolePermissions.permissionId',
          },
          to: 'permissions.permissionId',
        },
      },
    };
  }
}

module.exports = Role;
