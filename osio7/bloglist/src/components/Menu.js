import React from 'react'
import { logOut } from '../reducers/loginReducer'
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button, ToggleButton, ToggleButtonGroup, ButtonGroup  } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  
  const hangleLogOut = (event) => {
    event.preventDefault()
    dispatch(logOut())
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand size="lg">Ultimate BlogList</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" fill>
            <Nav.Item>
              <Nav.Link onClick={(e) => history.push('/')}>Blogs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={(e) => history.push('/users')}>Users</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <p><strong style={{color: "forestgreen"}}>{user.name}</strong> logged in <Button variant="outline-success" onClick={hangleLogOut}>Log out</Button></p>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
