import React, {createContext, useContext, useEffect, useState} from 'react'
import firebase from "firebase";
import {auth, firestore} from '../auth/firebase.jsx'
import {useUser} from "./useUser";

const USERS = 'users'
const NEWS = 'news'
const NOTIFICATIONS = 'notifications'
const WATCHLIST = 'watchlist'
const DEFAULT = 'default'

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const {setUser, setNews, setNotifications, setWatchlist} = useUser()

    const [loading, setLoading] = useState(true)

    const signup = (displayName, email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(credentials => setupUserDetails(credentials.user.uid, displayName, email, ""))
    }

    const setupUserDetails = async (uid, displayName, email, photoURL) => {
        const currentUser = firestore.collection(USERS).doc(uid)

        const welcomeMessage = {
            text: "Welcome to InvestoBull",
            viewed: false,
            timestamp: Date.now()
        }

        await currentUser.set({
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            plan: "basic",
            plan_expiry: null,
            stripe_id: ""
        })
        await currentUser.collection(NEWS).doc(DEFAULT).set({list: []})
        await currentUser.collection(NOTIFICATIONS).doc(DEFAULT).set({list: [welcomeMessage]})
        await currentUser.collection(WATCHLIST).doc(DEFAULT).set({list: []})
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: async (authResult) => {
                if (authResult.additionalUserInfo.isNewUser) {
                    const uid = authResult.user.uid
                    const displayName = authResult.user.displayName
                    const email = authResult.user.email
                    const photoURL = authResult.user.photoURL
                    await setupUserDetails(uid, displayName, email, photoURL)
                }
                return true;
            }
        }
    }

    const logout = () => {
        return auth.signOut()
    }

    const setCurrentUser = (uid, data) => {
        setUser({
            uid: uid,
            displayName: data.displayName,
            email: data.email,
            photoURL: data.photoURL,
            plan: data.plan,
            plan_expiry: data.plan_expiry,
            stripe_id: data.stripe_id
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
            if (firebaseUser) {
                const currentUser = firestore.collection(USERS).doc(firebaseUser.uid)

                await currentUser.get()
                    .then(doc => setCurrentUser(firebaseUser.uid, doc.data()))
                    .catch(err => console.error(err.message))

                await currentUser.collection(NEWS).doc(DEFAULT).get()
                    .then(doc => setNews(doc.data()?.list ? doc.data().list : []))
                    .catch(err => console.error(err.message))

                await currentUser.collection(NOTIFICATIONS).doc(DEFAULT).get()
                    .then(doc => setNotifications(doc.data()?.list ? doc.data().list : []))
                    .catch(err => console.error(err.message))

                await currentUser.collection(WATCHLIST).doc(DEFAULT).get()
                    .then(doc => setWatchlist(doc.data()?.list ? doc.data().list : []))
                    .catch(err => console.error(err.message))

            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{signup, login, resetPassword, uiConfig, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => (
    useContext(AuthContext)
)

export default AuthProvider
