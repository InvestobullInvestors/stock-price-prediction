import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth, firestore } from "../auth/firebase.jsx";
import { useUser } from "./useUser";

const USERS = firestore.collection("users");
const NEWS = "news";
const NOTIFICATIONS = "notifications";
const WATCHLIST = "watchlist";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const { setUser, setNews, setNotifications, setWatchlist } = useUser();

    const [loading, setLoading] = useState(true);

    const signup = (displayName, email, password) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((credentials) =>
                createUser(credentials.user.uid, displayName, email, "")
            );
    };

    const createUser = async (uid, displayName, email, photoURL) => {
        const currentUser = USERS.doc(uid);

        const welcomeMessage = {
            text: "Welcome to InvestoBull",
            viewed: false,
            timestamp: Date.now(),
        };

        await currentUser.set({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            plan: "Basic",
            plan_expiry: null,
            stripe_id: "",
        });

        await currentUser.collection(NEWS).add({});
        await currentUser.collection(NOTIFICATIONS).add(welcomeMessage);
        await currentUser.collection(WATCHLIST).add({});
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    };

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: async (authResult) => {
                if (authResult.additionalUserInfo.isNewUser) {
                    const { uid } = authResult.user;
                    const { displayName } = authResult.user;
                    const { email } = authResult.user;
                    const { photoURL } = authResult.user;
                    await createUser(uid, displayName, email, photoURL);
                }
                return true;
            },
        },
    };

    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            const currentUser = USERS.doc(firebaseUser?.uid);

            currentUser.onSnapshot((snapshot) => setUser(snapshot.data()));

            currentUser.collection(NEWS).onSnapshot((snapshot) => {
                setNews(snapshot.docs.map((doc) => doc.data()));
            });

            currentUser.collection(NOTIFICATIONS).onSnapshot((snapshot) => {
                setNotifications(
                    snapshot.docs.reverse().map((doc) => doc.data())
                );
            });

            currentUser.collection(WATCHLIST).onSnapshot((snapshot) => {
                setWatchlist(snapshot.docs.map((doc) => doc.data()));
            });

            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{ uiConfig, signup, login, resetPassword, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
