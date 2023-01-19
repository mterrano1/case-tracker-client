import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const CloseCaseForm = ({ caseId }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [resolution, setResolution] = useState('');
    const { handleCaseStatusUpdate } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorsList, setErrorsList] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/cases/${caseId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                resolution,
                status: 'Closed'
            }),
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors) {
                handleCaseStatusUpdate(data)
                navigate(`/cases/${data.id}`)
            } else {
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    }


    return (
        <div>
            <button onClick={() => setShowTextField(!showTextField)}>
                {showTextField ? 'Cancel' : 'Resolve Case'}
            </button>
            <form onSubmit={handleSubmit}>
                {showTextField ? <input 
                                    type='text' 
                                    value={resolution} 
                                    onChange={e => setResolution(e.target.value)} /> 
                                : null}
                {showTextField ? <button type='submit'>Close Case</button> : null}
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
    )
}

export default CloseCaseForm;