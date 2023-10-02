const express = require('express')
const router = express.Router()

const isAuthenticated = (req, res, next) => {
    console.log('opp')
    if (req.session.email) {
        console.log(req.session.email)
        next()
    }else{
        console.log('notlogin')
        res.redirect('/login')
    }
} 

router.route('/')
    .get(isAuthenticated, (req, res)=> {
        res.json({session: req.session})
    })

module.exports = router