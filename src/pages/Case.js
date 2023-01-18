import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import DeleteCaseButton from '../components/DeleteCaseButton';
import CaseAssignmentForm from '../components/CaseAssignmentForm';


const Case = () => {
    const { id } = useParams();
    const {user, loggedIn, userCases} = useContext(UserContext);

    const filterCase = userCases.filter(userCase => userCase.id === parseInt(id))

    const displayedCases = filterCase.map(displayedCase => (
        <div key={displayedCase.id} >
            <p>{displayedCase.allegation_type}</p>
            <p>{displayedCase.allegation}</p>
            <p>{displayedCase.department}</p>
            <p>{displayedCase.status}</p>
            <p>{displayedCase.resolution}</p>
            {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id}/> : ''}
            {user.role === 'Manager' && displayedCase.status === "Unassigned" ?
            <CaseAssignmentForm caseId={displayedCase.id}/> : ''}
            {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id}/> : <p>Not a Manager</p>}
        </div>
    ))

    if (loggedIn) {
        return (
            <div>
                <h1>Case Page</h1>
                {displayedCases}
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Case;