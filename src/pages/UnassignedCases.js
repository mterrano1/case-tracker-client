import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';

const UnassignedCases = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn && user.role === 'Manager') {
        return (
            <div>
                <h1>UnassignedCases Page</h1>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default UnassignedCases;