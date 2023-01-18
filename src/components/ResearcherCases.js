import React from "react";

const ResearcherCases = ({ researcher }) => {


    return (
        <li>
            <span>{researcher.first_name} </span>
            <span>{researcher.last_name} </span>
            <p>Open cases: {researcher.open_case_count}</p>
            <p>Closed cases: {researcher.closed_case_count}</p>
        </li>
    )
}

export default ResearcherCases;