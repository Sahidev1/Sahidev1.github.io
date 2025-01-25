import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router';
import Topbar, { TopBarInterface } from './components/Topbar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  const navigate = useNavigate();

  const topBarProps: TopBarInterface = {
    navFn:(path:string) => navigate(path)
  }

  return( 
    <div className='app-container'>
      <Topbar {...topBarProps}/>
      <Outlet/>
    </div>
  );
}

export default App;
