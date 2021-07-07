import { callStates, setCallState, setGroupCallActive, setGroupCallIncomingStreams,clearGroupCallData } from "../../store/actions/callActions";
import store from "../../store/store";
import * as  wss from "../wssConnection/wssConnection"

let myPeer;
let myPeerId;
let callRoomId;

export const connectWithMyPeer = ()=>{
  myPeer = new window.Peer(undefined,{
      path:'/peerjs',
      host:'/',
      port:'5000'
  })  


  myPeer.on('open',(id)=>{
      console.log("connected with peer server");
      console.log(id);
      myPeerId = id;
  })
  myPeer.on('call',call=>{
    call.answer(store.getState().call.localStream)
    call.on('stream',incomingStream=>{
      console.log("stream arrived")
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find(stream=>stream.id === incomingStream.id); //checking if the incoming stream already exists in the group call
      if(!stream){
        addVideoStream(incomingStream)
      }
    })
  })
}

export const createNewGroupCall = () =>{
  wss.registerGroupCall({
    username:store.getState().dashboard.username + "'s Room",
    peerId:myPeerId
  })
  store.dispatch(setGroupCallActive(true))
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}

export const exitGroupCall = () =>{
  wss.userLeaving({
    streamId:store.getState().call.localStream.id,
    roomId:callRoomId
  })
  callRoomId = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy(); //for leaving the group call we destroy the current peer connection
  connectWithMyPeer(); //create new peer connection for subsequent calls
}

export const removeStream = (data)=>{   //function to remove stream of a user who left the call
  const groupCallStreams = store.getState().call.groupCallStreams.filter(  
    stream =>stream.id !== data.streamId  //data will contain the streamid of a user who has left the call
  )
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams))
}

export const joinGroupCall = (hostSocketId,roomId)=>{  //function which calls incoming user function from wss which sends info to server
  const localStream  = store.getState().call.localStream
  callRoomId = roomId
  wss.incomingUser({
    peerId:myPeerId,
    hostSocketId,
    roomId,
    localStreamId:localStream.id
  })
  store.dispatch(setGroupCallActive(true))
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}

export const connectNewUser = (data)=>{
  //function to add user to group call
  const localStream = store.getState().call.localStream   //fetching localstream from the store
  const call = myPeer.call(data.peerId,localStream);  //Calls the remote peer specified by id and returns a media connection.
  call.on('stream',(incomingStream)=>{
    console.log('stream came');
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find(stream=>stream.id === incomingStream.id); //checking if the incoming stream already exists in the group call
    if(!stream){
      addVideoStream(incomingStream)
    }
  })
}
export const addVideoStream = (incomingStream)=>{
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ]
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams))
}
