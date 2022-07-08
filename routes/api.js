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
                    message: "Server error"
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
            //const existUser = await knex('Users').where("email", email)
    
            /*if (existUser.length !== 0) {
                return res.status(400).json({message: "User is already exists"})
            }*/
            
            //const hashedPassword = await bcrypt.hash(password, 12)
            const order_dct = { title: title, description: description, 
                authorId: req.user.userId, workerId: req.user.userId, price: price, isStarted: false, stage: "created"}
            console.log(order_dct)
            const order = await knex('Orders').insert(order_dct)
            res.status(201).json({message: "Order has been created"})
    
        } catch (e) {
            res.status(500).json({
                message: "Server error",
                error: e.message
            })
        }
    })



module.exports = router