
const isAuthenticated = (req, res, next) => {
    console.log(req.session.id)
    if (req.session.isauth) {
        console.log(req.session.user)
        next()
    }else{
        res.status(400).json({message:'unauthorized'})
    }
} 
module.exports = {isAuthenticated}