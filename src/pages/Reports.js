import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseTypeStats from '../components/CaseTypeStats';
import CaseDepartmentStats from '../components/CaseDepartmentStats';

const Reports = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [allCases, setAllCases] = useState({});
    const token = localStorage.getItem("token");
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/cases', {
            headers: {"Authorization": token}
        })
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
                {checked ?
                <CaseDepartmentStats checked={checked} allCases={allCases.cases_by_department} onChange={setChecked} /> :
                <CaseTypeStats checked={checked} allCases={allCases.cases_by_allegation_type} onChange={setChecked} />
                }
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Reports;