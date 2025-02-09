const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }
    const notificationStyle = {
        color: `${notification.color}`
    }

    return (
        <div style={notificationStyle} className="error">
        {notification.message}
        </div>
    )
}

export default Notification