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
        })

    router.get(
        '/orders',
        (req, res) => {
            try {
                knex.raw('select * from "Orders"').then((orders) =>{
                    res.send(orders.rows)
                })
            } catch (e) {
                res.status(500).json({
                    message: "Server error"
                })
            }
        })



module.exports = router