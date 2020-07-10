import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const blogToChange = state.find(n => n.id === action.data.id)
      const changedBlog = {...blogToChange, likes: blogToChange.likes +1}
      return state
        .map(blog => blog.id !== action.data.id ? blog : changedBlog)
        .sort((object1, object2) => object2.likes - object1.likes)
    case 'REMOVE_BLOG':
      return  action.data
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    let blogs = await blogsService.getAll()
    blogs.sort((object1, object2) => object2.likes - object1.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const liked = await blogsService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: liked
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogsService.removeBlog(blog.id)
    const list = await blogsService.getAll()
    list.sort((object1, object2) => object2.likes - object1.likes)
    dispatch({
      type: 'REMOVE_BLOG',
      data: list
    })
  }
}

export default reducer