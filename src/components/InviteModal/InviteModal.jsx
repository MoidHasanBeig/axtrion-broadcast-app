import React,{ useRef,useState } from "react";
import './invitemodal.styles.scss';

function InviteModal(props) {
  const inputEl = useRef(null);
  const [isCopied,setIsCopied] = useState(false);

  const handleClick = function() {
    inputEl.current.select();
    inputEl.current.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setIsCopied(true);
  }

  return (
    <div className={`${!props.isVisible && "d-none"} invite-modal`}>
      <div onClick={() => {props.setIsVisible(false);setIsCopied(false);}} className="close-btn btn">&times;</div>
      Share this session ID with your audience.
      <div className="copy-container mt-2 d-flex">
        <input ref={inputEl} value={props.liveId} className="w-75" type="text" />
        <button onClick={handleClick} className="btn btn-secondary">Copy</button>
      </div>
      <small className={!isCopied && "d-none"}>Copied to clipboard</small>
    </div>
  );
}

export default InviteModal;
