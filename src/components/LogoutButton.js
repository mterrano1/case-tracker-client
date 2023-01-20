import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const logoutUser = () => {
        fetch('http://localhost:3000/logout', {
            headers: {"Authorization": token}
        })
        .then(r => r.json())
        .then(() => {
            localStorage.removeItem("token");
            logout()
            navigate('/login')
        })
    }

    return (
        <button onClick={logoutUser} >Logout</button>
    );
}

export default LogoutButton;