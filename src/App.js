import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Broadcast from './Broadcast/Broadcast';
import Watch from './Watch/Watch';
import './App.css';

function App() {

const subdomain = window.location.hostname.split('.')[0];

  return (
      <div className="App">
        {subdomain === 'webcam' && <Broadcast />}
        {subdomain === 'watchlive' && <Watch />}
      </div>
  );
}

export default App;
