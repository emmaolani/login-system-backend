const express = require('express')
const router = express.Router()
const Authenticator = require('../controller/auth-controller')

router.route('/')
    .post((req, res) => {
        const authenticator = new Authenticator(req, res)
        authenticator.login_user()
    })

module.exports = router