import React, { createContext, useContext, useState } from "react";
import { firestore } from "../auth/firebase.jsx";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [news, setNews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState({});

    const WATCHLIST = firestore
        .collection("users")
        .doc(user?.uid)
        .collection("watchlist");

    const addToWatchlist = (ticker) => {
        if (!user) return;
        WATCHLIST.doc(ticker)
            .set({ ticker: ticker })
            .then(() => console.log(`Added stock: ${ticker} to watchlist`));
        // TODO: send notification when watchlist added
    };

    const removeFromWatchlist = (ticker) => {
        if (!user) return;
        WATCHLIST.doc(ticker)
            .delete()
            .then(() => console.log(`Removed stock: ${ticker} from watchlist`));
        // TODO: send notification when watchlist removed
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
                setUserPaymentDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
