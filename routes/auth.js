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
        console.log(req.body)
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Register error',
                test: req.body
            })
        }
        const {email, nickname, wallet, password} = req.body
        const existUser = await knex('Users').where("email", email)

        if (existUser.length !== 0) {
            return res.status(400).json({message: "User is already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await knex('Users').insert({ email: email, nickname: nickname, wallet: wallet, password: hashedPassword })
        res.status(201).json({message: "User has been created"})

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
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Login error'
            })
        }
        
        const {nickname, email, wallet, password} = req.body

        const user = await knex('Users').where("email", email).first()

        if (!user) {
            return res.status(400).json({
                message: 'User doesnt exists'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Error. Check input credentials'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            //{expiresIn: '1h'}
            {}
            
        )
        console.log("jwt = ", token)

        res.json({token: token, userId: user.id})

    } catch (e) {
        res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
})

module.exports = router