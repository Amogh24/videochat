import { setCallState, setLocalStream,callStates, setCallingDialogVisible, setCallerUsername } from "../../store/actions/callActions"
import store from '../../store/store';
import * as wss from '../wssConnection/wssConnection'
const constraints = {
    video:true,
    audio:true
};

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(constraints).then(stream=>{
        store.dispatch(setLocalStream(stream))
        store.dispatch(setCallState(callStates.CALL_AVAILABLE))
    })
    .catch(err=>{
        console.log("couldn't get access to local stream")
        console.log(err)
    })
}
let userId;

export const callToOtherUser = (calleeDetails) =>{
    userId = calleeDetails.socketId   //caller stores id of callee
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
    store.dispatch(setCallingDialogVisible(true))
    wss.sendPreOffer({
        callee:calleeDetails,
        caller:{
            username:store.getState().dashboard.username
        }
    })
}

export const handlePreOffer = (data)=>{
    userId = data.callerSocketId //callee stores id of caller
    store.dispatch(setCallerUsername(data.callerUsername))
    store.dispatch(setCallState(callStates.CALL_REQUESTED))
}