import { setCallState, setLocalStream,callStates, setCallingDialogVisible, setCallerUsername, setCallRejected } from "../../store/actions/callActions"
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
        createPeerConnection()
    })
    .catch(err=>{
        console.log("couldn't get access to local stream")
        console.log(err)
    })
}
let userId;
let peerConnection;
const configuration = {
    iceServers:[{
        urls:'stun:stun.l.google.com:13902'
    }]
}
const createPeerConnection = ()=>{
    peerConnection = new RTCPeerConnection(configuration)
    const localStream = store.getState().call.localStream;
    for (const track of localStream.getTracks()){
        peerConnection.addTrack(track,localStream)
    }

    peerConnection.ontrack=({streams:[stream]})=>{
        //dispatch
    }
    peerConnection.onicecandidate = (event)=>{
        //send ice candidates to peer
        console.log("getting ice candidates from stun server")
        if(event.candidate){
            wss.sendWebRTCCandidate({
                candidate:event.candidate,
                userId:userId
            })
        }
    };
    peerConnection.onconnectionstatechange = (event)=>{
        if(peerConnection.connectionState === 'connected'){
            console.log("successfully connected with peer")
        }
    }

}


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

export const handlePreOfferAnswer=(data)=>{

    store.dispatch(setCallingDialogVisible(false))
    if(data.answer === preOfferAnswers.CALL_ACCEPTED){
        //send webrtc offer
        sendOffer()
    }else{
        let rejectionMessage;
        if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE){
            rejectionMessage = 'The user you are calling is unable to pick the call right now'
        }else{
            rejectionMessage = 'Call was rejected by the other user'
        }
        store.dispatch(setCallRejected({
            rejected:true,
            reason:rejectionMessage
        }))
        resetCallData();
    }
    
}

const sendOffer = async() =>{
    const offer = await peerConnection.createOffer()
    peerConnection.setLocalDescription(offer)
    wss.sendWebRTCOffer({
        calleeSocketId:userId,
        offer:offer
    })
}

export const handleOffer = async(data)=>{
    await peerConnection.setRemoteDescription(data.offer);//the offer sent by caller will be remote description for the callee
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer)  //the answer created to the offer will be local description for the callee
    wss.sendWebRTCAnswer({
        callerSocketId:userId,
        answer: answer
    })
}
export const handleAnswer = async(data)=>{
    await peerConnection.setRemoteDescription(data.answer) //the answer created by callee is remote description for caller
}

export const handleCandidate = async(data)=>{
    try{
        console.log("adding ice candidates")
        await peerConnection.addIceCandidate(data.candidate)
    }catch(err){
        console.error('error occured when trying to add received candidate',err)
    }
}

export const checkCallPossibility = ()=>{
if(store.getState().call.localStream === null || store.getState().call.callState!==callStates.CALL_AVAILABLE){
    return false
}
else return true;
}