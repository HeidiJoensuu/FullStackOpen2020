import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_BOOK } from '../queries'

const Books = ({ books }) => {
  let genrelist = []
  let [booksList, setBookList] = useState(books)
  let [selected, setSelected] = useState('')
  const [getGenre, {loading, data}] = useLazyQuery(FIND_BOOK)

  useEffect(() => {
    if (data) {
      setBookList(data.allBooks)
    }
  })

  if (loading) return <p>Loading...</p>
  
  const genres = () => {
    books.forEach(book => {
      book.genres.forEach(genre => {
        if(!genrelist.find(element => element === genre)){
          genrelist.push(genre)
        }
      })
    })
    return (
      <div>
        {genrelist.map(genreButton =>
          <button
            key={genreButton}
            onClick={() => (
              getGenre({variables: {genre: genreButton}}),
              setSelected(genreButton)
            )}
            >{genreButton}</button>
        )}
        <button
          key='reset'
          onClick={() => (
            getGenre({variables: {genre: ''}}),
            setSelected('')
          )}
        >all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <p>in genre <b>{selected}</b></p>
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
      {genres()}
    </div>
  )
}

export default Books