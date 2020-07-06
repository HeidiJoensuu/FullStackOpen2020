let currentNotificationID = null;

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.String
    default:
      return state
  }   
}
export const setNotification = (String, Number) => {
  return  async dispatch => {
    const timeout = Number * 1000
    dispatch({
      type: 'NOTIFICATION',
      String
    })
    
    if (currentNotificationID) { 
      clearTimeout(currentNotificationID)
    }
    currentNotificationID = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        String: ''
      })
    }, timeout)
  }
}

export default notificationReducer