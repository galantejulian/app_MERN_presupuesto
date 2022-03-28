const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const movementsRoutes = require("./src/routes/movements")
const authRoutes = require("./src/routes/auth")

// settings
const app = express()
const port = process.env.PORT || 9000;
const cors = require("cors")
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb:localhost/databasetest"


// middlewares
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors())
// routes

app.use('/api/movements', movementsRoutes)
app.use('/api/auth', authRoutes)

// connect to mongodb
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`Example app listening on port ${port}`)
})