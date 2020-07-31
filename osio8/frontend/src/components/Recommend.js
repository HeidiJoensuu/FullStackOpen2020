import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { FIND_BOOK, ME } from '../queries'

const Recommend = (books) => {
  let user = useQuery(ME)
  const [getGenre, {loading, data}] = useLazyQuery(FIND_BOOK)
  let [booksList, setBookList] = useState([])

  useEffect(() => {
    if (data) {
      setBookList(data.allBooks)
    }
  })

  if (user.loading) return <p>loading user...</p>
  if (loading) return <p>Loading...</p>

  if (!booksList.length) {
    getGenre({variables: {genre: user.data.me.favoriteGenre}})
  }
  
  return (
    <div>
      <h3>Recommendations</h3>
      <p>Hi {user.data.me.username}!</p>
      <p>Books in your favourite genre: <b>{user.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksList.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr> 
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Recommend