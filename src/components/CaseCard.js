import React from "react";
import { Link } from 'react-router-dom';

const CaseCard = ({ userCase }) => {
    const {id, allegation_type, department, status, datetime} = userCase

    console.log(userCase)


    return (

        <li>
            <Link to={`/Cases/${id}`}>
                <p>{allegation_type}</p>
                <p>{department}</p>
                <p>{status}</p>
                <p>{datetime}</p>
            </Link>
        </li>
    )
}

export default CaseCard;