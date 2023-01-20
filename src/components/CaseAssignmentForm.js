import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        fetch('http://localhost:3000/users', {
          headers: {"Authorization": token}
      })
        .then(r => r.json())
        .then(data => setuserList(data))
    }, []);

  const handleChange = (e) => {
    setCaseAssignment({
        ...caseAssignment, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/case_assignments", {
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
            handleCaseStatusUpdate(data.assigned_case)
            navigate('/cases')
        } else {
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
        <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
    ))
    return (
        <form onSubmit={handleSubmit}>
            Assign to:
            <select name='assigned_employee_id' onChange={handleChange}>
                <option></option>
                {researcherNames} 
            </select><br />
            <button type="submit">Create Case Assignment</button>
            <ul style={{ color: 'red' }}>
                {errorsList}
            </ul>
        </form>
    )
  } 
};

export default CaseAssignmentForm;