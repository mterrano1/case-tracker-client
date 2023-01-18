import React, { useContext, useEffect } from "react";
import { UserContext } from '../components/UserContext';

const Reports = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn && user.role === 'Manager') {
        return (
            <div>
                <h1>Reports Page</h1>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Reports;