import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import { Grid, Box } from "@mui/material";
import TopPerformers from '../components/TopPerformers';
import UnassignedCases from '../components/UnassignedCases';
import CaseTypeStats from '../components/CaseTypeStats';
import CaseDepartmentStats from '../components/CaseDepartmentStats';

const ManagerDashboard =() => {
  const {user, loggedIn} = useContext(UserContext);
  const [allCases, setAllCases] = useState({});
  const [checked, setChecked] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all cases from API
  useEffect(() => {
    fetch('/rails/cases', {
        headers: {"Authorization": token}
    })
    .then(r => r.json())
    .then(data => setAllCases(data))
  }, []);

  // Render component based on user role and login status
  if (!allCases) {
    // Display loading message while cases are being fetched
    return (
        <h1>Loading...</h1>
    )
} else if (loggedIn && user.role === 'Manager') {
    return (
      <Box sx={{ p: 4}}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item sm={5} xs={12}>
                {checked ?
                  <CaseDepartmentStats checked={checked} allCases={allCases.cases_by_department} onChange={setChecked} /> :
                  <CaseTypeStats checked={checked} allCases={allCases.cases_by_allegation_type} onChange={setChecked} />
                }
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