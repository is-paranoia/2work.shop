const {Router} = require('express')
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const knex = require('../knex/knex')
const auth = require("../middleware/auth.middleware")


    router.get(
        '/users',
        (req, res) => {
            try {
                knex.raw('select * from "Users"').then((users) =>{
                    res.send(users.rows)
                })
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.get(
        '/user', auth,
        (req, res) => {
            try {
                let query = knex("Users").select("nickname").where("id", req.user.userId).first()
                query.then(response => {
                    res.send(response)
                })
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.get(
        '/orders/worker_name/:name',
        (req, res) => {
            try {
                let query = knex("Users").select("id").where("nickname", req.params.name)
                let workerId = undefined
                query.then(response => {
                    response.forEach(element => {
                        workerId = element["id"]
                    });

                    let second_query = knex("Orders").select("*").where("workerId", workerId)
                    second_query.then(response => {
                        res.send(response)
                        console.log(response)
                    })
                    
                }).catch(err => console.log('Transaction', err))
                
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )


    router.get(
        '/orders/author_name/:name',
        (req, res) => {
            try {
                let query = knex("Users").select("id").where("nickname", req.params.name)
                let authorId = undefined
                query.then(response => {
                    response.forEach(element => {
                        authorId = element["id"]
                    });

                    let second_query = knex("Orders").select("*").where("authorId", authorId)
                    second_query.then(response => {
                        res.send(response)
                        console.log(response)
                    })
                    
                }).catch(err => console.log('Transaction', err))
                
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.get(
        '/orders/worker_id/:workerId',
        (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Orders" WHERE "workerId"=${req.params.workerId} `).then((orders) =>{
                    res.send(orders.rows)
                    console.log("worker orders ", orders)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.get(
        '/orders/author_id/:authorId',
        (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Orders" WHERE "authorId"=${req.params.authorId} `).then((orders) =>{
                    res.send(orders.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.get(
        '/orders/tag_id/:id',
        (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Tags" WHERE "id"=${req.params.id} `).then((orders) =>{
                    res.send(orders.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )
    
    router.get(
        '/orders/:id',
        (req, res) => {
            try {
                let query = knex("Orders").select("*").where("id", req.params.id).first()
                query.then(response => {
                    res.send(response)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )
    
    router.get(
        '/orders', auth,
        (req, res) => {
            try {
                console.log("GET orders by user id", req.user.userId)
                knex.raw('select * from "Orders"').then((orders) =>{
                    res.send(orders.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:orders}",
                    error: e.message
                })
            }
        }
    )

    router.post(
        '/create_order', auth,
        async (req, res) => {
            console.log("post on create_order")
            console.log(req.body)
            try {
                const {title, description, price} = req.body
                const order_dct = { title: title, description: description, 
                    authorId: req.user.userId, price: price}
                console.log(order_dct)
                const order = await knex('Orders').insert(order_dct).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Order has been created"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:create_order}",
                    error: e.message
                })
            }
        }
    )

    router.get(
        '/comments/:order_id',
        (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Comments" WHERE "orderId"=${req.params.order_id} `).then((comments) =>{
                    res.send(comments.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.post(
        '/comments/:order_id', auth,
        async (req, res) => {
            console.log("post on comments")
            console.log(req.body)
            try {
                const {message} = req.body
                const comment_dct = { orderId: req.params.order_id, userId: req.user.userId, message: message}
                console.log(comment_dct)
                const comment = await knex('Comments').insert(comment_dct).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Comment has been created"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:comments}",
                    error: e.message
                })
            }
        }
    )

    router.get(
        '/tags',
        async (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Tags"`).then((tags) =>{
                    res.send(tags.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.post(
        '/tags/:tag_id', auth,
        async (req, res) => {
            console.log("post on tags")
            console.log(req.body)
            try {
                const {tag} = req.body
                const tag_dct = { tag: tag}
                console.log(tag_dct)
                const added_tag = await knex('Tags').insert(tag_dct).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Tag has been created"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:comments}",
                    error: e.message
                })
            }
        }
    )

    router.post(
        '/chat/:chat_id', auth,
        async (req, res) => {
            console.log("post on chat")
            console.log(req.body)
            try {
                const {chatId, user, message, timestamp} = req.body
                const message_dct = { chatId: chatId, userId: user, message: message, timestamp: timestamp}
                const added_message = await knex('ChatMessages').insert(message_dct).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "ChatMessage has been created"})
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:comments}",
                    error: e.message
                })
            }
        }
    )

    router.get(
        '/chat/:id', auth,
        (req, res) => {
            try {
                let query = knex("ChatMessages").select("*").where("chatId", req.params.id)
                query.then(response => {
                    res.send(response)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )



module.exports = router