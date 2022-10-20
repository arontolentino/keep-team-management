exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(function () {
      return knex('roles').insert([
        {
          roleId: 1,
          name: 'ADMIN',
        },
        { roleId: 2, name: 'EMPLOYEE' },
      ]);
    });
};
