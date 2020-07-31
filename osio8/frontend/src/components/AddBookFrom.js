import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'



const AddBookFrom = () => {
  const [ createBook ] = useMutation(CREATE_BOOK, {
    //refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    onError: (error) => {
      if (error.graphQLErrors[0]) {
      console.log(error.graphQLErrors[0].message)
      }
    },
    update: (store, response) => {
      const dataInStore = store.readQuery( [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ])
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, response.data.addBook]
        }
      })
    }
    
  })

  const [ title, setTitle ] = useState('')
  const [ published, setPublished ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ genre, setGenre ] = useState('')
  const [ genres, setGenres ] = useState([])
  

  const submitGenre = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  const submitBook = async (event) => {
    event.preventDefault()
    if ((title  || published || author) === null) {
      console.log('jotain jäi lisäämättä. Title:', title, 'published:',published,'author:',author)
      return
    }
    if (!genres.length && genre) {
      setGenres([...genres, genre])
      setGenre('')
    }
    await createBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres
      }
    })
    setPublished('')
    setTitle('')
    setAuthor('')
    setGenres('')
  }

  const showGenres = () => {
    if (genres.length) {
    return <div>genres: {genres.map(genre => genre).join(', ')}</div>
    } return <div></div>
  }

  return (
    <div>
      <form onSubmit={submitBook}>
        <div>
          Title:  <input value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          Author:  <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          published:  <input value={published}
            onChange={({ target }) => setPublished(target.value)}
            />
        </div>
        <div>
          <input value={genre}
            onChange={({ target }) => setGenre(target.value)}
            />
            <button type='button' onClick={() => submitGenre()}>Add genre</button>
        </div>
        {showGenres()}
        <button type='submit'>Create book</button>
      </form>
    </div>
  )

}
export default AddBookFrom