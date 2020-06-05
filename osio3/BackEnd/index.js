require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :data'))

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons =>{
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/info', async (request, response, next) => {
  let persons = await Person.find({})
  console.log(persons.length)
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    ).catch(error => next(error))
})

app.get('/api/persons/:id', (reg, res) => {
  Person.findById(reg.params.id)
    .then(person =>{
      if(person) {
        res.json(person)
      } else {
        reg.status(404).end()
      }  
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', async (reg, res, next) =>{
  Person.findByIdAndRemove(reg.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body.name, body.number)
  
  if (!body.name) {
    return response.status(400).json({error: 'name is missing'})
  } else if (!body.number) {
    return response.status(400).json({error: 'number is missing'})
  } else {
    const sPerson = new Person({
    name: body.name,
    number: body.number,
    })
    console.log(sPerson)
    sPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})


app.put('/api/persons/:id', (request, response, next) =>{
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson =>{
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})