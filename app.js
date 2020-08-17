const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const url =  `mongodb+srv://chen_rules:Chen123.@my-database-vydwb.mongodb.net/note-app?retryWrites=true&w=majority
`

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)

app.use(middleware.unknownEndpoint)

module.exports = app