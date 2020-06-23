import React from 'react'
import loginService from '../services/login'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const LogingHandler = ({ setUser, username, password, setUsername, setPassword, setError, setMessage }) => {
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
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
        setMessage(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
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
  setError: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default LogingHandler