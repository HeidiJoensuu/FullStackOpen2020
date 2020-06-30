import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, user, setBlogs, setError, setMessage }) => {
  const blogFormRef = React.createRef()

  const hangleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
    BlogService.setToken(null)
  }

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <AddBlog addBlog = {addIt} />
      </Togglable>
    )
  }

  const addIt = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    BlogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog: '${blogObject.title}' by '${blogObject.author} added'`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      }).catch(error => {
        setError(true)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 4000)
      })
  }


  const removeB = (id, title, author) => {
    if (window.confirm(`Remove blog '${title}' by '${author}'?`)) {
      BlogService.removeBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          setError(true)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 4000)
        })
      setMessage(`'${title}' has been deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const updateLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    let newLike = {...blog, likes: blog.likes +1 }
    delete newLike.user
    BlogService
      .update(id, newLike)
      .then(() => {
        setBlogs(blogs
          .map(blog => blog.id !== id ? blog : {...blog, likes: blog.likes +1 })
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
        )
      })
      .catch(error => {
        setError(true)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 4000)
      })
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={hangleLogOut}>Log out</button>
      </p>
      {addBlogForm()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user ={user}
            updateThisLike = {() => updateLike(blog.id)}
            removeThisBlog = {() => removeB(blog.id, blog.title, blog.author)}
          />)}
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default Blogs

