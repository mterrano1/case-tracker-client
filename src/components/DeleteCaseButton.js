import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const DeleteCaseButton = ({ caseId }) => {
    const { handleDeleteCase } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteCase = () => {
        fetch(`http://localhost:3000/cases/${caseId}`, {
            method: "DELETE",
        })
        .then(() => {
            handleDeleteCase(caseId)
            navigate('/Cases')
        })

    }

    return (
        <button onClick={deleteCase}>Delete Case</button>
    );
}

export default DeleteCaseButton;