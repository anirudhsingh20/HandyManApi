const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')


router.post('/create-user',authController.createUser)
router.post('/login',authController.login)
router.get('/user/:userId',authController.fetchUserDetails)



module.exports = router
