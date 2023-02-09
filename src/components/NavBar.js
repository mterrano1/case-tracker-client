import '../Nav.css';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const NavBar = () => {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const button = token ? <LogoutButton /> : <LoginButton />

    const homeLink = token && user.role !== 'Customer' ?
        <NavLink exact to='/'>Home</NavLink> :
        <NavLink exact to='/CustomerDashboard'>Home</NavLink>

    const dashboardLink = token && user.role === 'Manager' && user ?
        <NavLink exact to='/managerdashboard'>Dashboard</NavLink> :
        ''

    const casesLink = token && user.role !== 'Customer' && user ?
        <NavLink exact to='/cases'>Cases</NavLink> :
        ''

    const reportsLink = user.role === 'Manager' && user ?
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