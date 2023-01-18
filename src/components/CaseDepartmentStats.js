import React from "react";

const CaseDepartmentStats = ({ allCases }) => {

    if (!allCases) {
        return (
            <h5>Loading...</h5>
        )
    } else {
        return (
            <div>
                <h3>Department</h3>
                <p>Business Banking complaints: {allCases['Business Banking']}</p>
                <p>Home Mortgage complaints: {allCases['Home Mortgage']}</p>
                <p>Local Branch complaints: {allCases['Local Branch']}</p>
                <p>Phone Bank complaints: {allCases['Phone Bank']}</p>
                <p>Wealth Management complaints: {allCases['Wealth Management']}</p>
            </div>
        )
    }
}

export default CaseDepartmentStats;