import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutUser = () => {
        fetch('http://localhost:3000/logout', {
            method: "DELETE",
        })
        .then(() => {
            logout()
            navigate('/Login')
        })

    }

    return (
        <button onClick={logoutUser} >Logout</button>
    );
}

export default LogoutButton;