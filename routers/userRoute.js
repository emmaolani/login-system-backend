const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../middleware/isAuth')
const {getUserController} = require('../controller/getUserController')


router.route('/')
    .get(isAuthenticated, getUserController)

module.exports = router