import './Notification.css';
import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  if (!notification || notification.message === null) {
    return null;
  }
  const notificationStyle = {
    color: notification.color || 'black',
  };

  return (
    <div style={notificationStyle} className="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
