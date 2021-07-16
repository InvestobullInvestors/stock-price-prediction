import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState({}) // user structure: refer to useAuth.js -> setCurrentUser()
    const [news, setNews] = useState([]) // news: [{}]
    const [notifications, setNotifications] = useState([]) // notifications: [{}]
    const [watchlist, setWatchlist] = useState([]) // watchlist: string[]

    return (
        <UserContext.Provider value={{user, setUser, watchlist, setWatchlist, news, setNews, notifications, setNotifications}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => (
    useContext(UserContext)
)

export default UserProvider
