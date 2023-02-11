import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

const ManagerDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [userList, setuserList] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch('http://localhost:3000/users', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(r => r.json())
        .then(data => setuserList(data))
    }, []);

    if (!userList) {
        return (
            <h1>Loading...</h1>
        )
    } else if (loggedIn && user.role === 'Manager') {
        return (
            <div style={{ width: '50%', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Manager Dashboard</h1>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Open Cases</TableCell>
                        <TableCell align="right">Closed Cases</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userList.map((researcher) => (
                        <TableRow
                          key={researcher.id} 
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {researcher.first_name} {researcher.last_name}
                          </TableCell>                
                          <TableCell align="right">{researcher.role}</TableCell>
                          <TableCell align="right">{researcher.open_case_count}</TableCell>
                          <TableCell align="right">{researcher.closed_case_count}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
        )
    } else {
        return (
            <h3>Unauthorized</h3>
        )
    }
}

export default ManagerDashboard;