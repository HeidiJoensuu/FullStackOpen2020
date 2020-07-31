import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const EditAuthor = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const authorSelector = (event) => {
    setName(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(name, Number(born));
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setBorn('')
    setName('')
  }

  return (
    <div>
      <h3>Set birth year</h3>
      <select onChange={authorSelector}>
        {authors.map(author =>
          <option key={author.name} value={author.name}>{author.name}</option>
        )}
      </select>
      <form onSubmit={submit}>
        Born: <input value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      <button type='submit'>Update author</button>
      </form>
    </div>
  )
}
export default EditAuthor