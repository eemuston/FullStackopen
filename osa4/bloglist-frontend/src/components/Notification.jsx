import './Notification.css'

const Notification = ({ notification }) => {
    if (!notification || notification.message === null) {
        return null
    }
    const notificationStyle = {
        color: notification.color || 'black'
    }

    return (
        <div style={notificationStyle} className="notification">
        {notification.message}
        </div>
    )
}

export default Notification