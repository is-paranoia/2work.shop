const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log("Token secret header exist ", token)

        if (!token) {
            return res.status(401).json({ message: "No auth"})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    } catch (e) {
        console.log(e)
    }
}