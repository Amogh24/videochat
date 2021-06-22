const express = require('express')
const socket = require('socket.io')

const PORT = 5000;

const app = express();
const server = app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

const io = socket(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

// io.on('connection',(socket)=>{
//     socket.emit('connection',null);
//     console.log('new user connected',socket.id);
// })
io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})