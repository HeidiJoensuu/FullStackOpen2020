import React from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'

const LogingHandler = ({ setUser, username, password, setUsername, setPassword}) => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      BlogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

LogingHandler.propTypes = {
  setUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LogingHandler