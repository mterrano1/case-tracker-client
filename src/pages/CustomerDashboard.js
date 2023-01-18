import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [errorsList, setErrorsList] = useState([]);
    const [newCase, setNewCase] = useState({
        allegation_type: '',
        allegation: '',
        department: '',
        status: 'Unassigned',
        customer_id: user.id      
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/cases', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCase),
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors) {
                navigate('/')
            } else {
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    };

    const handleChange = (e) => {
        setNewCase({
            ...newCase, [e.target.name]: e.target.value
        })
    }

    if (loggedIn && user.role === 'Customer') {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    Complaint Type
                    <br/>
                    <select name='allegation_type' onChange={handleChange}>
                        <option></option>
                        <option>Customer service</option>
                        <option>Fees</option>
                        <option>Discrimination</option>
                        <option>Unauthorized account</option>
                    </select><br/><br/>
                    <label>Description</label><br/>
                    <input type='text' name='allegation' onChange={handleChange}/><br/><br/>
                    Department
                    <br/>
                    <select name='department' onChange={handleChange}>
                        <option></option>
                        <option>Local Branch</option>
                        <option>Phone Bank</option>
                        <option>Business Banking</option>
                        <option>Home Mortgage</option>
                        <option>Wealth Management</option>
                    </select><br/><br/>
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