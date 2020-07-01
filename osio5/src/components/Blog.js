import React, { useState } from 'react'

const Blog = ({ blog, user, removeThisBlog, updateThisLike }) => {
  const [informationVisible, setInformationVisible] = useState(false)
  const hideWhenVisible = { display: informationVisible ? 'none' : '' }
  const showWhenVisible = { display: informationVisible ? '' : 'none' }

  const removeCheck = () => {
    if (blog.user.name === user.name) {
      return (
        <div>
          <button onClick={removeThisBlog}>remove</button>
        </div>
      )
    }
  }
  const showBlog = () => {
    if (informationVisible) {
      return (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setInformationVisible(false)}>cancel</button>
          <br/> {blog.url}
          <br/> Likes: {blog.likes}
          <button onClick={updateThisLike}>like</button>
          <br/> {blog.user.name}
          {removeCheck()}
        </div>
      )
    } else {
      return (
      <div>
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => setInformationVisible(true)}>view</button>
      </div>
      )
    }
  }

  return (
    <div className='blogStyle'>
      {showBlog()}
    </div>
  )
}

export default Blog
