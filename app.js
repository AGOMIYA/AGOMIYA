const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./config/database')
require('./config/cloudinary')

const app = express()
app.use(cors())
app.use(express.json())

const routes = require('./routes')
app.use('/api', routes)

connectDB()

module.exports = app
