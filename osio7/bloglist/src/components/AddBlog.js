import React, { useState } from 'react'
import { Form, Row, Col, Button} from 'react-bootstrap'

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
      <Form onSubmit={addNewBlog}>
      <Form.Group as={Row}>
        <Form.Label column sm={1}>Title: </Form.Label>
        <Col sm={5}>
          <Form.Control id='title' value={newTitle} onChange={handleTitleChange}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1}>Author: </Form.Label>
        <Col sm={5}>
          <Form.Control id='author' value={newAuthor} onChange={handleAuthorChange}/>
        </Col>
        </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1}>Url: </Form.Label>
        <Col sm={5}>
          <Form.Control id='url' value={newUrl} onChange={handleUrlChange}/>
        </Col>
      </Form.Group>
      <Button variant='success' type="submit">create</Button>
      </Form>
      <br />
    </div>
  )

}
export default AddBLog