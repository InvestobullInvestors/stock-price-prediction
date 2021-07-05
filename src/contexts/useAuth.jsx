import React, {createContext, useContext, useEffect, useState} from 'react'
import {auth, firestore} from '../auth/firebase.jsx'
import {useUser} from "./useUser";

const USERS_COLLECTION_PATH = "users"

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const {setUser} = useUser()

    const [loading, setLoading] = useState(true)

    const signup = (firstname, lastname, email, password) => {
        return auth.createUserWithEmailAndPassword(email, password).then(credentials => {
            firestore.collection(USERS_COLLECTION_PATH).doc(credentials.user.uid).set({
                first_name: firstname,
                last_name: lastname,
                email: email,
                plan: "free",
                stripe_id: "",
                watchlist: []
            }).then(() => {
                console.log("new user created: " + email)
            })
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const setCurrentUser = (uid, data) => {
        setUser({
            uid: uid,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            plan: data.plan,
            stripe_id: data.stripe_id,
            watchlist: data.watchlist
        })
    }

    useEffect(() => {
        return auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser != null) {
                firestore.collection(USERS_COLLECTION_PATH).doc(firebaseUser.uid).get().then(doc => {
                    setCurrentUser(firebaseUser.uid, doc.data())
                }).catch((err) => console.log(err.message))
            } else {
                setUser(null)
            }
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{signup, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => (
    useContext(AuthContext)
)

export default AuthProvider
