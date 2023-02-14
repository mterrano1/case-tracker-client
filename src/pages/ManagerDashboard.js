import React, { useContext } from "react";
import { UserContext } from '../components/UserContext';
import { Grid, Box } from "@mui/material";
import TopPerformers from '../components/TopPerformers';
import UnassignedCases from '../components/UnassignedCases';
import Reports from './Reports';

const ManagerDashboard =() => {
  const {user, loggedIn} = useContext(UserContext);

  if (loggedIn && user.role === 'Manager') {
    return (
      <Box sx={{ p: 4}}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item sm={5} xs={12}>
                <Reports />
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={5}>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                        <TopPerformers />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                        <UnassignedCases />
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    <div>
      <h1>Please login or signup</h1>
    </div>
  }
}

export default ManagerDashboard;