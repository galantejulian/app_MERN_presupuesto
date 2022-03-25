const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid authentication" })
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Authorization not valid" })

            // the id of the user will be available to use it for new req
            req.user = user;
            next()
        })
    } catch (error) {
        return res.statun(500).json({ msg: error.messsage })
    }
}

module.exports = auth