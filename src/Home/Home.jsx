import React from 'react';

function Home() {
  return (
    <div className="home-menu">
      <h1>Welcome to Webbcast. Live stream yourself in seconds! No signup required.</h1>
      <div className="btn-container">
        <a className="home-btn" href="/webcam"><div className="broadcast-icon"></div>BROADCAST<br/>YOURSELF</a>
        <a className="home-btn" href="/watchlive"><div className="watch-icon"></div>JOIN LIVE<br/>STREAM</a>
      </div>
    </div>
  );
}

export default Home;
