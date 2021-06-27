import React,{ useState } from 'react';
import LiveIndicator from '../components/LiveIndicator/LiveIndicator';
import { configBroadcast,stopBroadcast } from '../config/broadcast.js';

function Broadcast() {

  const [isLive,setIsLive] = useState('READY');
  const [liveId,setLiveId] = useState('');

  function handleClick() {
    if(isLive==='READY') {
      console.log('hi');
      configBroadcast(setLiveId);
      setIsLive('LIVE');
    } else {
      stopBroadcast();
    }
  }

  return (
    <div className="broadcast-container">
      <div className="live-id position-absolute">{liveId}</div>
      <div className="position-absolute video-container">
        <LiveIndicator isLive={isLive} />
        <video className="live-video" playsInline autoPlay muted></video>
      </div>
      <button onClick={handleClick} className="position-absolute initiate-action btn btn-lg" type="button">{isLive==='READY' ? 'Go live!' : 'Stop broadcast'}</button>
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

// - Congratulations! Your certificate and chain have been saved at:
//   /etc/letsencrypt/live/webcam.reactapp.xyz/fullchain.pem
//   Your key file has been saved at:
//   /etc/letsencrypt/live/webcam.reactapp.xyz/privkey.pem
//   Your cert will expire on 2020-10-10. To obtain a new or tweaked
//   version of this certificate in the future, simply run certbot
//   again. To non-interactively renew *all* of your certificates, run
//   "certbot renew"

// sudo heroku certs:add /etc/letsencrypt/live/webcam.reactapp.xyz/fullchain.pem /etc/letsencrypt/live/webcam.reactapp.xyz/privkey.pem

// sudo certbot renew --manual
