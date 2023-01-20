import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const DeleteCaseButton = ({ caseId }) => {
    const { handleDeleteCase } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const deleteCase = () => {
        fetch(`http://localhost:3000/cases/${caseId}`, {
            method: "DELETE",
            headers: {"Authorization": token}
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