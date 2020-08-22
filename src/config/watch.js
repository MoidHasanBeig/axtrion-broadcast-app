import socketIOClient from "socket.io-client";
const ENDPOINT = "webbcast.herokuapp.com";

function configWatch(setIsConnected) {
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

  socket.on("offer", (id, description) => {
    peerConnection = new RTCPeerConnection(config);
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then(sdp => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit("answer", id, peerConnection.localDescription);
        console.log("25");
      });
    peerConnection.ontrack = event => {
      video.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit("candidate", id, event.candidate);
        console.log("32");
        setIsConnected('SESSION IS STARTING...');
        video.addEventListener("play", () => {
          setIsConnected('LIVE');
        });
      }
    };
  });

  socket.on("candidate", (id, candidate) => {
    peerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .catch(e => console.error(e));
  });

  socket.on("connect", () => {
    socket.emit("watcher");
    console.log("44");
    setIsConnected('AWAITING SESSION TO START');
  });

  socket.on("broadcaster", () => {
    socket.emit("watcher");
    console.log("49");
  });

  socket.on("disconnectPeer", () => {
    peerConnection.close();
  });

  window.onunload = window.onbeforeunload = () => {
    socket.close();
  };
}

function leaveRoom() {
  const socket = socketIOClient(ENDPOINT);
  socket.close();
  window.location.reload();
}

export { configWatch,leaveRoom };
