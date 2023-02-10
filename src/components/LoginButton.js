import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Button';
import Button from '@mui/material/Button';

const LoginButton = () => {

    return (
        <Link to={'/login'} component={RouterLink}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
        </Link>
    );
}

export default LoginButton;