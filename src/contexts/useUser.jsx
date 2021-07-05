import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})

    // user object structure: refer to useAuth.jsx -> setCurrentUser()

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => (
    useContext(UserContext)
)

export default UserProvider
