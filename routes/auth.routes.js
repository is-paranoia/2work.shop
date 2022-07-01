const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
    '/register', 
    [
        check('email', 'Email error').isEmail(),
        check('password', 'Password error').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Register error'
            })
        }
        const {email, password} = req.body

        const possibleUser = await User.findOne({email: email})

        if (possibleUser) {
            return res.status(400).json({message: "User is already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({message: "User has been created"})

    } catch (e) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.post(
    '/login',
    [
        check('email', 'Email error').normalizeEmail().isEmail(),
        check('password', 'Password error').exists()
    ], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Login error'
            })
        }
        
        const {email, password} = req.body

        const user = await User.findOne({email: email})

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
            {expiresIn: '1h'}
            
        )

        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router