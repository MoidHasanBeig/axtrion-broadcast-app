const express = require('express');
const subdomain = require('express-subdomain');
const path = require('path');
const http = require('http');

const app = express();

const router1 = express.Router();
const router2 = express.Router();

const port = 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(__dirname + "/public"));

io.sockets.on("error", e => console.log(e));

router1.get('/webcam', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.send('OK');
});
router2.get('/watchlive', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.send('OK');
});

app.use(subdomain('webcam', router1));
app.use(subdomain('watchlive', router2));

server.listen(port, () => {
  console.log(`Server live at port ${port}`);
});

let broadcaster;

io.sockets.on("connection", socket => {

  //connection for clients and broadcaster

  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
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
