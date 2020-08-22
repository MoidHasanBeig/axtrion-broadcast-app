import React,{ useState } from 'react';
import LiveIndicator from '../components/LiveIndicator/LiveIndicator';
import { configWatch,leaveRoom } from '../config/watch.js';

function Watch() {

  const [isConnected,setIsConnected] = useState('READY');
  const [inputValue,setInputValue] = useState('');

  function handleClick(evt) {
    evt.preventDefault();
    if(isConnected==='READY') {
      configWatch(setIsConnected,inputValue);
      setInputValue('');
    } else {
      leaveRoom();
    }
  }

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

    return (
      <div className="watch-container">
        <div className="position-absolute video-container">
          <LiveIndicator isLive={isConnected} />
          <video className="live-video" playsInline autoPlay></video>
        </div>
        <form onSubmit={handleClick}>
          <input onChange={handleChange} value={inputValue} />
          <button className="position-absolute initiate-action btn btn-lg" type="submit">{isConnected==='READY' ? 'Watch live stream!' : 'Exit session'}</button>
        </form>
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
