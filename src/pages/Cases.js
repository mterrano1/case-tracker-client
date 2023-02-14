import React, { useContext, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, Pagination } from '@mui/material/';

const Cases = () => {
  const { loggedIn, userCases } = useContext(UserContext);

  // Filter out closed and unassigned cases so we're left with 'Open' cases only
  const filterCases = userCases.filter(userCase => userCase.status !== 'Closed' && userCase.status !== 'Unassigned');

  // Configure pagination
  const [page, setPage] = useState(1);
  const [casesPerPage] = useState(5);
  const indexOfLastCase = page * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);
  const pagCount = Math.ceil(filterCases.length / 5)

  // Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 80 }}>
        <div div style={{ width: '50%', margin: '0 auto' }}>
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
        <Pagination count={pagCount} page={page} onChange={handleChange} />
        </div>
      </div>
    );
  } else {
    return (
        <h3>Unauthorized</h3>
        );
    }
};
    
export default Cases;