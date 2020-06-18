import React, { useState } from 'react'
import BlogService from '../services/blogs'

const AddBLog = ({blogs, setBlogs, setMessage, setError, blogFormRef}) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const handleTitleChange = event => setNewTitle(event.target.value)
  const handleAuthorChange = event => setNewAuthor(event.target.value)
  const handleUrlChange = event => setNewUrl(event.target.value)

  const addIt = (event) => {
    event.preventDefault()
    const noteBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    blogFormRef.current.toggleVisibility()
    BlogService
      .create(noteBlog)
      .then(returnedBlog =>{
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setMessage(`A new blog: '${newTitle}' by '${newAuthor} added'`)
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

  return (
    <div>
      <form onSubmit={addIt}>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange}/>
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}
export default AddBLog