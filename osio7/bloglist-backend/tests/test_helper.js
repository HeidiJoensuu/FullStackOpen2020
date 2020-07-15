const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Kukkamaan kuninkaat',
    author: 'BlogiKeisari',
    url: 'https://kukkiaKaikkialla.com/',
    likes: 2
  },
  {
    title: 'Hyttysten aliarvionti',
    author: 'Verenluovuttajat',
    url: 'https://oikeutta_hyttysille.com/',
    likes: 32
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb
}