import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [news, setNews] = useState([])
    const [notifications, setNotifications] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [paymentDetails, setPaymentDetails] = useState({})

    const addToWatchlist = ticker => {
        console.log(`Adding stock: ${ticker} to watchlist`)
    }

    const removeFromWatchlist = ticker => {
        console.log(`Removing stock: ${ticker} from watchlist`)
    }

    const setUserPaymentDetails = details => {
        setPaymentDetails(details)
        console.log(paymentDetails)
    }

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
                setUserPaymentDetails
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => (
    useContext(UserContext)
)

export default UserProvider
