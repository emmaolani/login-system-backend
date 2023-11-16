const getUserController = async (req, res)=>{
    if (req.session.isauth) {
        return res.status(200).json({message: req.session.user})
    }else{
        return res.status(401).json({message: "you have to login"})
    }
}

module.exports = {getUserController}