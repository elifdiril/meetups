const { createContext, useState, useEffect, useContext } = require("react");

const NotificationContext = createContext({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification && (notification.status === "success" || notification.status === "error")) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    function showNotification({ status, title, message }) {
        setNotification({ status, title, message });
    }

    function hideNotification() {
        setNotification(null);
    }

    const value = {
        notification,
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => {
    return useContext(NotificationContext);
};