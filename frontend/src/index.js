import React from 'react';
import './index.css'

import ReactDOM from 'react-dom';
import App from './App'; // Your main application component
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <div>
    <BrowserRouter>
        <App />  
    </BrowserRouter>
    
    
  </div>,
  document.getElementById('root')
);
