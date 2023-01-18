import '../App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NavBar from './NavBar';
import ManagerDashboard from '../pages/ManagerDashboard';
import ResearcherDashboard from '../pages/ResearcherDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';


function App() {

  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/ManagerDashboard' element={<ManagerDashboard />} />
        <Route exact path='/ResearcherDashboard' element={<ResearcherDashboard />} />
        <Route exact path='/CustomerDashboard' element={<CustomerDashboard />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;