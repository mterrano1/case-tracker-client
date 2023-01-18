import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';

const Reports = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [allCases, setAllCases] = useState([]);

    useEffect(() => {
        fetch('/cases')
        .then(r => r.json())
        .then(data => setAllCases(data))
    }, []);

    if (!allCases) {
        return (
            <h1>Loading...</h1>
        )
    } else if (loggedIn && user.role === 'Manager') {
        return (
            <div>
                <h1>Reports Page</h1>
                <p>Customer service complaints: {allCases['Customer service']}</p>
                <p>Fee's complaints: {allCases['Fees']}</p>
                <p>Discrimination complaints: {allCases['Discrimination']}</p>
                <p>Unauthorized account complaints: {allCases['Unauthorized account']}</p>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Reports;