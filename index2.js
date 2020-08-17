require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Note = require('./models/note')
const middleware = require('./utils/middleware')


const url =  `mongodb+srv://chen_rules:Chen123.@my-database-vydwb.mongodb.net/note-app?retryWrites=true&w=majority
`

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

app.use(middleware.requestLogger)


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if(body.content === undefined){
    return response.status(400).json({error:'content missing'})
  }

  const note = new Note({
    content:body.content,
    important:body.important || false,
    date:new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })

})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// app.use(middleware.unknownEndpoint)




// const PORT = process.env.PORT
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})