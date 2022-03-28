const Users = require('../models/User')
const Movements = require('../models/Movement');

module.exports = {
    all: async (req, res) => {
        try {
            const allMovements = await Movements.find({ user_id: req.user.id })
            res.status(200).json({
                ok: true,
                data: allMovements
            })
        } catch (error) {
            res.status(503).json({
                ok: false,
                errors: { msg: error.message },
            });
        }
    },
    create: async (req, res) => {
        try {
            const { concept, amount, date, type } = req.body;
            const newMovements = await new Movements({
                concept,
                amount,
                type,
                date,
                user_id: req.user.id
            })
            const movement = await newMovements.save()

            res.status(201).json({
                ok: true,
                data: movement
            })
        } catch (error) {
            res.status(503).json({
                ok: false,
                errors: { msg: error.message },
            });
        }
    },
    update: async (req, res) => {
        try {
            const { concept, amount, date, type, id } = req.body;
            await Movements.findByIdAndUpdate(id, {
                concept,
                amount,
                date,
                type,
            })
            res.status(200).json({
                ok: true,
                message: "movement updated"
            })

        } catch (error) {
            res.status(503).json({
                ok: false,
                errors: { msg: error.message },
            });
        }
    },
    remove: async (req, res) => {
        try {
            const _id = req.body.id
            await Movements.deleteOne({ _id });
            res.status(200).json({
                ok: true,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                errors: { msg: error.message },
            });
        }

    }


}