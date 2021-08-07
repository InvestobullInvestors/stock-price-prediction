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
            .then(() =>
                NOTIFICATIONS.add({
                    text: `Added ${ticker} to watchlist`,
                    timestamp: Date.now(),
                    viewed: false,
                })
            );
    };

    const removeFromWatchlist = (ticker) => {
        if (!user) return;
        WATCHLIST.doc(ticker)
            .delete()
            .then(() =>
                NOTIFICATIONS.add({
                    text: `Removed ${ticker} from watchlist`,
                    timestamp: Date.now(),
                    viewed: false,
                })
            );
    };

    const viewNotification = async (timestamp) => {
        if (!user) return;

        const { docs } = await NOTIFICATIONS.where('timestamp', '==', timestamp)
            .limit(1)
            .get();
        await NOTIFICATIONS.doc(docs[0].id).update({ viewed: true });
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
                viewNotification,
                setUserPaymentDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
