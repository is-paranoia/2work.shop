exports.seed = function(knex) {
	return knex("Roles").del()
		.then(function () {
			return knex("Roles").insert([
				{
					id: 1,
					permissionsId: 8,
					name: "defaultUser"
				},
				{
					id: 2,
					permissionsId: 10,
					name: "adminUser"
				}
			])
		})
}