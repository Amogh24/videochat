import socketClient from 'socket.io-client'
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions'
import * as webRTChandler from '../Webrtc/WebrtcHandler'
import * as webRTCGroupCallHandler from '../Webrtc/webRTCGroupCallHandler'

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

    //listeners for group call
    socket.on('user-wants-to-join-group-call',(data)=>{
        webRTCGroupCallHandler.connectNewUser(data)
    })
    socket.on('user is leaving group call',(data)=>{
        webRTCGroupCallHandler.removeStream(data)   //on receiving info that a user is leaving the group call, use the remove stream function to remove that users stream
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

export const incomingUser = (data)=>{
    socket.emit('user-wants-to-join-group-call',data) //sending info regarding incoming user request to signalling server
}

export const userLeaving = (data)=>{
    socket.emit('user is leaving group call',data)
}

const handleBroadCastEvents = (data)=>{
    switch(data.event){
        case broadcastEvents.ACTIVE_USERS:      //sends list of active users to all users
          const activeUsers = data.activeUsers.filter(activeUser =>activeUser.socketId!==socket.id)//ensuring that user doesn't see herself on the sidescreen
          store.dispatch(dashboardActions.setActiveUsers(activeUsers)) 
          break;
          default:
              break; 
        case broadcastEvents.GROUP_CALL_ROOMS:
          const groupCallRooms = data.groupCallRooms
          store.dispatch(dashboardActions.setGroupCallRooms(groupCallRooms))  //everytime a new groupcall room is added, the list is updated 
    }
}