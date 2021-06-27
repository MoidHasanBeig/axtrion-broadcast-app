import React from 'react';
import Broadcast from './Broadcast/Broadcast';
import Watch from './Watch/Watch';
import Home from './Home/Home';
import './app.styles.scss';

function App() {

// const subdomain = window.location.hostname.split('.')[0];
// if (subdomain === 'webcam') {
//   document.title = 'webbcast Digital - Web Cammers | The Finest Digital Experiences.'
// } else if (subdomain === 'watchlive') {
//   document.title = 'webbcast Digital - Watch Live Cam | The Finest Digital Experiences.'
// }

const path = window.location.pathname;

  return (
      <div className="d-flex app">
        <a href="/" className="webbcast-logo-container d-flex flex-row m-3">
          <div className="webbcast-logo"/>
          <div className="webbcast-name ml-2">Webbcast</div>
        </a>
        <div className="webbcast-bg" />
        {path === '/' && <Home />}
        {path === '/webcam' && <Broadcast />}
        {path === '/watchlive' && <Watch />}
      </div>
  );
}

export default App;
