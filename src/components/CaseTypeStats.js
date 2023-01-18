import React from "react";

const CaseTypeStats = ({ allCases }) => {
    if (!allCases) {
        return (
            <h5>Loading...</h5>
        )
    } else {
        return (
            <div>
                <h3>Type</h3>
                <p>Customer service complaints: {allCases['Customer service']}</p>
                <p>Fee's complaints: {allCases['Fees']}</p>
                <p>Discrimination complaints: {allCases['Discrimination']}</p>
                <p>Unauthorized account complaints: {allCases['Unauthorized account']}</p>
            </div>
        )
    }
}

export default CaseTypeStats;