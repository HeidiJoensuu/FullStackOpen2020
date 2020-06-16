const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  let passwordHash

  if (body.password.length >= 3) {
    const saltRounds = await bcryptjs.genSaltSync(10)
    passwordHash = await bcryptjs.hash(body.password, saltRounds)
  } else {
    return response.status(400).json({ error: 'password has to have at least 3 chars long' })
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter