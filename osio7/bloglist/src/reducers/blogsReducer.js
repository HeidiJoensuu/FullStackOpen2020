import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return action.data
    case 'REMOVE_BLOG':
      return  action.data
    case 'NEW_COMMENT':
      return action.data
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    let blogs = null
    blogs = await blogsService.getAll()
    blogs.sort((object1, object2) => object2.likes - object1.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (error) {
      dispatch({
        type: 'ERROR',
        data: error.response.data.error
      })
      setTimeout(() => {
        dispatch({
          type: 'ERROR',
          data: null
        })
      }, 5000)
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogsService.update(blog)
      const blogs = await blogsService.getAll()
      dispatch({
        type: 'LIKE_BLOG',
        data: blogs
      })
    } catch (error) {
      dispatch({
        type: 'ERROR',
        data: error.response.data.error
      })
      setTimeout(() => {
        dispatch({
          type: 'ERROR',
          data: null
        })
      }, 5000)
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogsService.removeBlog(blog.id)
      const list = await blogsService.getAll()
      list.sort((object1, object2) => object2.likes - object1.likes)
      dispatch({
        type: 'REMOVE_BLOG',
        data: list
      })
    } catch (error) {
      dispatch({
        type: 'ERROR',
        data: error.response.data.error
      })
      setTimeout(() => {
        dispatch({
          type: 'ERROR',
          data: null
        })
      }, 5000)
    }
  }
}
export const createComment = content => {
  return async dispatch => {
    try {
      await blogsService.createComment(content)
      const blogs = await blogsService.getAll()
      dispatch({
        type: 'NEW_COMMENT',
        data: blogs
      })
    } catch (error) {
      dispatch({
        type: 'ERROR',
        data: error.response.data.error
      })
      setTimeout(() => {
        dispatch({
          type: 'ERROR',
          data: null
        })
      }, 5000)
    }
  }
}

export default reducer