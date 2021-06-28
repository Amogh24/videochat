import { setLocalStream } from "../../store/actions/callActions"
import store from '../../store/store';
const constraints = {
    video:true,
    audio:true
};

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(constraints).then(stream=>{
        store.dispatch(setLocalStream(stream))
    })
    .catch(err=>{
        console.log("couldn't get access to local stream")
        console.log(err)
    })
}