import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseTypeStats from '../components/CaseTypeStats';
import CaseDepartmentStats from '../components/CaseDepartmentStats';

const Reports = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [allCases, setAllCases] = useState({});

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
                <CaseTypeStats allCases={allCases.cases_by_allegation_type} />
                <CaseDepartmentStats allCases={allCases.cases_by_department} />
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Reports;