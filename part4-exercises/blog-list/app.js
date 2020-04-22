const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to DB'))
    .catch(() => console.log('not connected to DB :('))

app.use(cors()) //now we can serve requests from a frontend in another port
app.use(express.json()) //now we can request.body
app.use('/api/blogs', blogRouter) //our routes are available when we reach for /api/blogs


module.exports = app