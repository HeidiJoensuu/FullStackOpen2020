import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state
        .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((object1, object2) => object2.votes - object1.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return  async dispatch => {
    const voted = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    let anecdotes = await anecdoteService.getAll()
    anecdotes.sort((object1, object2) => object2.votes - object1.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}



export default reducer