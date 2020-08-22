import React from 'react';

function Home() {
  return (
    <div className="home-menu">
      <h1>This is only a PoC so please spare the poor UX!</h1>
      <a href="/webcam"><span>Step 1:</span> Click here to start Broadcast</a>
      <a href="/watchlive"><span>Step 2:</span> Go to another device and click here to join the live stream</a>
    </div>
  );
}

export default Home;
