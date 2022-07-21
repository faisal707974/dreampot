const db = require('../configuration/DatabaseConnection.js')

module.exports = {


    listProducts: async (req, res) => {
        try {
            if (req.params.category) {
                let data = await db.get().collection('dpProducts').find({ category: req.params.category }).toArray()
                res.status(200).send(data)
            } else {
                let data = await db.get().collection('dpProducts').find().toArray()
                res.status(200).send(data)
            }
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    },


    createProducts: (req, res) => {
        try {
            db.get().collection('dpProducts').insertOne(req.body).then((response) => {
                res.status(200).json({ message: req.body.product + ' added to products list' })
            })
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    }
}