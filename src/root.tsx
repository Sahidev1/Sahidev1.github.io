
import React from 'react';
import { Container, createRoot, Root } from 'react-dom/client';
import './styles.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router';
import Topbar from './components/Topbar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';


console.log(INJECTED);
console.log(`basename: ${(INJECTED as any).basename || "undefined"}`)

const rootReference: Container = document.getElementById('root') as HTMLElement;
const root:Root = createRoot(rootReference);
root.render(
    <BrowserRouter basename={(INJECTED as any).basename || '/'}>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route index={true} element={<MainPage/>}/>
                <Route path='about' element={<AboutPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);


