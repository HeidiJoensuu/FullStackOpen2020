import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch(action.type){
    case 'LOG_IN':      
      return action.data
    case 'LOG_OUT':      
      return action.data
    case 'INIT_USER':
      return action.data
    default:
    return state
  }
  
}
export const loggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)  
    }
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}

export const logIn = (username, password) => {
  return async dispatch => {
    try {
      let user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: user
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

export const logOut = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      window.location.reload(false)
      blogService.setToken(null)
      const user = null
      dispatch({
        type: 'LOG_OUT',
        data: user
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