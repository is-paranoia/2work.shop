exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('Permissions').del()
    .then(function () {
        // Inserts seed entries
        return knex('Permissions').insert([
            {
                id: 1,
                permission: 'createOrders'
            },
            {
                id: 2,
                permission: 'respondOrders'
            },
            {
                id: 3,
                permission: 'deleteOwnOrders'
            },
            {
                id: 4,
                permission: 'sendMessages'
            },
            {
                id: 5,
                permission: 'sendComments'
            },
            {
                id: 6,
                permission: 'deleteAllOrders'
            },
            {
                id: 7,
                permission: 'deleteComments'
            },
            {
                id: 8,
                permission: 'viewChat'
            },
            {
                id: 9,
                permission: 'viewOtherChat'
            },
            {
                id: 10,
                permission: 'viewAdminPanel'
            },
      ]);
    });
  };