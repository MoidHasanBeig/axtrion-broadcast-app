import React,{ useEffect } from 'react';
import configBroadcast from '../config/broadcast.js';

function Broadcast() {

  useEffect( () => {
    configBroadcast();
  });

  return (
    <div className="video-container">
      <video playsInline autoPlay muted></video>
    </div>
  );
}

export default Broadcast;
