import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import DeleteCaseButton from '../components/DeleteCaseButton';
import CaseAssignmentForm from '../components/CaseAssignmentForm';
import CloseCaseForm from '../components/CloseCaseForm';
import CommentForm from '../components/CommentForm';


const Case = () => {
    const { id } = useParams();
    const {user, loggedIn, userCases} = useContext(UserContext);

    const filterCase = userCases.filter(userCase => userCase.id === parseInt(id))

    const displayedCases = filterCase.map(displayedCase => (
        <div key={displayedCase.id} >
            <p>Created: {displayedCase.datetime}</p>
            <p>Type: {displayedCase.allegation_type}</p>
            <p>Complaint: {displayedCase.allegation}</p>
            <p>Department: {displayedCase.department}</p>
            <p>Status: {displayedCase.status}</p>
            {displayedCase.status === 'Closed' ? <p>Resolution: {displayedCase.resolution}</p> : null}
            {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id}/> : ''}
            {user.role === 'Manager' && displayedCase.status === "Unassigned" ?
            <CaseAssignmentForm caseId={displayedCase.id}/> : null}
            {user.role === 'Researcher' && displayedCase.status === "Open" ? 
            <CloseCaseForm caseId={displayedCase.id}/> : null}
            <CommentForm caseId={displayedCase.id} user={user}/>
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