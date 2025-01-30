import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Topbar, { TopBarInterface } from './components/Topbar';
import { createContext } from 'react';


export const ContentLangContext = createContext("en");

export interface AppInterface {
  removeLoader: ()=>void;
}

const App = (props: AppInterface) => {
  const [contentLang, setContentLang] = useState<string>("en");
  const navigate = useNavigate();

  const topBarProps: TopBarInterface = {
    navFn: (path: string) => navigate(path)
  }

  useEffect(()=>{
    props.removeLoader();
  },[])

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
