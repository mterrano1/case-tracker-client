import React, { useEffect, useState } from "react";
const UserContext = React.createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userCases, setUserCases] = useState([]);

    useEffect(() => {
        //Auto-login
        fetch('/me')
        .then(r => r.json())
        .then(data => {
            if (!data.errors){
                setLoggedIn(true)
                setUser(data)
                setUserCases(data.assigned_cases)
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
        setUserCases(user.assigned_cases)
    }

    const logout = () => {
        setUser({})
        setLoggedIn(false)
    }

    const handleDeleteCase = (deletedCaseId) => {
        const updatedUserCases = userCases.filter((userCase) => userCase.id !== deletedCaseId)
        setUserCases(updatedUserCases)
    }

    const handleCaseStatusUpdate = (updatedCase) => {
        const caseUpdate = userCases.map(userCase => userCase.id === updatedCase['id'] ? updatedCase : userCase)
        setUserCases(caseUpdate)
    }

    return (
        <UserContext.Provider value={{
            user,
            loggedIn,
            signup,
            login,
            logout,
            userCases,
            handleDeleteCase,
            handleCaseStatusUpdate
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }