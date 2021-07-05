import socketClient from 'socket.io-client'
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions'
import * as webRTChandler from '../Webrtc/WebrtcHandler'
const SERVER = 'http://localhost:5000'

let socket;

const broadcastEvents ={
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS:'GROUP_CALL_ROOMS'
}

export const connectWithWebSocket = () =>{
    socket = socketClient(SERVER)

    socket.on('connection',()=>{
        console.log('successfully connected with socket',socket.id)
    })
    socket.on('broadcast',(data)=>{  //listener for events that are broadcasted from the server
        handleBroadCastEvents(data)
    })
    //listeners for direct calls
    socket.on('preoffer',(data)=>{
        webRTChandler.handlePreOffer(data)
    })
    socket.on('preofferanswer',(data)=>{
        webRTChandler.handlePreOfferAnswer(data)
    })
    socket.on('webRTC-offer',(data)=>{
        webRTChandler.handleOffer(data);
    })
    socket.on('webRTC-answer',(data)=>{
        webRTChandler.handleAnswer(data)
    })
    socket.on('webRTC-candidate',(data)=>{
        webRTChandler.handleCandidate(data)
    })
    socket.on('user-hanged-up',(data)=>{
        webRTChandler.handleUserHangUp(data)
    })
}

export const sendPreOfferAnswer = (data)=>{
    socket.emit('preofferanswer',data)
}

export const registerNewUser = (username)=>{
    socket.emit('register-new-user',{        //sending info of new user to server
        username:username,
        socketId:socket.id
    })
}

export const disconnectUser = ()=>{
    socket.disconnect()
}

export const sendPreOffer = (data)=>{
    socket.emit('preoffer',data)              //sending the pre offer to signalling server
}

export const sendWebRTCOffer = (data)=>{
    socket.emit('webRTC-offer',data)             //sending sdp to signalling server
}
export const sendWebRTCAnswer = (data)=>{
    socket.emit('webRTC-answer',data)             //sending answer to signalling server
}
export const sendWebRTCCandidate = (data)=>{
    socket.emit('webRTC-candidate',data)          //sending ice candidates to server
}

export const sendUserHangedUp = (data)=>{
    socket.emit('user-hanged-up',data);           //sending info that the user has ended the call
}

export const registerGroupCall = (data) =>{
    socket.emit('register group call',data);      //sending info regarding group call to signalling server
}

const handleBroadCastEvents = (data)=>{
    switch(data.event){
        case broadcastEvents.ACTIVE_USERS:      //sends list of active users to all users
          const activeUsers = data.activeUsers.filter(activeUser =>activeUser.socketId!==socket.id)//ensuring that user doesn't see herself on the sidescreen
          store.dispatch(dashboardActions.setActiveUsers(activeUsers)) 
          break;
          default:
              break; 
    }
}