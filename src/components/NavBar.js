import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const NavBar = () => {
    const { user, loggedIn } = useContext(UserContext);

    const button = loggedIn ? <LogoutButton /> : <LoginButton />

    return (
        <nav>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink exact to={loggedIn ? `/${user.role}Dashboard` : '/Login'}>Dashboard</NavLink>
            <NavLink exact to='/Login'>{button}</NavLink>
            {/* {button} */}
        </nav>
    );
}

export default NavBar;