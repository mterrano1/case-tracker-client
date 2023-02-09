import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        logout()
        navigate('/login')
    }

    return (
        <button onClick={logoutUser} >Logout</button>
    );
}

export default LogoutButton;