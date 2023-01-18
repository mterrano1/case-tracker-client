import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

const Home = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn && user.role === 'Manager') {

        return (
            <div>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/managerdashboard'}>
                    <button>My Dashboard</button>
                </Link>
                <Link to={'/reports'}>
                    <button>Reports</button>
                </Link>
            </div>
        )
    } else if (loggedIn && user.role === 'Researcher') {
        return (
            <div>
                <h1>Welcome back {user.first_name}!</h1>
                <Link to={'/researcherdashboard'}>
                    <button>My Dashboard</button>
                </Link>
            </div>
        )
    } else if (loggedIn && user.role === 'Customer') {
        return (
            <div>
                <h4>Hello {user.first_name}, we appreciate your feedback!</h4>
                <Link to={'/customerdashboard'}>
                    <button>File a complaint</button>
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