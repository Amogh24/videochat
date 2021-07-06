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
}

export const createNewGroupCall = () =>{
  wss.registerGroupCall({
    username:store.getState().dashboard.username + "'s Room",
    peerId:myPeerId
  })
  store.dispatch(setGroupCallActive(true))
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}