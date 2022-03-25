const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const movementsRoutes = require("./src/routes/movements")
const authRoutes = require("./src/routes/auth")

// settings
const app = express()
const port = process.env.PORT || 9000;
const cors = require("cors")


// middlewares
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors())
// routes

app.use('/api/movements', movementsRoutes)
app.use('/api/auth', authRoutes)


// connect to mongodb
mongoose.connect("mongodb+srv://juliangalante:18081990@app-presupuesto-mern.xpv9w.mongodb.net/db_presupuesto?retryWrites=true&w=majority")


app.listen(process.env.PORT || 3001, () => {
    console.log(`Example app listening on port ${port}`)
})