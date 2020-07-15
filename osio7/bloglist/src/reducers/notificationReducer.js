let currentNotificationId = null;

const notificationReducer = (state = {message: null, errorStatus: false}, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data
    case 'ERROR':
      return  {message: action.data, errorStatus: true}
    default:
      return state
  }
}

export const setNotification = (notification, error) => {
  return async dispatch => {
    const timeout = 4000
    dispatch({
      type: 'NOTIFICATION',
      data: {message: notification, errorStatus: error}
    })
    
    if (currentNotificationId) { 
      clearTimeout(currentNotificationId)
    }
    currentNotificationId = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {message: null, errorStatus: false}
      })
    }, timeout)
  }
}

export default notificationReducer