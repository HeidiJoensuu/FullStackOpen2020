import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id

  
  const user = users.find(n => n.id === id)
  if (!user) {
    return null
  }
  console.log(user.blogs);
  return (
    <div>
      <h2 className='userHeadline'>{user.name}</h2>
      <h5>Added blogs</h5>
      <div>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
          )}
      </div>
    </div>
  )
}

export default User