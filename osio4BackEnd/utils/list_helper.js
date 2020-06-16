var _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(element => {
    total += element.likes
  })
  return total
}

const emptyList = (blogs) => {
  console.log(blogs.length)
  return blogs.length
}

const allTotalLikes = (blogs) => {
  let total = 0
  blogs.forEach(element => {
    total += element.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  let bestOne
  blogs.forEach(element => {
    if (!bestOne || bestOne.likes < element.likes) bestOne=element
  })
  return {
    title: bestOne.title,
    author: bestOne.author,
    likes: bestOne.likes
  }
}

const mostBlogs = (blogs) => {
  let authors = []
  for (let x = 0; x < blogs.length; x++){
    if (_.some(authors, { author: blogs[x].author })) {
      _.find(authors, ['author', blogs[x].author]).blogs += 1
    } else {
      authors.push({ author: blogs[x].author, blogs: 1 })
    }
  }
  return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
  let authors = []
  for (let x = 0; x < blogs.length; x++){
    if (_.some(authors, { author: blogs[x].author })) {
      _.find(authors, ['author', blogs[x].author]).likes += blogs[x].likes
    } else {
      authors.push({ author: blogs[x].author, likes: blogs[x].likes })
    }
  }
  return _.maxBy(authors, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  emptyList,
  allTotalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}