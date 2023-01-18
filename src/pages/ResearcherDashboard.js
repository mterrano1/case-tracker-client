import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';

const ResearcherDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn && user.role === 'Researcher') {
        return (
            <div>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default ResearcherDashboard;