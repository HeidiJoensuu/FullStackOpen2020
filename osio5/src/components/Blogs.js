import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import BlogService from '../services/blogs'

const Blogs = ({ blogs, user, setUser, setBlogs, setError, setMessage }) => {
  const [ blogList, setBlogList ] = useState(blogs)
  const blogFormRef = React.createRef()

  const hangleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
    BlogService.setToken(null)
  }

   useEffect(() => {
    setBlogList(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
  },[blogs])

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
      console.log(id, title, author);
      
      BlogService.removeBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id))
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
        {blogList.map(blog =>
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
export default Blogs

