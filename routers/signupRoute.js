const express = require('express')
const router = express.Router()
const {signupUser} = require('../controller/sign-up-controller')

router.route('/')
    .post(signupUser)

module.exports = router