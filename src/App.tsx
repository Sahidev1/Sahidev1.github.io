import React from 'react';
import { Routes, Route, Outlet } from 'react-router';
import Topbar from './components/Topbar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return( 
    <div className='app-container'>
      <Topbar/>
      <Outlet/>
    </div>
  );
}

export default App;
