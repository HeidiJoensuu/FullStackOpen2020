import React from 'react'
import EditAuthor from './EditAuthor'

const Authors = ({ authors }) => {
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map(author =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr> 
          )}
        </tbody>
      </table>
      <EditAuthor authors={authors}/>
    </div>
  )
}

export default Authors