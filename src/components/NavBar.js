import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from '@mui/material/Button';

function NavBar() {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const loginLogoutButton = token ? <LogoutButton /> : <LoginButton />

    const homeLink = token && user.role !== 'Customer' ?
        <Link to={'/'} component={NavLink}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
        </Link> :
        ''

    const dashboardLink = token && user.role === 'Manager' && user ?
        <Link exact="true" to='/managerdashboard' component={NavLink}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button>
        </Link> :
        ''

    const casesLink = token && user.role === 'Manager' && user ?
        <Link exact="true" to='/cases' component={NavLink}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Cases</Button>
        </Link> :
        ''

    const reportsLink = token && user.role === 'Manager' && user ?
        <Link exact="true" to='/reports' component={NavLink}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Reports</Button>
        </Link> :
        ''

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-start" }}>
            {homeLink}
            {dashboardLink}
            {casesLink}
            {reportsLink}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
            {loginLogoutButton}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;