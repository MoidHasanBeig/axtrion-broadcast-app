import socketIOClient from "socket.io-client";
const ENDPOINT = "webbcast.herokuapp.com";

function configWatch(setIsConnected,inputValue) {
  let peerConnection;
  const config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"]
      }
    ]
  };

  const socket = socketIOClient(ENDPOINT);
  const video = document.querySelector("video");

  socket.on("offer", (broadcastId, description) => {
    if (broadcastId === inputValue) {
      peerConnection = new RTCPeerConnection(config);
      peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then(sdp => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit("answer", broadcastId, socket.id, peerConnection.localDescription);
      });
      peerConnection.ontrack = event => {
        video.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit("candidate", broadcastId, socket.id, event.candidate);
          setIsConnected('SESSION IS STARTING...');
          video.addEventListener("play", () => {
            setIsConnected('LIVE');
          });
        }
      };
    }
  });

  socket.on("candidate", (broadcastId, candidate) => {
    if(broadcastId === inputValue) {
      peerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .catch(e => console.error(e));
    }
  });

  socket.on("connect", () => {
    socket.emit("watcher", inputValue, socket.id);
    setIsConnected('AWAITING SESSION TO START');
  });

  socket.on("broadcaster", (broadcastId) => {
    if (broadcastId === inputValue) {
      socket.emit("watcher",broadcastId ,socket.id);
    }
  });

  socket.on("disconnectPeer", () => {
    peerConnection.close();
  });

  window.onunload = window.onbeforeunload = () => {
    socket.close();
  };
}

function leaveRoom() {
  window.location.reload();
}

export { configWatch,leaveRoom };
