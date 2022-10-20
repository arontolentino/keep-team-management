exports.seed = function (knex) {
  return knex('rolePermissions')
    .del()
    .then(function () {
      return knex('rolePermissions').insert([
        { roleId: 1, permissionId: 1 },
        { roleId: 1, permissionId: 2 },
        { roleId: 1, permissionId: 3 },
        { roleId: 1, permissionId: 4 },
        { roleId: 1, permissionId: 5 },
        { roleId: 1, permissionId: 6 },
        { roleId: 1, permissionId: 7 },
        { roleId: 1, permissionId: 8 },
        { roleId: 1, permissionId: 9 },
        { roleId: 2, permissionId: 6 },
        { roleId: 2, permissionId: 10 },
      ]);
    });
};
