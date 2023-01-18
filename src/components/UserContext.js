import React, { useEffect, useState } from "react";
const UserContext = React.createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        //Auto-login
        fetch('/me')
        .then(r => r.json())
        .then(data => {
            if (!data.errors){
                setLoggedIn(true)
                setUser(data)
            } else {
                setLoggedIn(false)
            }
        })
    }, []);

    const signup = (user) => {
        setUser(user)
        setLoggedIn(true)
    }

    const login = (user) => {
        setUser(user)
        setLoggedIn(true)
    }

    return (
        <UserContext.Provider value={{
            user,
            loggedIn,
            signup,
            login
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }