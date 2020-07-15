import React from 'react';
import Broadcast from './Broadcast/Broadcast';
import Watch from './Watch/Watch';
import './app.styles.scss';

function App() {

const subdomain = window.location.hostname.split('.')[0];
if (subdomain === 'webcam') {
  document.title = 'Axtrion Digital - Web Cammers | The Finest Digital Experiences.'
} else if (subdomain === 'watchlive') {
  document.title = 'Axtrion Digital - Watch Live Cam | The Finest Digital Experiences.'
}

  return (
      <div className="d-flex app">
        <div className="axtrion-logo-container d-flex flex-row m-3">
          <div className="axtrion-logo"/>
          <div className="axtrion-name ml-2">Axtrion</div>
        </div>
        <div className="axtrion-bg" />
        {subdomain === 'webcam' && <Broadcast />}
        {subdomain === 'watchlive' && <Watch />}
      </div>
  );
}

export default App;
