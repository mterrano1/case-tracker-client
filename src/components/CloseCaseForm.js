import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const CloseCaseForm = ({ caseId }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [resolution, setResolution] = useState('');
    const { handleCaseStatusUpdate, handleCloseCase } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorsList, setErrorsList] = useState([]); 
    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/cases/${caseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                resolution,
                status: 'Closed'
            }),
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors) {
                handleCloseCase(data)
                handleCaseStatusUpdate(data)
                navigate('/cases')
            } else {
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    }


    return (
        <div>
            <Button size="small" onClick={() => setShowTextField(!showTextField)}>
                {showTextField ? 'Cancel' : 'Resolve Case'}
            </Button>
            <form onSubmit={handleSubmit}>
                {showTextField ? <input 
                                    type='text' 
                                    value={resolution} 
                                    onChange={e => setResolution(e.target.value)} /> 
                                : null}
                {showTextField ? <Button type='submit' size="small">Close Case</Button> : null}
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
    )
}

export default CloseCaseForm;