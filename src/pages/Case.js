import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import DeleteCaseButton from '../components/DeleteCaseButton';
import CaseAssignmentForm from '../components/CaseAssignmentForm';
import CloseCaseForm from '../components/CloseCaseForm';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import MuiCard from '@mui/material/Card';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiTypography from '@mui/material/Typography';

const Case = () => {
    const { id } = useParams();
    const {user, loggedIn, userCases} = useContext(UserContext);
    const [newComment, setNewComment] = useState('');
    const addComment = (comment) => {
        setNewComment(comment)
    }
    const filterCase = userCases.filter(userCase => userCase.id === parseInt(id))
    const displayedCases = filterCase.map(displayedCase => (
        <MuiCard key={displayedCase.id}>
            <MuiTypography variant="h5">Case Page</MuiTypography>
            <MuiList>
                <MuiListItem>Created: {displayedCase.datetime}</MuiListItem>
                <MuiListItem>Type: {displayedCase.allegation_type}</MuiListItem>
                <MuiListItem>Complaint: {displayedCase.allegation}</MuiListItem>
                <MuiListItem>Department: {displayedCase.department}</MuiListItem>
                <MuiListItem>Status: {displayedCase.status}</MuiListItem>
                <MuiListItem><Comments caseId={displayedCase.id} newComment={newComment} /></MuiListItem>
                {displayedCase.status === 'Closed' ? <MuiListItem>Resolution: {displayedCase.resolution}</MuiListItem> : null}
                {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id} /> : null}
                {user.role === 'Manager' && displayedCase.status === "Unassigned" ?
                <CaseAssignmentForm caseId={displayedCase.id} /> : null}
                {user.role === 'Researcher' && displayedCase.status === "Open" ? 
                <CloseCaseForm caseId={displayedCase.id} /> : null}
                <CommentForm caseId={displayedCase.id} user={user} addComment={addComment} />
            </MuiList>
        </MuiCard>
    ))
    if (loggedIn) {
        return (
            <div>
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

// import React, { useContext, useState } from "react";
// import { useParams } from 'react-router-dom';
// import { UserContext } from '../components/UserContext';
// import DeleteCaseButton from '../components/DeleteCaseButton';
// import CaseAssignmentForm from '../components/CaseAssignmentForm';
// import CloseCaseForm from '../components/CloseCaseForm';
// import CommentForm from '../components/CommentForm';
// import Comments from '../components/Comments';


// const Case = () => {
//     const { id } = useParams();
//     const {user, loggedIn, userCases} = useContext(UserContext);
//     const [newComment, setNewComment] = useState('');

//     const addComment = (comment) => {
//         setNewComment(comment)
//     }

//     const filterCase = userCases.filter(userCase => userCase.id === parseInt(id))

//     const displayedCases = filterCase.map(displayedCase => (
//         <div key={displayedCase.id} >
//             <p>Created: {displayedCase.datetime}</p>
//             <p>Type: {displayedCase.allegation_type}</p>
//             <p>Complaint: {displayedCase.allegation}</p>
//             <p>Department: {displayedCase.department}</p>
//             <p>Status: {displayedCase.status}</p>
//             <Comments caseId={displayedCase.id} newComment={newComment} />
//             {displayedCase.status === 'Closed' ? <p>Resolution: {displayedCase.resolution}</p> : null}
//             {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id}/> : ''}
//             {user.role === 'Manager' && displayedCase.status === "Unassigned" ?
//             <CaseAssignmentForm caseId={displayedCase.id}/> : null}
//             {user.role === 'Researcher' && displayedCase.status === "Open" ? 
//             <CloseCaseForm caseId={displayedCase.id}/> : null}
//             <CommentForm caseId={displayedCase.id} user={user} addComment={addComment}/>
//         </div>
//     ))

//     if (loggedIn) {
//         return (
//             <div>
//                 <h1>Case Page</h1>
//                 {displayedCases}
//             </div>
//         )
//     } else {
//         return (
//             <h3>Unauthorized</h3>
//         )
//     }
// }

// export default Case;