import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Topbar, { TopBarInterface } from './components/Topbar';
import { createContext } from 'react';


export const ContentLangContext = createContext("en");


const App = () => {
  const [contentLang, setContentLang] = useState<string>("en");
  const navigate = useNavigate();

  const topBarProps: TopBarInterface = {
    navFn: (path: string) => navigate(path)
  }

  return (
    <ContentLangContext.Provider value={contentLang}>
      <div className='app-container'>
        <Topbar {...topBarProps} />
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </ContentLangContext.Provider>
  );
}

export default App;
