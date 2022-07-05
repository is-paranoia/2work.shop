const {Router} = require('express')
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const knex = require('../knex/knex')


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
                knex.raw(`SELECT * FROM "Orders" WHERE "id"=${req.params.id} `).then((orders) =>{
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
        '/orders',
        (req, res) => {
            try {
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



module.exports = router