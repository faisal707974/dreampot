const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const db = require('./configuration/DatabaseConnection.js')
dotenv.config()

///////////////////////////////////////////////////////////////// Custom middlewares

const { createCategory, updateCategory, deleteCategory, listCategory } = require('./controllers/category')
const { listProducts, createProducts } = require('./controllers/products')

///////////////////////////////////////////////////////////////// Express middlewares

const app = express()

app.use(cors())
app.use(express.json())

///////////////////////////////////////////////////////////////// Database connection

db.connect((err) => {
    if (err) {
        console.log('Database connection error : ' + err)
    } else {
        console.log('Database connected')
    }
})

///////////////////////////////////////////////////////////////// Declaring APIs

app.post('/dreampot/api/category/:categoryName', createCategory)
app.get('/dreampot/api/category', listCategory)
app.put('/dreampot/api/category/:id', updateCategory)
app.delete('/dreampot/api/category/:id', deleteCategory)

app.get('/dreampot/api/products/:category?', listProducts)
app.post('/dreampot/api/products', createProducts)

///////////////////////////////////////////////////////////////// Server listening

app.listen(process.env.PORT, () => {
    console.log(`server started running in ${process.env.PORT}`)
})