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

let peers = []  //list of users
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
      event:broadcastEvents.ACTIVE_USERS,    //since I will broadcast different types of events,hence it is necessary to specify which type
      activeUsers:peers // sending list of active users to all users
    })
  })
  socket.on('disconnect',()=>{
    console.log('user disconnected');
    peers = peers.filter(peer =>peer.socketId!==socket.id) //removing disconnected user from peers
    io.sockets.emit('broadcast',{        //emitting new list of peers to clients
      event:broadcastEvents.ACTIVE_USERS,
      activeUsers:peers // sending list of active users to all users
    })
  });

  //listeners for direct calls
  socket.on('preoffer',(data)=>{          //this function relays info from one user to the other
    console.log("pre-offer handled")
    io.to(data.callee.socketId).emit('preoffer',{
      callerUsername:data.caller.username,
      callerSocketId:socket.id
    })
  })
  socket.on('preofferanswer',(data)=>{
    console.log("handling the preoffer answer");
    io.to(data.callerSocketId).emit('preofferanswer',{
      answer:data.answer
    })
  })
  socket.on('webRTC-offer',(data)=>{
    console.log("sending offer to remote peer");//relaying offer to remote peer 
    io.to(data.calleeSocketId).emit('webRTC-offer',{
     offer:data.offer
    })
  })
  socket.on('webRTC-answer',(data)=>{
    console.log("sending answer to peer"); 
    io.to(data.callerSocketId).emit('webRTC-answer',{     //relaying answer to caller
      answer:data.answer
    })
  })
  socket.on('webRTC-candidate',(data)=>{
    console.log("sending ice candidates to peer");
    io.to(data.userId).emit('webRTC-candidate',{         //relaying ice candidates to peer
      candidate:data.candidate
    })
  })
  socket.on('user-hanged-up',(data)=>{
    console.log("informing peer that other user has hanged up");
    io.to(data.userId).emit('user-hanged-up')
  })
});



