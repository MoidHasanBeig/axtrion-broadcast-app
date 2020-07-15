import React,{ useState } from 'react';
import LiveIndicator from '../components/LiveIndicator/LiveIndicator';
import { configWatch,leaveRoom } from '../config/watch.js';

function Watch() {

  const [isConnected,setIsConnected] = useState('READY');

  function handleClick() {
    if(!isConnected==='LIVE') {
      configWatch(setIsConnected);
    } else {
      leaveRoom();
    }
  }

    return (
      <div className="watch-container">
        <div className="position-absolute video-container">
          <LiveIndicator isLive={isConnected} />
          <video className="live-video" playsInline autoPlay></video>
        </div>
        <button onClick={handleClick} className="position-absolute initiate-action btn btn-lg" type="button">{isConnected==='READY' ? 'Watch live stream!' : 'Exit session'}</button>
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
