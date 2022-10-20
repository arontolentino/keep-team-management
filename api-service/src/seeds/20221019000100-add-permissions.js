exports.seed = function (knex) {
  return knex('permissions')
    .del()
    .then(function () {
      return knex('permissions').insert([
        { permissionId: 1, name: 'VIEW_USERS' },
        {
          permissionId: 2,
          name: 'ADD_USERS',
        },
        { permissionId: 3, name: 'UPDATE_USERS' },
        { permissionId: 4, name: 'DELETE_USERS' },
        { permissionId: 5, name: 'UPDATE_USERS' },
        { permissionId: 6, name: 'VIEW_CARDS' },
        { permissionId: 7, name: 'ADD_CARD' },
        { permissionId: 8, name: 'APPROVE_CARD' },
        { permissionId: 9, name: 'DECLINE_CARD' },
        { permissionId: 10, name: 'REQUEST_CARD' },
      ]);
    });
};
