import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import AddBlog from '../components/AddBlog'
import AddBLog from '../components/AddBlog'

let blog
let user

beforeAll(() => {
  blog = {
    title:'Testaajien markkinat',
    author:'Unikulma',
    url:'www.waawaawaa.fi',
    likes: 7,
    user: '5ee61869a99fa127607a26cf'
  }
  user = {
    id:'5ee61869a99fa127607a26cf',
    userName: 'testaaja',
    name: 'test'
  }
})

test('renders only title & auhtor', () => {
  const component = render(
    <Blog blog = { blog } user={user} />
  )

  //component.debug()
  expect(component.container).toHaveTextContent(
    'Testaajien markkinat', 'Unikulma'
  )
})

test('clicking view-button shows more information', () => {
  const component = render(
  <Blog blog = { blog } user={user}/>
  )
  fireEvent.click(component.getByText('view'))
  expect(component.container).toHaveTextContent(
    'Testaajien markkinat', 'Unikulma', 'www.waawaawaa.fi', '7'
  )
})


test('clicking like botton twice', () => {
  const mockHandler = jest.fn()
  const component = render(
  <Blog blog = { blog } user={user} updateThisLike={mockHandler}/>
  )
  
  fireEvent.click(component.getByText('view'))
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls.length).toBe(2)
})

test('AddBog ands new blog', () => {
  const createBlog = jest.fn()
  
  const component = render(
  <AddBLog addBlog={createBlog}/>
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  
  fireEvent.change(title, { 
    target: { value: 'test' } 
  })
  fireEvent.change(author, { 
    target: { value: 'test' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.test.fi' } 
  })
  fireEvent.submit(form)
  
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test' )
  expect(createBlog.mock.calls[0][0].author).toBe('test' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.fi' )

})



