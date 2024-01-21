const express = require('express')
const router = express.Router()
const {loginUserController} = require('../controller/login-contoller')

router.route('/')
    .post(loginUserController)

module.exports = router