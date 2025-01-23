
import React from 'react';
import { Container, createRoot, Root } from 'react-dom/client';
import './styles.css';
import App from './App';
import { HashRouter as Router, Route, Switch as Routes } from 'react-router-dom';
import Topbar from './components/Topbar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';


const rootReference: Container = document.getElementById('root') as HTMLElement;
const root:Root = createRoot(rootReference);
root.render(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route index={true} element={<MainPage/>}/>
                <Route path='about' element={<AboutPage/>}/>
            </Route>
        </Routes>
    </Router>
);
