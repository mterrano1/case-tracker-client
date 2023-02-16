import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const CaseAssignmentForm = ({ caseId }) => {
  const [userList, setuserList] = useState([]);
  const [errorsList, setErrorsList] = useState([]);
  const navigate = useNavigate();
  const { handleCaseStatusUpdate } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [caseAssignment, setCaseAssignment] = useState({
    assigned_case_id: caseId,
    assigned_employee_id: "",
  });

    // Fetch list of users from the backend API when the component mounts
    useEffect(() => {
        fetch('http://rails-service:3000/users', {
          headers: {"Authorization": token}
      })
        .then(r => r.json())
        .then(data => setuserList(data))
    }, [token]);

  // Update the caseAssignment state variable when the user selects a new user
  const handleChange = (e) => {
    setCaseAssignment({
        ...caseAssignment, [e.target.name]: e.target.value,
    });
  };

  // Submit the form to create a new case assignment
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://rails-service:3000/case_assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(caseAssignment),
    })
      .then(r => r.json())
      .then(data => {
        if (!data.errors) {
          // Update the user's case status and navigate to the manager dashboard
          handleCaseStatusUpdate(data.assigned_case_id)
          navigate('/managerdashboard')
        } else {
            // Set the errorsList state variable with a list of error messages
            const errors = data.errors.map(e => <li>{e}</li>)
            setErrorsList(errors)
        }
    })
  };

  if (!userList) {
    return (
        <h1>Loading...</h1>
    )
  } else {
    const researcherNames = userList.map(user => (
      <MenuItem key={user.id} value={user.id}>{user.first_name} {user.last_name}</MenuItem>
  ))
    return (
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }} size="small">
          <InputLabel id="Assign to">Assign to</InputLabel>
          <Select
            name='assigned_employee_id'
            value={caseAssignment.assigned_employee_id}
            onChange={handleChange}
            label="Assign to"
            size="small"
          >
            {researcherNames}
          </Select>
          {caseAssignment.assigned_employee_id && 
            <Button size="small" type="submit">Assign</Button>
          }
             <ul style={{ color: 'red' }}>
                 {errorsList}
             </ul>
        </FormControl>
      </form>
    )
  }
}

export default CaseAssignmentForm;