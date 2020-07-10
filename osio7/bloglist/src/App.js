import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LogingHandler from './components/LogingHandler'
import Blogs from './components/BlogsForm'
import { initializeBlog } from './reducers/blogsReducer'
import { useDispatch,useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [ blogss, setBlogs ] = useState([])
  const [ mess, setMessage ] = useState(null)
  const [ errorMes, setError ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const blogs = useSelector(state => state.blogs) 

  useEffect(() => {
      dispatch(initializeBlog())
  }, [dispatch])

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
          setPassword = {setPassword}
        />
        :<Blogs
          blogs = {blogs}
          setBlogs={setBlogs}
          user = {user}
        />
      }
    </div>
  )
}

export default App