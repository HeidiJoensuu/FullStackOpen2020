import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LogingHandler from './components/LogingHandler'
import Blogs from './components/Blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ mess, setMessage ] = useState(null)
  const [ errorMes, setError ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
       const user = JSON.parse(loggedUserJSON)
       setUser(user)
       blogService.setToken(user.token)
      }
    }, [])

  return (
    <div>
      <Notification message={mess} errorMes={errorMes} />
      {user === null
        ? <LogingHandler
        user = {user}
        setUser = {setUser}
        username = {username}
        password = {password}
        setUsername = {setUsername}
        setError = {setError}
        setPassword = {setPassword}
        setMessage = {setMessage}
      />
      : <Blogs
          blogs = {blogs}
          setBlogs={setBlogs}
          user = {user}
          setError = {setError}
          setMessage = {setMessage}
        />
      }
    </div>
  )
}

export default App