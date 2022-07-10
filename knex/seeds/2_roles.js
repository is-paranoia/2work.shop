exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('Roles').del()
    .then(function () {
        // Inserts seed entries
        return knex('Roles').insert([
            {
                id: 1,
                permissionsId: 8,
                name: 'defaultUser'
            },
            {
                id: 2,
                permissionsId: 10,
                name: 'adminUser'
            }
      ]);
    });
  };