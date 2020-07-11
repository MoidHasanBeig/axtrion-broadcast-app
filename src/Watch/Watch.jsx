import React,{ useEffect } from 'react';
import configWatch from '../config/watch.js';

function Watch() {

    useEffect( () => {
      configWatch();
    });

    return (
      <div className="video-container">
        <button type="button">Play</button>
        <video playsInline autoPlay muted></video>
      </div>
    );
}

export default Watch;
