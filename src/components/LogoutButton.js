import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        logout()
        navigate('/login')
    }

    return (
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={logoutUser}>Logout</Button>
    );
}

export default LogoutButton;