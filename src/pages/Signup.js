import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { signup } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorsList, setErrorsList] = useState([]);
    const token = localStorage.getItem("token");
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: '',
        username: '',
        password: '',
        password_confirmation: ''     
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newUser),
        })
        .then(r => r.json())
        .then(user => {
            if (!user.errors) {
                signup(user)
                navigate('/')
            } else {
                const errors = user.errors.map(e => <li>{e}</li>)
                setErrorsList(errors)
            }
        })
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser, [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Firstname</label><br/>
                <input type='text' name='first_name' onChange={handleChange}/>
                <br/><br/>
                <label>Lastname</label><br/>
                <input type='text' name='last_name' onChange={handleChange}/>
                <br/><br/>
                Role
                <br/>
                <select name='role' onChange={handleChange}>
                    <option></option>
                    <option>Customer</option>
                    <option>Researcher</option>
                    <option>Manager</option>
                </select>
                <br/><br/>
                <label>Username</label><br/>
                <input type='text' name='username' onChange={handleChange}/>
                <br/><br/>
                <label>Password</label><br/>
                <input type='password' name='password' onChange={handleChange}/>
                <br/><br/>
                <label>Confirm Password</label><br/>
                <input type='password' name='password_confirmation' onChange={handleChange}/>
                <br/><br/>
                <button type='submit'>Submit</button>
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
    )
}

export default Signup;