const {Router} = require('express')
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const knex = require('../knex/knex')
const auth = require("../middleware/auth.middleware")



    router.get(
        '/users/:id',
        (req, res) => {
            try {
                let query = knex("Users").select("nickname").where("id", req.params.id).first()
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
                knex.raw(`SELECT * FROM "Orders" WHERE "tagId"=${req.params.id} `).then((orders) =>{
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
        '/orders',
        (req, res) => {
            try {
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
        '/orders', auth,
        async (req, res) => {
            console.log("post on orders")
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

    router.delete(
        '/orders/:id', auth,
        async (req, res) => {
            console.log("delete on orders")
            try {
                let orderId = req.params.id
                console.log("Order", orderId);
                const order = await knex("Orders").where("id", orderId).first().catch(err => console.log('Transaction', err))
                console.log(order);
                console.log("Author", order.authorId);
                console.log("User", req.user.userId);
                if (req.user.userId == order.authorId){
                    console.log("Delete order", req.user.userId)
                    console.log("Author ", order.authorId);
                    const del_order = await knex('Orders').del().where("id", orderId).catch(err => console.log('Transaction', err))
                    console.log(del_order);
                    res.status(201).json({message: "Order has been delete"})
                } else {
                    res.status(500).json({
                        message: "DB error {api:delete:orders}"
                    })
                }
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:delete:orders}",
                    error: e.message
                })
            }
        }
    )

    router.put(
        '/orders/:id', auth,
        async (req, res) => {
            console.log("put on orders")
            console.log(req.body)
            try {
                const {workerId} = req.body
                const order_dct = { workerId: workerId }
                console.log(order_dct)
                const order = await knex('Orders').update(order_dct).where("id", req.params.id).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Order has been updated"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:put:orders}",
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
            console.log("get on tags")
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
                const {chatId, userId, message, timestamp} = req.body
                const message_dct = { chatId: chatId, userId: userId, message: message, timestamp: timestamp}
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

    router.get(
        '/responds/:id', auth,
        (req, res) => {
            try {
                let query = knex("Responds").select("*").where("orderId", req.params.id)
                query.then(response => {
                    res.json(response)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.post(
        '/responds/:id', auth,
        async (req, res) => {
            console.log("post on responds")
            try {
                const respond_dct = { orderId: req.params.id, userId: req.user.userId}
                const added_respond = await knex('Responds').insert(respond_dct).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Respond has been created"})
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:responds}",
                    error: e.message
                })
            }
        }
    )

    router.delete(
        '/responds/:id', auth,
        async (req, res) => {
            console.log("delete on responds")
            try {
                console.log(req.user.roleId);
                if (req.user.userId == req.body.userId || req.user.roleId == 2){
                    console.log(req.params.id, req.body.userId);
                    const delete_respond = await knex('Responds').del().where('orderId', req.params.id).where('userId', req.body.userId).catch(err => console.log('Transaction', err))
                    res.status(201).json({message: "Respond has been deleted"})
                } else {
                    res.status(400).json({
                        message: "Restricted"
                    })
                }
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:responds}",
                    error: e.message
                })
            }
        }
    )

    router.get(
        '/payments/order_id/:id',
        (req, res) => {
            try {
                knex.raw(`SELECT * FROM "Payments" WHERE "orderId"=${req.params.id} `).then((payments) =>{
                    res.send(payments.rows)
                }).catch(err => console.log('Transaction', err))
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.post(
        '/payments/:order_id', auth,
        async (req, res) => {
            console.log("post on payments")
            console.log(req.body)
            try {
                const {txHash, value, status, comment} = req.body
                const payment_dict = { orderId: req.params.order_id, userId: req.user.userId, txHash: txHash, value: value, status: status, comment: comment}
                console.log(payment_dict)
                const payment = await knex('Payments').insert(payment_dict).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Payment has been created"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:post:comments}",
                    error: e.message
                })
            }
        }
    )

    router.get(
        '/status/:id', auth,
        (req, res) => {
            try {
                let query = knex("PaymentsStatus").select("*").where("orderId", req.params.id).first()
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

    router.post(
        '/status/:id', auth,
        (req, res) => {
            try {
                const status = knex('PaymentsStatus').insert({orderId: req.params.id}).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Status has been created"})
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        }
    )

    router.put(
        '/status/submit/worker/:id', auth,
        async (req, res) => {
            console.log("put on status worker")
            try {
                const order_dct = { workerStatus: "submit" }
                console.log(order_dct)
                const order = await knex('PaymentsStatus').update(order_dct).where("orderId", req.params.id).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Status has been updated"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:put:orders}",
                    error: e.message
                })
            }
        }
    )

    router.put(
        '/status/submit/author/:id', auth,
        async (req, res) => {
            console.log("put on status author")
            try {
                const order_dct = { authorStatus: "submit" }
                console.log(order_dct)
                const order = await knex('PaymentsStatus').update(order_dct).where("orderId", req.params.id).catch(err => console.log('Transaction', err))
                res.status(201).json({message: "Status has been updated"})
        
            } catch (e) {
                res.status(500).json({
                    message: "Server error {api:put:orders}",
                    error: e.message
                })
            }
        }
    )

module.exports = router