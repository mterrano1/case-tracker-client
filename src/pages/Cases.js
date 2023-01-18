import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';


const Cases = () => {
    const {user, loggedIn, userCases} = useContext(UserContext);

    if (loggedIn && user.role === 'Manager') {
        return (
            <div>
                <h1>UnassignedCases Page</h1>
                <ul>
                    {userCases.map((userCase) => (
                        <CaseCard key={userCase.id} userCase={userCase} />
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default Cases;