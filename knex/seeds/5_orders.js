exports.seed = function(knex) {
	return knex("Orders").del()
		.then(function () {
			return knex("Orders").insert([
				{
					id: 1,
					title: "Сделать телеграм бота",
					description: "Компании ТЕЛЕГА-1 требуется телеграм бот для клиентов",
					authorId: 1,
					tagId: 1,
					price: 0.1,
				},
				{
					id: 2,
					title: "Создание канбан-доски",
					description: "Нужен человек с опытом, который сделает команде канбан-доску",
					authorId: 3,
					tagId: 1,
					price: 0.2,
				},
				{
					id: 3,
					title: "Сделать телеграм бота",
					description: "Компании ТЕЛЕГА-1 требуется телеграм бот для клиентов",
					authorId: 1,
					tagId: 3,
					price: 0.3,
				},
			])
		})
}