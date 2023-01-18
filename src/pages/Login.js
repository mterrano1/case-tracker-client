import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}), 
        })
        .then(r => r.json())
        .then(user => {
            if (!user.error){
                login(user)
                navigate('/')
            } else {
                setUsername('')
                setPassword('')
                setErrors(user.error)
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Login</button>
                <p style={{ color: 'red' }}>{errors}</p>
            </form>
        </div>
    )
}

export default Login;