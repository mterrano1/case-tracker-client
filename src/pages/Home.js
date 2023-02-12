import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Button';

const Home = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn && user.role === 'Manager') {

        return (
            <div style={styles.container}>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/managerdashboard'} component={RouterLink}>
                    <Button variant="contained">My Dashboard</Button>
                </Link>
                <Link to={'/reports'} component={RouterLink}>
                    <Button variant="contained">Reports</Button>
                </Link>
            </div>
        )
    } else if (loggedIn && user.role === 'Researcher') {
        return (
            <div style={styles.container}>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/cases'} component={RouterLink}>
                    <Button variant="contained">My Cases</Button>
                </Link>
            </div>
        )
    } else if (loggedIn && user.role === 'Customer') {
        return (
            <div style={styles.container}>
                <h4>Hello {user.first_name}, we appreciate your feedback!</h4>
                <Link to={'/customerdashboard'} component={RouterLink}>
                    <Button variant="contained">File a complaint</Button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Please login or signup</h1>
            </div>
        )
    }
}

export default Home;

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
  };