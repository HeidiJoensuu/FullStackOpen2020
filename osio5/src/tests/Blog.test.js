import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blogs from '../components/Blogs'


test('renders only title & auhtor', () => {
    const blog = {
        title: "Testaajien markkinat",
        author: "Unikulma",
        url: "www.waawaawaa.fi",
        likes: 7
    }

    const component = render(
        <Blog blog = { blog } />
    )

    expect(component.container).toHaveTextContent(
        'kadf'
    )
})