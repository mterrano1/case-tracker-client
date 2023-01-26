import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';


const Cases = () => {
    const {loggedIn, userCases, user} = useContext(UserContext);

    const filterCases = userCases.filter(userCase => userCase.status !== 'Closed')

    if (loggedIn) {
        return (
            <div>
                <h1>{user.role === 'Manager' ? 'My Cases' : 'My Open Cases'}</h1>
                <ul>
                    {filterCases.map((filterCase) => (
                        <CaseCard key={filterCase.id} userCase={filterCase} />
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