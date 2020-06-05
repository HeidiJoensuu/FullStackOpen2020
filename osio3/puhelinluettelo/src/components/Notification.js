import React from 'react'

const Notification = ({message, errorMes}) => {
  if (message === null) {
    return null
  }

  if (errorMes === true){
    return (
    <div className="error">
      {message}
    </div>
    )
  }

  return (
    <div className="message">
      {message}
    </div>
  )

}

export default Notification
