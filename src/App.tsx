import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login';
import MainPage from './Components/MainPage/MainPage';
import SignUp from './Components/SignUp/SignUp';

import styles from './App.module.css';

function App() {

  return (
    <BrowserRouter>
      <div className={ styles.container }>
        <NavBar />
        <Routes> 
          <Route path='' element = { <Navigate replace to="/login" /> } />
          <Route path='/login' element = { <Login /> } />
          <Route path='/signup' element = { <SignUp /> } />
          <Route path='/short-links' element = { <MainPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
