import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';

const Home = () => {
    const {user, loggedIn} = useContext(UserContext);

    if (loggedIn) {
        return (
            <div>
                <h1>{user.first_name}'s Dashboard</h1>
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