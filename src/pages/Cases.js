import React, { useContext, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, Pagination } from '@mui/material/';

const Cases = () => {
  const { loggedIn, userCases, user } = useContext(UserContext);
  const filterCases = userCases.filter(userCase => userCase.status !== 'Closed');
  const [page, setPage] = useState(1);
  const [casesPerPage] = useState(5);

  const indexOfLastCase = page * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loggedIn) {
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize: '15px', fontWeight: 'bold'}}>Allegation Type</TableCell>
                <TableCell style={{fontSize: '15px', fontWeight: 'bold'}}>Department</TableCell>
                <TableCell style={{fontSize: '15px', fontWeight: 'bold'}}>Status</TableCell>
                <TableCell style={{fontSize: '15px', fontWeight: 'bold'}}>Days Ago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCases.map((filterCase) => (
                <React.Fragment key={filterCase.id}>
                  <CaseCard userCase={filterCase} />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Pagination count={filterCases.length} page={page} onChange={handleChange} />
      </div>
    );
  } else {
    return (
        <h3>Unauthorized</h3>
        );
    }
};
    
export default Cases;





// import React, { useContext, useState } from "react";
// import { UserContext } from '../components/UserContext';
// import CaseCard from '../components/CaseCard';
// import { Paper, List, ListItem, Pagination } from '@mui/material/';

// const Cases = () => {
//   const { loggedIn, userCases, user } = useContext(UserContext);
//   const filterCases = userCases.filter(userCase => userCase.status !== 'Closed');
//   const [page, setPage] = useState(1);
//   const [casesPerPage] = useState(5);

//   const indexOfLastCase = page * casesPerPage;
//   const indexOfFirstCase = indexOfLastCase - casesPerPage;
//   const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);

//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   if (loggedIn) {
//     return (
//       <div>
//         <Paper>
//           <List>
//             {currentCases.map((filterCase, index) => (
//               <React.Fragment key={filterCase.id}>
//                 <ListItem component={CaseCard} userCase={filterCase} />
//                 {index < currentCases.length - 1 && <ListItem divider />}
//               </React.Fragment>
//             ))}
//           </List>
//         </Paper>
//         <Pagination count={filterCases.length} page={page} onChange={handleChange} />
//       </div>
//     );
//   } else {
//     return (
//       <h3>Unauthorized</h3>
//     );
//   }
// };

// export default Cases;