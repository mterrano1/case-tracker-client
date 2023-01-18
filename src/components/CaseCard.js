import React from "react";
import { Link } from 'react-router-dom';

const CaseCard = ({ userCase }) => {
    const {id, allegation_type, department, status, days_ago} = userCase


    return (

        <li>
            <Link to={`/Cases/${id}`}>
                <p>{allegation_type}</p>
                <p>{department}</p>
                <p>{status}</p>
                <p>{days_ago}</p>
            </Link>
        </li>
    )
}

export default CaseCard;