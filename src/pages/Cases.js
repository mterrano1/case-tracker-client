import React, { useContext, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';
import { Paper, List, Pagination } from '@mui/material/';

const Cases = () => {
    const { loggedIn, userCases, user } = useContext(UserContext);
    const filterCases = userCases.filter(userCase => userCase.status !== 'Closed');
    const [currentPage, setCurrentPage] = useState(1);
    const casesPerPage = 5;
    const indexOfLastCase = currentPage * casesPerPage;
    const indexOfFirstCase = indexOfLastCase - casesPerPage;
    const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (loggedIn) {
        return (
            <div>
                <h1>{user.role === 'Manager' ? 'My Cases' : 'My Open Cases'}</h1>
                <Paper elevation={2} style={{ padding: "1rem", margin: "1rem" }}>
                    <List style={{ listStyleType: "none", padding: 0 }}>
                        {currentCases.map((userCase) => (
                            <li key={userCase.id} style={{ border: "1px solid gray", margin: "1rem 0", padding: "1rem" }}>
                                <CaseCard userCase={userCase} />
                            </li>
                        ))}
                    </List>
                </Paper>
                <Pagination
                    count={Math.ceil(filterCases.length / casesPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
};

export default Cases;


// import React, { useContext, useState } from "react";
// import { UserContext } from '../components/UserContext';
// import CaseCard from '../components/CaseCard';
// import { Paper, List, Pagination } from '@mui/material/';

// const Cases = () => {
//     const { loggedIn, userCases, user } = useContext(UserContext);
//     const filterCases = userCases.filter(userCase => userCase.status !== 'Closed');
//     const [currentPage, setCurrentPage] = useState(1);
//     const casesPerPage = 5;
//     const indexOfLastCase = currentPage * casesPerPage;
//     const indexOfFirstCase = indexOfLastCase - casesPerPage;
//     const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);

//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     if (loggedIn) {
//         return (
//             <div>
//                 <h1>{user.role === 'Manager' ? 'My Cases' : 'My Open Cases'}</h1>
//                 <Paper elevation={2}>
//                     <List>
//                         {currentCases.map((userCase) => (
//                             <CaseCard key={userCase.id} userCase={userCase} />
//                         ))}
//                     </List>
//                 </Paper>
//                 <Pagination
//                     count={Math.ceil(filterCases.length / casesPerPage)}
//                     page={currentPage}
//                     onChange={handlePageChange}
//                 />
//             </div>
//         )
//     } else {
//         return (
//             <h3>Unauthorized</h3>
//         )
//     }
// };

// export default Cases;


// import React, { useContext } from "react";
// import { UserContext } from '../components/UserContext';
// import CaseCard from '../components/CaseCard';
// import { Paper, List } from '@mui/material/';

// const Cases = () => {
//     const {loggedIn, userCases, user} = useContext(UserContext);
//     const filterCases = userCases.filter(userCase => userCase.status !== 'Closed')
//     if (loggedIn) {
//         return (
//             <div>
//                 <h1>{user.role === 'Manager' ? 'My Cases' : 'My Open Cases'}</h1>
//                 <Paper>
//                     <List>
//                         {filterCases.map((filterCase) => (
//                             <CaseCard key={filterCase.id} userCase={filterCase} />
//                         ))}
//                     </List>
//                 </Paper>
//             </div>
//         )
//     } else {
//         return (
//             <h3>Unauthorized</h3>
//         )
//     }
// }
// export default Cases;



// import React, { useContext } from "react";
// import { UserContext } from '../components/UserContext';
// import CaseCard from '../components/CaseCard';


// const Cases = () => {
//     const {loggedIn, userCases, user} = useContext(UserContext);

//     const filterCases = userCases.filter(userCase => userCase.status !== 'Closed')

//     if (loggedIn) {
//         return (
//             <div>
//                 <h1>{user.role === 'Manager' ? 'My Cases' : 'My Open Cases'}</h1>
//                 <ul>
//                     {filterCases.map((filterCase) => (
//                         <CaseCard key={filterCase.id} userCase={filterCase} />
//                     ))}
//                 </ul>
//             </div>
//         )
//     } else {
//         return (
//             <h3>Unauthorized</h3>
//         )
//     }
// }

// export default Cases;