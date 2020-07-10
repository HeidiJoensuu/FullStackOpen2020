import React, { useState } from 'react'

const AddBLog = ({ addBlog }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const handleTitleChange = event => setNewTitle(event.target.value)
  const handleAuthorChange = event => setNewAuthor(event.target.value)
  const handleUrlChange = event => setNewUrl(event.target.value)

  const addNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
  }
  
  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          title: <input id='title' value={newTitle} onChange={handleTitleChange}/>
        </div>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleUrlChange}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}
export default AddBLog