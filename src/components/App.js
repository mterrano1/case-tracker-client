import '../App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NavBar from './NavBar';
import ManagerDashboard from '../pages/ManagerDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';
import Cases from '../pages/Cases';
import Case from '../pages/Case';
import Reports from '../pages/Reports';


function App() {

  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/managerdashboard' element={<ManagerDashboard />} />
        <Route exact path='/customerdashboard' element={<CustomerDashboard />} />
        <Route exact path='/cases' element={<Cases />} />
        <Route exact path='/reports' element={<Reports />} />
        <Route exact path='/cases/:id' element={<Case />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;