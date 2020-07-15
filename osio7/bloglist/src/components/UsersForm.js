import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { Link, useHistory } from 'react-router-dom'

const UsersForm = () => {
  const history = useHistory()
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2 className='blogsFormHeadLine'>Users</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
              <th>Users</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} onClick={() => history.push(`/users/${user.id}`)}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  )
}
export default UsersForm