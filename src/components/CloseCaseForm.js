import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CloseCaseForm = ({ caseId }) => {
    // Define state variables for managing the form and getting data from the UserContext
    const [showTextField, setShowTextField] = useState(false);
    const [resolution, setResolution] = useState('');
    const { handleCaseStatusUpdate, handleCloseCase } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorsList, setErrorsList] = useState([]); 
    const token = localStorage.getItem("token");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/rails/cases/${caseId}`, {
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
                // If there are no errors, update the case status and navigate to the cases page
                handleCloseCase(data)
                handleCaseStatusUpdate(data)
                navigate('/cases')
            } else {
                // If there are errors, display them to the user
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    }


    return (
        <div>
            <Button size="small" variant="contained" onClick={() => setShowTextField(!showTextField)}>
                {showTextField ? 'Cancel' : 'Resolve Case'}
            </Button>
            <form onSubmit={handleSubmit}>
                {showTextField ? <TextField 
                                    type='text' 
                                    value={resolution}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    onChange={e => setResolution(e.target.value)} 
                                /> 
                                : null}
                {showTextField ? <Button type='submit' size="small">Resolve</Button> : null}
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
    )
}

export default CloseCaseForm;