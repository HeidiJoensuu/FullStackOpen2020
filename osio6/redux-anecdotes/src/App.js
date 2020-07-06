import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFrom from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeAnecdote())
  }, [dispatch])
 
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteFrom />
    </div>
  )
}

export default App