import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => <h1>{header}</h1>
const Header2 = ({header2}) => <h1>{header2}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const setRandom = (anecdotes) => {
  const number = Math.floor(Math.random() * anecdotes)
  return number
}

const createList = (anecdotes) => {
  let list = []
  for (let index = 1; index <= anecdotes; index++) {
    list.push(0)
  }
  return list
}

const Votes = ({selected}) => {
  return (
    <div>
      <p>This one has {selected} votes</p>
    </div>
  )
}

const MostVotes = ({vote}) => {
  let bestNmb = vote[0]
  let bestLine = anecdotes[0]
  for (let index = 1; index <= vote.length; index++) {
      if (bestNmb < vote[index]){
        bestNmb = vote[index]
        bestLine = anecdotes[index]
      }
  }
  return (
    <div>
      <p>{bestLine}</p>
    </div>
  )
}

const App = (props) => {
  const header = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(createList(anecdotes.length))
  
  const voted = (vote, selected) => {
    let copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <Header header={header} />
      {props.anecdotes[selected]}
      <Votes selected = {vote[selected]} />
      <br /><Button handleClick={() => voted(vote, selected)} text='Upvote!' />
      <Button handleClick={() => setSelected(setRandom(anecdotes.length))} text='Give me a new anecdote!' />
      <Header2 header2={header2} />
      <MostVotes vote = {vote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)