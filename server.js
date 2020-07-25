const express = require('express');
const fs = require('fs');
const subdomain = require('express-subdomain');
const path = require('path');
// const https = require('https');
const http = require('http');

const app = express();

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/webcam.reactapp.xyz/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/webcam.reactapp.xyz/fullchain.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/webcam.reactapp.xyz/fullchain.pem', 'utf8');
//
// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };

// const router1 = express.Router();
// const router2 = express.Router();
const router = express.Router();

const port = process.env.PORT || 8080;
// const server = https.createServer(credentials,app);
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'build')));

io.sockets.on("error", e => console.log(e));

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// router1.get('/webcam', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   res.send('OK');
// });
// router2.get('/watchlive', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   res.send('OK');
// });
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/webcam', router);
app.use('/watchlive', router);

server.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});

let broadcaster=[];

io.sockets.on("connection", socket => {
  console.log(socket.id);
  //connection for clients and broadcaster

  socket.on("broadcaster", () => {
    broadcaster.push(socket.id);
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster[broadcaster.length-1]).emit("watcher", socket.id);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster[broadcaster.length-1]).emit("disconnectPeer", socket.id);
  });

  //socket events

  socket.on("offer", (id, message) => {
      socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
});
