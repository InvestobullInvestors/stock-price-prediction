import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [news, setNews] = useState([])
    const [notifications, setNotifications] = useState([])
    const [watchlist, setWatchlist] = useState([])

    const addToWatchlist = ticker => {
        console.log(`Adding stock: ${ticker} to watchlist`)
    }

    const removeFromWatchlist = ticker => {
        console.log(`Removing stock: ${ticker} from watchlist`)
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
                removeFromWatchlist
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => (
    useContext(UserContext)
)

export default UserProvider
