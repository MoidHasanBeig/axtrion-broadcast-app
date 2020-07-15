import React from 'react';
import './liveindicator.styles.scss';

function LiveIndicator(props) {
  return (
    <div className="live-indicator-container d-flex flex-row position-absolute ml-3 mt-2">
      {props.isLive && <div className="blinker m-auto" />}
      <div className="indicator-text ml-1">{props.isLive ? 'LIVE' : 'READY'}</div>
    </div>
  );
}

export default LiveIndicator;
