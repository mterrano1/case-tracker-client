import '../App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NavBar from './NavBar';


function App() {
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;