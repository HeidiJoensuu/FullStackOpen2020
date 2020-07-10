import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, likeBlog,deleteBlog } from '../reducers/blogsReducer'

const Blogs = ({ user, setBlogs}) => {
  const dispatch = useDispatch()
  const blogList = useSelector(state => state.blogs)
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
    try {
      dispatch(createBlog(blogObject))
      blogList.concat(blogObject)
      dispatch(setNotification(`A new blog: '${blogObject.title}' by '${blogObject.author} added'`, false))
    }
    catch(error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }


  const removeB = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`'${blog.title}' has been deleted`, false))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, true))
      }
    }
  }

  const updateLike = (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch(error) {
      dispatch(setNotification(error.response.data.error, true))
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
        {blogList.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user ={user}
            updateThisLike = {() => updateLike(blog)}
            removeThisBlog = {() => removeB(blog)}
          />)}
      </div>
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blogs

