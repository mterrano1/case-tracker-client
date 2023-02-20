import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Button';

const Home = () => {
    const {user, loggedIn} = useContext(UserContext);

    // If user is a Manager, display Manager Dashboard link
    if (loggedIn && user.role === 'Manager') {

        return (
            <div style={styles.container}>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/managerdashboard'} component={RouterLink}>
                    <Button variant="contained">My Dashboard</Button>
                </Link>
            </div>
        )
    // If user is a Researcher, display Cases link
    } else if (loggedIn && user.role === 'Researcher') {
        return (
            <div style={styles.container}>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/cases'} component={RouterLink}>
                    <Button variant="contained">My Cases</Button>
                </Link>
            </div>
        )
    // If user is a Customer, display File a Complaint link
    } else if (loggedIn && user.role === 'Customer') {
        return (
            <div style={styles.container}>
                <h4>Hello {user.first_name}, we appreciate your feedback!</h4>
                <Link to={'/customerdashboard'} component={RouterLink}>
                    <Button variant="contained">File a complaint</Button>
                </Link>
            </div>
        )
    // If no user is logged in, display a message asking to login or signup
    } else {
        return (
            <div style={styles.container}>
                <h1>Please login or signup</h1>
                <Link to={'/login'} component={RouterLink}>
                    <Button variant="contained">Login</Button>
                </Link>
            </div>
        )
    }
}

export default Home;

// Styles for the Home component
const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
  };