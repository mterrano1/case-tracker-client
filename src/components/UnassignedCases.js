import React, { useContext, useState } from "react";
import { UserContext } from '../components/UserContext';
import CaseCard from '../components/CaseCard';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, Pagination, Box } from '@mui/material/';

const UnassignedCases = () => {
  const { loggedIn, userCases } = useContext(UserContext);
  const filterCases = userCases.filter(userCase => userCase.status !== 'Closed' && userCase.status !== 'Open');
  const [page, setPage] = useState(1);
  const [casesPerPage] = useState(5);

  const indexOfLastCase = page * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filterCases.slice(indexOfFirstCase, indexOfLastCase);

  const pagCount = Math.ceil(filterCases.length / 5)

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loggedIn) {
    return (
      <div>
        <Box sx={{ height: 280, position: 'relative'}}>
        <h2 style={{textAlign: "center", fontWeight: '400', fontFamily: 'Helvetica'}}>Unassigned Cases</h2>
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
        </Box>
      </div>
    );
  } else {
    return (
        <h3>Unauthorized</h3>
        );
    }
};
    
export default UnassignedCases;