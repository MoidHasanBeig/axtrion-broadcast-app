import React from 'react';
import Broadcast from './Broadcast/Broadcast';
import Watch from './Watch/Watch';
import './app.styles.scss';

function App() {

const subdomain = window.location.hostname.split('.')[0];

  return (
      <div className="h-100 d-flex app">
        <div className="axtrion-logo-container d-flex flex-row m-3">
          <div className="axtrion-logo"/>
          <div className="axtrion-name ml-2">Axtrion</div>
        </div>
        {subdomain === 'webcam' && <Broadcast />}
        {subdomain === 'watchlive' && <Watch />}
      </div>
  );
}

export default App;
