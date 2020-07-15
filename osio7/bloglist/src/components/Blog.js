import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { likeBlog,deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogsReducer'
import { Link, useHistory } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const Blog = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const id = useParams().id
  const [ newContent, setNewContent ] = useState('')
  const handleContentChange = event => setNewContent(event.target.value)
  
  const blog = blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }

  const removeB = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`'${blog.title}' has been deleted`, false))
      history.push('/')
    } 
  }

  const removeCheck = () => {
    if (blog.user.name === user.name) {
      return (
        <div>
          <Button  variant="outline-light" onClick={() => removeB(blog)}>remove</Button>
        </div>
      )
    }
  }

  const updateLike = (blog) => {
    dispatch(likeBlog(blog))
  }
  
  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment({content: newContent, blogId: blog.id}))
    setNewContent('')
  }

  return (
    <div>
      <h2 className='blogHeadLine'>{blog.title}</h2>
      <p className='byUser'>by {blog.author}</p>
      <br/> <Link to={blog.url} key={blog.id} className='link'>{blog.url}</Link>
      <br/><br/> Likes: {blog.likes} <br/>
      <Button variant="success" onClick={() => updateLike(blog)}>like</Button>
      <br/> <p className='byUser'> added by {blog.user.name}</p>
      {removeCheck()}
      <br />
      <br /><h4>Comments</h4>
      <br />
      <form onSubmit={addComment}>
        <div>
          <input id='content' value={newContent} onChange={handleContentChange}/>
          <button type='submit'>Comment</button>
        </div>
      </form> <br/>
      <div> 
        {blog.comments.map(comment =>
          <div className='commentStyle' key={comment.id}>{comment.content}</div>
        )}
      </div>
    </div>
  )
}

export default Blog
