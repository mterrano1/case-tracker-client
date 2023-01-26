import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const NavBar = () => {
    const { user, loggedIn } = useContext(UserContext);

    const button = loggedIn ? <LogoutButton /> : <LoginButton />

    const homeLink = user.role !== 'Customer' ?
        <NavLink exact to='/'>Home</NavLink> :
        <NavLink exact to='/CustomerDashboard'>Home</NavLink>

    const dashboardLink = user.role !== 'Customer' && loggedIn ?
        <NavLink exact to={loggedIn ? `/${user.role}dashboard` : '/Login'}>Dashboard</NavLink> :
        ''

    const casesLink = user.role !== 'Customer' && loggedIn ? 
        <NavLink exact to='/cases'>Cases</NavLink> :
        ''

    const reportsLink = user.role === 'Manager' && loggedIn ?
        <NavLink exact to='/reports'>Reports</NavLink> :
        ''

    return (
        <nav>
            {homeLink}
            {dashboardLink}
            {casesLink}
            {reportsLink}
            <NavLink exact to='/login'>{button}</NavLink>
        </nav>
    );
}

export default NavBar;