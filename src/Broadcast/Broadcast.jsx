import React,{ useState } from 'react';
import { configBroadcast,stopBroadcast } from '../config/broadcast.js';

function Broadcast() {

  const [isLive,setIsLive] = useState(false);

  function handleClick() {
    if(!isLive) {
      configBroadcast();
      setIsLive(true);
    } else {
      stopBroadcast();
      setIsLive(false);
    }
  }

  return (
    <div className="video-container d-flex flex-column m-auto w-75 h-100 justify-content-center">
      <video className="bg-dark rounded w-100 h-100" playsInline autoPlay muted></video>
      <button onClick={handleClick} className="my-2 btn btn-lg btn-danger m-auto w-75" type="button">{!isLive ? 'Go live!' : 'Stop broadcast'}</button>
    </div>
  );
}

export default Broadcast;

// Create a file containing just this data:
//
// sQn6v_xwva_CNx7Ays8ln4od8_Wde89TcIgj368Ku58.6LnSj1DB3IToahfDETa46fJeMhhLwlpY5nxRDOQJzDs
//
// And make it available on your web server at this URL:
//
// http://webcam.reactapp.xyz/.well-known/acme-challenge/sQn6v_xwva_CNx7Ays8ln4od8_Wde89TcIgj368Ku58
