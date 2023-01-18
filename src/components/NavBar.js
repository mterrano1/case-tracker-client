import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const NavBar = () => {
    const { loggedIn } = useContext(UserContext);

    const button = loggedIn ? <LogoutButton /> : <LoginButton />

    return (
        <nav>
            <NavLink exact to='/'>Home</NavLink>
            {button}
        </nav>
    );
}

export default NavBar;