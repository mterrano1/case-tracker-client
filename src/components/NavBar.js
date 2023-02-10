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
        <nav className="NavBar">
            {homeLink}
            {dashboardLink}
            {casesLink}
            {reportsLink}
            <NavLink exact to='/login'>{button}</NavLink>
        </nav>
    );
}

export default NavBar;

// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import LogoutButton from './LogoutButton';
// import LoginButton from './LoginButton';
// import { createStyles, makeStyles } from '@mui/styles';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     title: {
//       flexGrow: 1,
//     },
//   })
// );

// const NavBar = () => {
//   const classes = useStyles();
//   const { user } = useContext(UserContext);
//   const token = localStorage.getItem("token");

//   const button = token ? <LogoutButton /> : <LoginButton />

//   const homeLink = token && user.role !== 'Customer' ?
//     <NavLink exact to='/'>Home</NavLink> :
//     <NavLink exact to='/CustomerDashboard'>Home</NavLink>

//   const dashboardLink = token && user.role === 'Manager' && user ?
//     <NavLink exact to='/managerdashboard'>Dashboard</NavLink> :
//     ''

//   const casesLink = token && user.role !== 'Customer' && user ?
//     <NavLink exact to='/cases'>Cases</NavLink> :
//     ''

//   const reportsLink = user.role === 'Manager' && user ?
//     <NavLink exact to='/reports'>Reports</NavLink> :
//     ''

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             {homeLink}
//             {dashboardLink}
//             {casesLink}
//             {reportsLink}
//           </Typography>
//           <NavLink exact to='/login'>{button}</NavLink>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default NavBar;



// import '../Nav.css';
// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import LogoutButton from './LogoutButton';
// import LoginButton from './LoginButton';

// const NavBar = () => {
//     const { user } = useContext(UserContext);
//     const token = localStorage.getItem("token");

//     const button = token ? <LogoutButton /> : <LoginButton />

//     const homeLink = token && user.role !== 'Customer' ?
//         <NavLink exact to='/'>Home</NavLink> :
//         <NavLink exact to='/CustomerDashboard'>Home</NavLink>

//     const dashboardLink = token && user.role === 'Manager' && user ?
//         <NavLink exact to='/managerdashboard'>Dashboard</NavLink> :
//         ''

//     const casesLink = token && user.role !== 'Customer' && user ?
//         <NavLink exact to='/cases'>Cases</NavLink> :
//         ''

//     const reportsLink = user.role === 'Manager' && user ?
//         <NavLink exact to='/reports'>Reports</NavLink> :
//         ''

//     return (
//         <nav>
//             {homeLink}
//             {dashboardLink}
//             {casesLink}
//             {reportsLink}
//             <NavLink exact to='/login'>{button}</NavLink>
//         </nav>
//     );
// }

// export default NavBar;


// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import LogoutButton from './LogoutButton';
// import LoginButton from './LoginButton';

// const NavBar = () => {
//     const { user } = useContext(UserContext);
//     const token = localStorage.getItem("token");

//     const button = token ? <LogoutButton /> : <LoginButton />

//     const homeLink = token && user.role !== 'Customer' ?
//         <NavLink exact to='/'>Home</NavLink> :
//         <NavLink exact to='/CustomerDashboard'>Home</NavLink>

//     const dashboardLink = token && user.role === 'Manager' && user ?
//         <NavLink exact to='/managerdashboard'>Dashboard</NavLink> :
//         ''

//     const casesLink = token && user.role !== 'Customer' && user ?
//         <NavLink exact to='/cases'>Cases</NavLink> :
//         ''

//     const reportsLink = user.role === 'Manager' && user ?
//         <NavLink exact to='/reports'>Reports</NavLink> :
//         ''

//     return (
//         <nav>
//             {homeLink}
//             {dashboardLink}
//             {casesLink}
//             {reportsLink}
//             <NavLink exact to='/login' style={{ textDecoration: 'none' }}>{button}</NavLink>
//         </nav>
//     );
// }

// export default NavBar;