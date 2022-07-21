const db = require('../configuration/DatabaseConnection.js')
const objectId = require('mongodb').ObjectId

module.exports = {


    createCategory: (req, res) => {
        try {
            db.get().collection('dpCategories').insertOne(req.params).then((response) => {
                res.status(200).json({ message: req.params.categoryName + ' added as a new category' })
            })
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    },


    updateCategory: (req, res) => {
        try {
            db.get().collection('dpCategories').updateOne({ _id: objectId(req.params.id) }, { $set: { categoryName: req.body.newCategoryName } }).then((response) => {
                if (response.modifiedCount === 1) {
                    res.status(200).json({ message: 'The category name updated to ' + req.body.newCategoryName })
                } else {
                    res.status(400).json({ message: 'your request is invalid' })
                }
            })
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    },


    deleteCategory: (req, res) => {
        try {
            db.get().collection('dpCategories').deleteOne({ _id: objectId(req.params.id) }).then((response) => {
                res.status(200).json({ message: 'category with id - ' + req.params.id + ' deleted from categories' })
            })
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    },


    listCategory: async (req, res) => {
        try {
            let response = await db.get().collection('dpCategories').find().toArray()
            res.status(200).send(response)
        }
        catch (err) {
            res.status(err.status).json({ message: err.message })
        }
    }
}