const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Movements = require('../models/Movement');
module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            const newUser = new User({
                email,
                password: await bcrypt.hash(password, 10)
            });
            await newUser.save();
            res.json({ msg: "Sign up Success" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(404).json({ error: 'User not found' })

            // Validacion de password en la base de datos
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) return res.status(400).json({ error: 'Invalid Password' })
            // if login succes create token

            const payload = { id: user._id, email: user.email }
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
            res.json({
                ok: true,
                message: `Welcome ${user.email}`,
                token: token
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization")
            if (!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) return res.send(false)
                const user = await User.findById(verified.id)
                if (!user) return res.send(false)
                return res.send(true)
            })

        } catch (err) {
            res.status(500).json({
                ok: false,
                err: { msg: err.message },
            });
        }
    },

    all: async (req, res) => {
        try {
            const allMovements = await User.find()
            res.status(200).json({
                ok: true,
                data: allMovements
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                err: { msg: err.message },
            });

        }
    }
};