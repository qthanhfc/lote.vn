const verifyToken = require('../middlewares/auth')
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user)
            return res.status(400).json({success: false, message: 'Không tìm thấy tài khoản này'})
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Server không phản hồi'})
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { username, password } = req.body

    // Simple validation
    if(!username || !password)
        return res.status(400).json({success: false, message: 'Missing username and/or password'})
        
    try {
        // Check for existing user
        const user = await User.findOne({username})

        if(user)
        return res.status(400).json({success: false, message: 'Username already taken'})

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username, password: hashedPassword
        })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message: 'User created successfully', accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body

    // Simple validation
    if(!username || !password)
    return res
        .status(400)
        .json({success: false, message: 'Missing username and/or password'})

    try {
        // Check for exiting user
        const user = await User.findOne({username})
        if(!user)
        return res.status(400).json({success: false, message: 'Incorrect Username or Password'})

        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
        return res.status(400).json({success: false, message: 'Incorrect Username or Password'})

        // All good
        // Return token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message: 'Login successfully', accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router