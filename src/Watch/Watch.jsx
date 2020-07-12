import React,{ useState } from 'react';
import { configWatch,leaveRoom } from '../config/watch.js';

function Watch() {

  const [isConnected,setIsConnected] = useState(false);

  function handleClick() {
    if(!isConnected) {
      configWatch();
      setIsConnected(true);
    } else {
      leaveRoom();
      setIsConnected(false);
    }
  }

    return (
      <div className="video-container d-flex flex-column m-auto w-75 h-100 justify-content-center">
        <video className="bg-dark rounded w-100 h-100" playsInline autoPlay muted></video>
        <button onClick={handleClick} className="my-2 btn btn-lg btn-danger w-75 m-auto" type="button">{!isConnected ? 'Watch live stream!' : 'Exit session'}</button>
      </div>
    );
}

export default Watch;
