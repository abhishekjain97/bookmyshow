const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        // Extract the token from my request "Bearer XXXXXXXX"
        const token = req.headers.authorization.split(" ")[1]

        // Verify if the token iis correct or not
        const verifiedToken = jwt.verify(token, process.env.JWT_SECREAT)

        // Extract the USER ID and save it in requres
        req.body.userId = verifiedToken.userId

        next()
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Invalid token! Please try logging in again."
        })

    }
} 