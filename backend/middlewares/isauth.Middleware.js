const jwt = require('jsonwebtoken')

const isauth = async(req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (token) {
            const { id } = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = id
            next()
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Unauthorised User" });
    }
}

module.exports = isauth