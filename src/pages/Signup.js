import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { signup } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                role,
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
        .then(r => r.json())
        .then(user => {
            if (!user.errors) {
                signup(user)
                navigate('/')
            } else {
                setFirstname('')
                setLastname('')
                setRole('')
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Firstname:</label>
                <input
                    type='text'
                    id='first_name'
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                /> <br/> <br/>
                <label>Lastname:</label>
                <input
                    type='text'
                    id='last_name'
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                /> <br/> <br/>
                <label>Role:</label>
                <input
                    type='text'
                    id='role'
                    value={role}
                    onChange={e => setRole(e.target.value)}
                /> <br/> <br/>
                <label>Username:</label>
                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /> <br/> <br/>
                <label>Password:</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> <br/> <br/>
                <label>Confirm Password:</label>
                <input
                    type='password'
                    id='password_confirmation'
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                /> <br/> <br/>
                <button type='submit'>Submit</button>
                <br/>
            </form>
        </div>
    )
}

export default Signup;