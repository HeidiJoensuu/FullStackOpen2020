import React, { useEffect } from 'react'

import Notification from './components/Notification'
import LogingHandler from './components/LogingHandler'
import Menu from './components/Menu'
import BlogsForm from './components/BlogsForm'
import UsersForm from './components/UsersForm'
import User from './components/User'
import Blog from './components/Blog'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

import { initializeBlog } from './reducers/blogsReducer'
import { useDispatch,useSelector } from 'react-redux'
import { loggedUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(loggedUser())
    dispatch(initializeUsers())
  }, [dispatch])


  return (
    <div>
      <Notification />
      {user === null
        ? <LogingHandler />
        : <Router>
            <Menu />
            <Container>
              <Switch>
                <Route path='/users/:id'>
                  <User />
                </Route>
                <Route path='/blogs/:id'>
                  <Blog />
                </Route>
                <Route path='/users'>
                  <UsersForm />
                </Route>
                <Route path='/'>
                  <BlogsForm />
                </Route>
              </Switch>
            </Container>
          </Router>
      }
    </div>
  )
}

export default App