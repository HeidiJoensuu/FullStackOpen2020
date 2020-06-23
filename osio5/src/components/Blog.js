import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, setMessage, setError, removeThisBlog }) => {
  const [informationVisible, setInformationVisible] = useState(false)
  const [thisBlog, setThisBlog] = useState(blog)
  const hideWhenVisible = { display: informationVisible ? 'none' : '' }
  const showWhenVisible = { display: informationVisible ? '' : 'none' }

  const UpdateLike = () => {
    let newLike = { likes: blog.likes + 1 }

    blogService
      .update(blog.id, newLike)
      .then(returnedBlog => {
        setThisBlog(returnedBlog)
        setInformationVisible(false)
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
  const removeCheck = () => {
    if (blog.user.name === user.name) {
      return (
        <div>
          <button onClick={removeThisBlog}>remove</button>
        </div>
      )
    }
  }

  return (
    <div className='blogStyle'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInformationVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInformationVisible(false)}>cancel</button>
        <br/> {blog.url}
        <br/> {thisBlog.likes}
        <button onClick={() => UpdateLike()}>like</button>
        <br/> {blog.user.name}
        {removeCheck()}
      </div>
    </div>
  )
}

export default Blog
