const express = require('express');
const socket = require('socket.io');

const PORT = 5000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const peers = []  //list of users
const broadcastEvents ={
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS:'GROUP_CALL_ROOMS'
}

io.on('connection', (socket) => {
  socket.emit('connection', null);
  console.log('new user connected');
  console.log(socket.id);

  socket.on('register-new-user',(user)=>{
    console.log("registered a new user")
    peers.push({
      username:user.username,
      socketId:user.socketId
    })
    console.log(peers)
    io.sockets.emit('broadcast',{
      event:broadcastEvents.ACTIVE_USERS,    //since we will broadcast different types of events,hence it is necessary to specify which type
      activeUsers:peers
    })
  })
});
