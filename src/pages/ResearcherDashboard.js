import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';

const ResearcherDashboard = () => {
    const {user, loggedIn, userCases} = useContext(UserContext);

    console.log(userCases)

    if (loggedIn && user.role === 'Researcher') {
        return (
            <div>
                <h1>Researcher Dashboard</h1>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default ResearcherDashboard;