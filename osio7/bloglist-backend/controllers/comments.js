const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { url: 1, title: 1, author: 1, id: 1 })
  response.json(comments.map(comment => comment.toJSON()))
})

commentRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(body.blogId)
  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  })
  const savedComment = await comment.save()
  console.log('savedComment: ', savedComment)
  blog.comments = blog.comments.concat(savedComment._id)
  console.log('blog.comments: ', blog.comments)
  await blog.save()
  console.log(blog)
  response.json(savedComment.toJSON())
})


module.exports = commentRouter