const express = require('express');
const socket = require('socket.io'); //socket.io : signalling server for 1-1 call 
const {ExpressPeerServer} = require('peer')//peerjs: signalling server for group call
const groupCallHandler = require('./groupCallHandler')
const {v4:uuidv4} = require('uuid')

const PORT = 5000;

const app = express();



const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const peerServer = ExpressPeerServer(server,{
  debug:true
})


app.use('/peerjs',peerServer)

groupCallHandler.createPeerServerListeners(peerServer);

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let peers = []  //list of users
let groupCallRooms = []  //list of group call rooms 

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
      event:broadcastEvents.ACTIVE_USERS,    //since different types of events will be broadcasted,hence it is necessary to specify which type
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
  //listeners for group calls
socket.on('register group call',(data)=>{
  roomId = uuidv4();
  socket.join(roomId)
  console.log("registering group call");
  const groupCallRoom = {
    hostName:data.username,
    peerId:data.peerId,
    socketId:socket.id,
    roomId:roomId
  }
  groupCallRooms.push(groupCallRoom)
  console.log(groupCallRooms)

  io.sockets.emit('broadcast',{
    event:broadcastEvents.GROUP_CALL_ROOMS,
    groupCallRooms
  })
})

socket.on('user-wants-to-join-group-call',(data) =>{
  io.to(data.roomId).emit('user-wants-to-join-group-call',{  //sending event regarding new user to all users present in the rooom
    peerId:data.peerId,
    streamId:data.localStreamId
  })
  socket.join(data.roomId)
});

socket.on('user is leaving group call',(data)=>{
  socket.leave(data.roomId)//leave the call room
  io.to(data.roomId).emit('user is leaving group call',{   //send info to other users in the room that user has left the call 
    streamId:data.streamId
  })
})
})


