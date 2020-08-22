import React from 'react';

function Home() {
  return (
    <div className="home-menu">
      <a href="/webcam">Step 1: Click here to start Broadcast</a>
      <a href="/watchlive">Step 2: Go to another device and click here to join the live stream</a> 
    </div>
  );
}

export default Home;
