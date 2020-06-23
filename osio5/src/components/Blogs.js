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
        <AddBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage = {setMessage}
          setError = {setError}
          blogFormRef = {blogFormRef}
        />
      </Togglable>
    )
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
            setMessage = {setMessage}
            setError = {setError}
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

