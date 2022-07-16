const jwt = require('jsonwebtoken')
const config = require('config')
const {check, body, validationResult} = require('express-validator')
const body_parser = require('body-parser')
const {Router} = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const knex = require('../knex/knex')

router.post(
    '/register', 
    [
        body('email', 'Email error').isEmail(),
        body('password', 'Password error').isLength({min: 6})
    ],
    async (req, res) => {
        console.log("post on register")
    try {
        console.log("1")
        const errors = validationResult(req)
        console.log("2")
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Register error',
                test: req.body
            })
        }
        console.log("3")
        const {email, nickname, password} = req.body
        console.log(req.body)
        const existUser = await knex('Users').where("email", email)
        console.log(existUser)
        console.log("jjj", existUser.length)
        if (existUser.length !== 0) {
            return res.status(400).json({message: "User is already exists"})
        }
        console.log("4")
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log("5")
        const user = await knex('Users').insert({ email: email, nickname: nickname, password: hashedPassword }).catch(err => console.log('Transaction', err))
        console.log("6")
        res.status(201).json({message: "User has been created"})
        console.log("7")

    } catch (e) {
        res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
})

router.post(
    '/login',
    [
        body('email', 'Email error').normalizeEmail().isEmail(),
        body('password', 'Password error').exists()
    ], async (req, res) => {
    try {
        console.log("post on login")
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Login error'
            })
        }
        
        const {email, password} = req.body

        const user = await knex('Users').where("email", email).first()
        if (user == undefined || user == null) {
            return res.status(400).json({
                message: 'User doesnt exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Error. Check input credentials'})
        }

        const token = jwt.sign(
            {userId: user.id, roleId: user.roleId},
            config.get('jwtSecret'),
            {expiresIn: '24h'}
        )
        res.json({token: token, userId: user.id, nickname: user.nickname, roleId: user.roleId})

    } catch (e) {
        res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
})

module.exports = router