import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.visibleNotification) {
    return (
      <div style={style}>
        {props.visibleNotification}
      </div>
    )
  }
  return (<div />)
}

const notificationToShow = ( notification ) => {
  return notification.notification
}
const stateToProps = (state) => {
  return {
    visibleNotification: notificationToShow(state)
  }
}

const ConnectedNotifications = connect(stateToProps)(Notification)

export default ConnectedNotifications