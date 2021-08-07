import React, { createContext, useContext, useState } from 'react';
import { firestore } from '../auth/firebase.jsx';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [news, setNews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState({});

    const WATCHLIST = firestore
        .collection('users')
        .doc(user?.uid)
        .collection('watchlist');

    const NOTIFICATIONS = firestore
        .collection('users')
        .doc(user?.uid)
        .collection('notifications');

    const addToWatchlist = (ticker) => {
        if (!user) return;
        WATCHLIST.doc(ticker)
            .set({ ticker: ticker })
            .then(() => {
                const timestamp = Date.now();
                return NOTIFICATIONS.doc(timestamp.toString()).set({
                    text: `Added ${ticker} to watchlist.`,
                    timestamp: timestamp,
                });
            });
    };

    const removeFromWatchlist = (ticker) => {
        if (!user) return;
        WATCHLIST.doc(ticker)
            .delete()
            .then(() => {
                const timestamp = Date.now();
                return NOTIFICATIONS.doc(timestamp.toString()).set({
                    text: `Removed ${ticker} from watchlist.`,
                    timestamp: timestamp,
                });
            });
    };

    const deleteOneNotification = async (timestamp) => {
        if (!user) return;

        await NOTIFICATIONS.doc(timestamp.toString()).delete();
    };

    // TODO: rename this function and update user based on payment
    const setUserPaymentDetails = (details) => {
        setPaymentDetails(details);
        console.log(paymentDetails);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                watchlist,
                setWatchlist,
                news,
                setNews,
                notifications,
                setNotifications,
                addToWatchlist,
                removeFromWatchlist,
                deleteOneNotification,
                setUserPaymentDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
