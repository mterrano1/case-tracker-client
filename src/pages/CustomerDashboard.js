import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Display copyright information
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Case-Tracker{' '} 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const CustomerDashboard = () => {
    const {user, loggedIn} = useContext(UserContext);
    const [errorsList, setErrorsList] = useState([]);
    const token = localStorage.getItem("token");
    const [newCase, setNewCase] = useState({
        allegation_type: '',
        allegation: '',
        department: '',
        status: 'Unassigned',
        customer_id: user.id      
    });
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/rails/cases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newCase),
        })
        .then(r => r.json())
        .then(data => {
            // If there are no errors, navigate back to the home page
            if (!data.errors) {
                navigate('/')
            } else {
                // Otherwise, display the error messages
                const errorsLis = data.errors.map(e => <li key={e.id}>{e}</li>)
                setErrorsList(errorsLis)
            }
        })
    };

    // Handle changes to the form inputs
    const handleChange = (e) => {
        setNewCase({
            ...newCase, [e.target.name]: e.target.value
        })
    }

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                File a Complaint
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="allegation_type">Type of Complaint</InputLabel>
                      <Select
                        name="allegation_type"
                        label="Type of Complaint"
                        value={newCase.allegation_type}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Customer Service">Customer Service</MenuItem>
                        <MenuItem value="Fees">Fees</MenuItem>
                        <MenuItem value="Discrimination">Discrimination</MenuItem>
                        <MenuItem value="Unauthorized Account">Unauthorized Account</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="department">Department</InputLabel>
                      <Select
                        name="department"
                        label="Department"
                        value={newCase.department}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Local Branch">Local Branch</MenuItem>
                        <MenuItem value="Phone Bank">Phone Bank</MenuItem>
                        <MenuItem value="Business Banking">Business Banking</MenuItem>
                        <MenuItem value="Home Mortgage">Home Mortgage</MenuItem>
                        <MenuItem value="Wealth Management">Wealth Management</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      required
                      fullWidth
                      name="allegation"
                      label="Description"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                <Grid container>
                </Grid>
                <Typography style={{color: 'red', marginTop: "10px"}}>{errorsList}</Typography>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      );
}

export default CustomerDashboard;