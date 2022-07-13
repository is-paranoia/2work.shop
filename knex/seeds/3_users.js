exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('Users').del()
    .then(function () {
        // Inserts seed entries
        return knex('Users').insert([
            {
                id: 1,
                nickname: "test12345",
                email: "test12345@gmail.com",
                wallet: "test12345",
                password: "$2b$12$10AO2XAFsC8NUVKGXYwaGOKpLrMPDGcZhnLT9bdCHEUhm3T08It/."
            },
            {
                id: 2,
                nickname: "admin12345",
                email: "admin12345@gmail.com",
                wallet: "admin12345",
                password: "$2b$12$0MenNxL7AEGHDfdWw9b/ouKcsPSHDxNbahN61/1KL.ktTu5xMxRou",
                roleId: 2
            },
            {
                id: 3,
                nickname: "developer12345",
                email: "developer12345@gmail.com",
                wallet: "developer12345",
                password: "$2b$12$Z0nnka0e4dJD78EpRPhJWuetPnwNEiqtMJBjatxwvpm1C1xuarm8O"
            }
      ]);
    });
  };