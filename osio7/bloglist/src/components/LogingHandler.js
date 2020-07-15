import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logIn } from '../reducers/loginReducer'
import { Form, Container, Row, Col, Button} from 'react-bootstrap'

const LogingHandler = ( ) => {
  const dispatch = useDispatch()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
      dispatch(logIn(username, password))
      setUsername('')
      setPassword('')
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className='logingHeadLine'>Log in to application</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  id='username'
                  type="text"
                  value={username}
                  name="Username"
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id='password'
                  type="password"
                  value={password}
                  name="Password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Group>
              <Button variant="success" size="lg" id='loginButton' type="submit">login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LogingHandler