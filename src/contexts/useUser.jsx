import React, { createContext, useContext, useState } from 'react';
import { firestore } from '../auth/firebase.jsx';
import useDateFormat from '../hooks/useDateFormat';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const USER = firestore.collection('users').doc(user?.uid);
    const NOTIFICATIONS = USER.collection('notifications');
    const PAYMENTS = USER.collection('payments');
    const WATCHLIST = USER.collection('watchlist');

    const formatDate = useDateFormat();

    const addToWatchlist = (ticker) => {
        if (!user) return;

        WATCHLIST.doc(ticker)
            .set({ ticker: ticker })
            .then(() => {
                const timestamp = Date.now();
                return NOTIFICATIONS.doc(timestamp.toString()).set({
                    text: `Added ${ticker} to watchlist`,
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
                    text: `Removed ${ticker} from watchlist`,
                    timestamp: timestamp,
                });
            });
    };

    const deleteOneNotification = async (timestamp) => {
        if (!user) return;

        await NOTIFICATIONS.doc(timestamp.toString()).delete();
    };

    const upgradeUserPlan = async ({ paymentId, amount }) => {
        if (!user) return;
        if (amount !== 5 && amount !== 10) return;

        const dateNow = new Date();
        await PAYMENTS.doc(dateNow.toString()).set({
            paymentId: paymentId,
            amount: amount,
        });

        const plan = amount === 5 ? 'Premium' : 'Unlimited';
        const expiryDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1));
        const planExpiry = formatDate(expiryDate.toISOString());
        await USER.set(
            { plan: plan, plan_expiry: planExpiry },
            { merge: true }
        );
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                watchlist,
                setWatchlist,
                payments,
                setPayments,
                notifications,
                setNotifications,
                addToWatchlist,
                removeFromWatchlist,
                deleteOneNotification,
                upgradeUserPlan,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
