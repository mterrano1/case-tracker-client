import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import ResearcherCases from '../components/ResearcherCases';

const ManagerDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [userList, setuserList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(r => r.json())
        .then(data => setuserList(data))
    }, []);

    if (!userList) {
        return (
            <h1>Loading...</h1>
        )
    } else if (loggedIn && user.role === 'Manager') {
        return (
            <div>
                <h1>Manager Dashboard</h1>
                <ul>
                    {userList.map((user) => (
                        <ResearcherCases key={user.id} researcher={user} />
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default ManagerDashboard;