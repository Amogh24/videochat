import { callStates, setCallState, setGroupCallActive } from "../../store/actions/callActions";
import store from "../../store/store";
import * as  wss from "../wssConnection/wssConnection"

let myPeer;
let myPeerId;

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

export const joinGroupCall = (hostSocketId,roomId)=>{  //function which calls incoming user function from wss which sends info to server
  const localStream  = store.getState().call.localStream
  wss.incomingUser({
    peerId:myPeerId,
    hostSocketId,
    roomId,
    localStreamId:localStream.id
  })
  store.dispatch(setGroupCallActive(true))
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}

export const connectToNewUser = (data)=>{
  //function to add user to group call
  const localStream = store.getState().call.localStream   //fetching localstream from the store
  const call = myPeer.call(data.peerId,localStream);  //Calls the remote peer specified by id and returns a media connection.
  call.on('stream',(incomingStream)=>{
    console.log('stream came');
  })
}