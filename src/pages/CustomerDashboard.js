import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [allegationType, setAllegationType] = useState('');
    const [allegation, setAllegation] = useState('');
    const [department, setDepartment] = useState('');
    const [errorsList, setErrorsList] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/cases', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                allegation_type: allegationType,
                allegation,
                department,
                status: 'Unassigned',
                customer_id: user.id
            }),
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors) {
                navigate('/')
            } else {
                setAllegationType('')
                setAllegation('')
                setDepartment('')
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    };

    if (loggedIn && user.role === 'Customer') {
        return (
            <div>
            <form onSubmit={handleSubmit}>
                <label>Complaint Type:</label>
                <input 
                    type='text' 
                    id='allegation_type' 
                    value={allegationType} 
                    onChange={e => setAllegationType(e.target.value)}
                /> <br/> <br/>
                <label>Description:</label>
                <input
                    type='text'
                    id='allegation'
                    value={allegation}
                    onChange={e => setAllegation(e.target.value)}
                /> <br/> <br/>
                <label>Department:</label>
                <input
                    type='text'
                    id='department'
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                /> <br/> <br/>
                <button type='submit'>Submit Complaint</button>
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default CustomerDashboard;