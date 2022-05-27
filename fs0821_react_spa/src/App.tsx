import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import './App.css';
import { GridContext } from './providers/grid';

function App() {
  
  const { pathname }  = useLocation()
  const { state: { generating },  generate = () => {}} = React.useContext(GridContext);


  useEffect(() => {
    const timer = setInterval(() => {
        if(generating) {
          generate()
        }        
      }, 2000);        
    return function cleanup() {
        clearInterval(timer)
    }
  },)
  
  return (
    <header className="container mx-auto py-8">
      <nav className="text-sm uppercase">
          <ul className="flex flex-row">
            <li className={['/', '/grid'].includes(pathname) ? 'font-bold': ''} ><Link to="/grid">Grid</Link></li>
            <li className="px-1">|</li>
            <li className={['/payments'].includes(pathname) ? 'font-bold': ''} ><Link to="/payments">Payments</Link></li>
          </ul>
      </nav>    
      <Outlet />
    </header>
  );
}

export default App;


