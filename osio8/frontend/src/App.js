import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBookFrom from './components/AddBookFrom'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('booklist-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
    set.map(p => p.id).includes(object.id)

    const dataInBooksStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInBooksStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInBooksStore.allBooks.concat(addedBook) }
      })
    }
    const dataInAuthorStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInAuthorStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : dataInAuthorStore.allAuthors.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Uusi kirja lisätty! ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(addedBook)
    }
  })

  const states = {
    AUTHORS: 'authors',
    BOOKS: 'books',
    ADDBOOK: 'addBook',
    LOGIN: 'login',
    RECOMMEND: 'recommend'
  }

  const [ state, setState] = useState(states.AUTHORS)

  if (authors.loading)  {
    return <div>loading authors...</div>
  }
  if (books.loading)  {
    return <div>loading books...</div>
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  

  const renderState = (state) => {
    switch(state) {
      case states.AUTHORS:
        return <div> <Authors authors={authors.data.allAuthors} /> </div>
      case states.BOOKS:
        return <div> <Books books={books.data.allBooks} /> </div>
      case states.ADDBOOK:
        return <div> <AddBookFrom /> </div>
      case states.LOGIN:
        return <div> <LoginForm  setToken={setToken} /> </div>
      case states.RECOMMEND:
          return <div> <Recommend books={books.data.allBooks} /> </div>
      default:
        return <div> <Authors authors={authors.data.allAuthors} /> </div>
    }
  }

  const buttons = () => {
    if (!token) {
      return (
        <div>
          <button onClick={() => setState(states.AUTHORS)}>Authors</button>
        <button onClick={() => setState(states.BOOKS)}>Books</button>
          <button onClick={() => setState(states.LOGIN)}>Login</button>
        </div>
      )
    }
    return (
      <div>
        <button onClick={() => setState(states.AUTHORS)}>Authors</button>
        <button onClick={() => setState(states.BOOKS)}>Books</button>
        <button onClick={() => setState(states.ADDBOOK)}>Add book</button>
        <button onClick={() => setState(states.RECOMMEND)}>Recommend</button>
        <button onClick={() => logout()}>Log out</button>
      </div>
    )
  }

  return (
    <div>
      {buttons()}
      {renderState(state)}
    </div>
  )
}

export default App
