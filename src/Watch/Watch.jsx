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


// Create a file containing just this data:
//
// vSeMDesNIdSmIMnUNCLvu40PrUFXJlgoCgOzGnTQU7o.6LnSj1DB3IToahfDETa46fJeMhhLwlpY5nxRDOQJzDs
//
// And make it available on your web server at this URL:
//
// http://watchlive.reactapp.xyz/.well-known/acme-challenge/vSeMDesNIdSmIMnUNCLvu40PrUFXJlgoCgOzGnTQU7o
