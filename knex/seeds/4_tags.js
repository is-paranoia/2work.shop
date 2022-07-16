exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('Tags').del()
    .then(function () {
        // Inserts seed entries
        return knex('Users').insert([
            {
                id: 1,
                tag: "IT"
            },
            {
                id: 2,
                tag: "Medicine"
            },
            {
                id: 3,
                tag: "Marketing"
            },
            {
                id: 4,
                tag: "Consulting"
            },
      ]);
    });
  };