import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseTypeStats from '../components/CaseTypeStats';
import CaseDepartmentStats from '../components/CaseDepartmentStats';

const Reports = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [allCases, setAllCases] = useState({});
    const token = localStorage.getItem("token");
    // Set initial state for checked (for toggling between department and type stats)
    const [checked, setChecked] = useState(true);

    // Fetch all cases from API
    useEffect(() => {
        fetch('/rails/cases', {
            headers: {"Authorization": token}
        })
        .then(r => r.json())
        .then(data => setAllCases(data))
    }, []);

    // Render component based on user role and login status
    if (!allCases) {
        // Display loading message while cases are being fetched
        return (
            <h1>Loading...</h1>
        )
    } else if (loggedIn && user.role === 'Manager') {
        // Display case department stats or case type stats based on checked state
        return (
            <div>
                {checked ?
                <CaseDepartmentStats checked={checked} allCases={allCases.cases_by_department} onChange={setChecked} /> :
                <CaseTypeStats checked={checked} allCases={allCases.cases_by_allegation_type} onChange={setChecked} />
                }
            </div>
        )
    } else {
        // Display "Unauthorized" message if user is not a manager
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Reports;