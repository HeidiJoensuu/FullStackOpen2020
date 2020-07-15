
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let userToken
let user

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcryptjs.hash('salis', 10)
  user = new User({
    username: 'testaaja',
    name: 'testaaja',
    passwordHash
  })

  await user.save()
  let userLog = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: 'salis'
    })
  userToken = 'bearer ' + userLog.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes === undefined ? 0 : blog.likes,
    user: user._id,
  }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})
describe('addition of a new blog', () => {
  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('adding a new blog', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Paviaanien valtakunta',
      author: 'BlogiKeisari',
      url: 'https://paviaanejaOomeKaikki.com/',
      likes: 999
    }
    await api
      .post('/api/blogs')
      .set('Authorization', userToken)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length +1)
    expect(contents).toContainEqual('Paviaanien valtakunta')
  })


  test('new blog without likes is zero', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Paviaanien valtakunta',
      author: 'BlogiKeisari',
      url: 'https://paviaanejaOomeKaikki.com/',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', userToken)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(helper.initialBlogs.length +1)
    expect(contents).toContainEqual(0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      author: 'BlogiKeisari',
      url: 'https://paviaanejaOomeKaikki.com/',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .set('Authorization', userToken)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Paviaanien valtakunta',
      author: 'BlogiKeisari',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .set('Authorization', userToken)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without token is not added', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Paviaanien valtakunta',
      author: 'BlogiKeisari',
      url: 'https://paviaanejaOomeKaikki.com/',
      likes: 6
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 's')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

test('blog deleted', async () => {
  let getBlogs = await api.get('/api/blogs')
  let id = getBlogs.body[0].id
  await api
    .delete('/api/blogs/'+id)
    .set('Authorization', userToken)
    .expect(204)

  let response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating first blog', async () => {
  let getBlogs = await api.get('/api/blogs')
  let id = getBlogs.body[0].id
  const updatedBlog = {
    title: 'Kukkamaan kuninkaat',
    author: 'BlogiKeisari',
    url: 'https://kukkiaKaikkialla.com/',
    likes: 56
  }
  await api
    .put('/api/blogs/'+id)
    .send(updatedBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  expect(contents).toContainEqual(56)
})


afterAll(() => {
  mongoose.connection.close()
})