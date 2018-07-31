import {NotificationManager} from 'react-notifications';

export const createNotification = (type, msg, title) => {
    switch (type) {
        case 'info':
            return NotificationManager.info(msg, title, 5000);
        case 'success':
            return NotificationManager.success(msg, title, 1500);
        case 'warning':
            return NotificationManager.warning(msg, title, 4000);
        case 'error':
            return NotificationManager.error(msg, title, 5000);
        default:
            return 0;
    }
};
