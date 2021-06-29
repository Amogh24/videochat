import { setCallState, setLocalStream,callStates, setCallingDialogVisible, setCallerUsername } from "../../store/actions/callActions"
import store from '../../store/store';
import * as wss from '../wssConnection/wssConnection'
const constraints = {
    video:true,
    audio:true
};

const preOfferAnswers = {
    CALL_ACCEPTED:'CALL_ACCEPTED',
    CALL_REJECTED:'CALL REJECTED',
    CALL_NOT_AVAILABLE:'CALL_NOT_AVAILABLE'
}

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
    if(checkCallPossibility)
    {
        userId = data.callerSocketId //callee stores id of caller
        store.dispatch(setCallerUsername(data.callerUsername))
        store.dispatch(setCallState(callStates.CALL_REQUESTED))
    } else{
        wss.sendPreOfferAnswer({
            callerSocketId:data.callerSocketId,
            answer:preOfferAnswers.CALL_NOT_AVAILABLE
        })
    }
   
}

export const acceptIncomingCall = ()=>{
    wss.sendPreOfferAnswer({
        callerSocketId:userId,
        answer:preOfferAnswers.CALL_ACCEPTED
    })
}

export const rejectIncomingCall = ()=>{
    
    wss.sendPreOfferAnswer({
        callerSocketId:userId,
        answer:preOfferAnswers.CALL_REJECTED
    })
    resetCallData()
}

export const resetCallData = ()=>{
    userId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}

export const checkCallPossibility = ()=>{
if(store.getState().call.localStream === null || store.getState().call.callState!==callStates.CALL_AVAILABLE){
    return false
}
else return true;
}