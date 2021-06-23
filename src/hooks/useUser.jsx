import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext({})

// const userList = [
//     {
//         username: "paul",
//         password: "potato123",
//         plan: "free"
//     },
//     {
//         username: "himanshu",
//         password: "potato456",
//         plan: "free"
//     }
// ]

const UserProvider = ({children}) => {
    const guestUser = {
        username: "",
        password: "",
        price_plan: "free"
    }

    const [user, setUser] = useState(guestUser)

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
