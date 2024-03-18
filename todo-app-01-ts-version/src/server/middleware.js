var jwt = require('jsonwebtoken')
module.exports = {

    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"]
        if (!authHeader){
            res.status(401).send({message: "Missing auth header"})
        }  
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET)     
        if (decoded && decoded.userId) {
            req.userId = decoded.userId
            next()
        }
        else {
            return res.status(403).send({message: "Incorrect token"})
        }
    }
};