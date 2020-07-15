import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { Button, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogList = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <AddBlog addBlog = {addIt} />
      </Togglable>
    )
  }

  const addIt = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`A new blog: '${blogObject.title}' by '${blogObject.author} added'`, false))
    }
    catch(error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  return (
    <div>
      <h2 className='blogsFormHeadLine'>BLOGS</h2>
      {addBlogForm()}
      <div>
        <Container>
          {blogList.map(blog =>
            <li key={blog.id} className='blogList'>
              {blog.title} 
              <Link to={`/blogs/${blog.id}`}><Button variant="outline-success" className='blogButton' key={blog.id}>view</Button></Link>
            </li>
          )}
        </Container>
      </div>
    </div>
  )
}

export default BlogForm

