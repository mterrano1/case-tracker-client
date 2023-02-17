import React, { useEffect, useState } from "react";
// Create a new context
const UserContext = React.createContext();

// Provider component that will be used to wrap other components
const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userCases, setUserCases] = useState([]);
    const [closeCase, setCloseCase] = useState('');
    const [updateCaseStatus, setUpdateCaseStatus] = useState('');
    const token = localStorage.getItem("token");

    // Fetch user data from the server when the component mounts or 
    // the token, closeCase, or updateCaseStatus variables change
    useEffect(() => {
        fetch('/rails/me', {
            headers: {"Authorization": token}
        })
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
    }, [token, closeCase, updateCaseStatus]);

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
        const caseUpdate = userCases.map(userCase => userCase.id === updatedCase ? updatedCase : userCase)
        setUpdateCaseStatus(caseUpdate)
    }

    const handleCloseCase = (closedCase) => {
        setCloseCase(closedCase)
    }

    // Pass the state variables and functions down to child components via the context provider
    return (
        <UserContext.Provider value={{
            user,
            loggedIn,
            signup,
            login,
            logout,
            userCases,
            handleDeleteCase,
            handleCaseStatusUpdate,
            handleCloseCase
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
// Export the context and provider components so they can be used in other parts of the application
export { UserProvider, UserContext }