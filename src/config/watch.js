import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";

function configWatch() {
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
        console.log("answer");
      });
    peerConnection.ontrack = event => {
      video.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit("candidate", id, event.candidate);
        console.log("candidate");
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
  });

  socket.on("broadcaster", () => {
    socket.emit("watcher");
  });

  socket.on("disconnectPeer", () => {
    peerConnection.close();
  });

  document.querySelector("button").addEventListener("click", () => {
    video.play();
    console.log("play");
  });

  window.onunload = window.onbeforeunload = () => {
    socket.close();
  };
}

export default configWatch;
