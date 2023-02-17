import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Signup = () => {
    const { signup } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorsList, setErrorsList] = useState([]);
    const token = localStorage.getItem("token");
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: '',
        username: '',
        password: '',
        password_confirmation: ''     
    });

    // Handles form submission and sends POST request to register new user
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/rails/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newUser),
        })
        .then(r => r.json())
        .then(user => {
            if (!user.errors) {
                localStorage.setItem("token", user.token);
                signup(user)
                navigate('/')
            } else {
                const errors = user.errors.map(e => <li>{e}</li>)
                setErrorsList(errors)
            }
        })
    }

    // Handles change event for form inputs
    const handleChange = (e) => {
        setNewUser({
            ...newUser, [e.target.name]: e.target.value
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="first_name"
                      required
                      fullWidth
                    //   id="first_name"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                    //   id="last_name"
                      label="Last Name"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="role">Role</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="role"
                        onChange={handleChange}
                      >
                        <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="Researcher" control={<Radio />} label="Researcher" />
                        <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                    //   id="username"
                      label="Username"
                      name="username"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                    //   id="password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password_confirmation"
                      label="Confirm Password"
                      type="password"
                    //   id="password_confirmation"
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
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle2">
                        <Link to="/login">Already have an account? Sign in</Link>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography style={{color: 'red', marginTop: "10px"}}>{errorsList}</Typography>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      );
}

export default Signup;