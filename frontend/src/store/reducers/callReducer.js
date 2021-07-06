import * as callActions from '../actions/callActions';

const initState = {
  localStream:null,
  callState:callActions.callStates.CALL_UNAVAILABLE,
  callingDialogVisible:false,
  callerUsername:'',
  callRejected:{
    rejected:false,
    reason:''
  },
  remoteStream:null,
  localCamEnabled:true,
  localMicEnabled:true,
  screenSharingActive:false,
  groupCallActive:false,
  groupCallStreams:[]
};

const reducer = (state = initState, action) => {    //this basically changes the state  
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream:action.localStream     //used to display local stream once it is obtained
      };
      case callActions.CALL_SET_CALL_STATE:
        return{
          ...state,
          callState:action.callState      //used to change the state of the call
        }
        case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
          return{
            ...state,
            callingDialogVisible:action.visible   //used to show calling dialog when we call someone and hide it otherwise
          }
        case callActions.CALL_SET_CALLER_USERNAME:
          return{
            ...state,
            callerUsername:action.callerUsername
          }
          case callActions.CALL_SET_CALL_REJECTED:
            return{
              ...state,
              callRejected:action.callRejected
            }
          case callActions.CALL_SET_REMOTE_STREAM:
            return{
             ...state,
             remoteStream:action.remoteStream
            }
          case callActions.CALL_SET_LOCAL_CAM_ENABLED:
            return{
              ...state,
              localCamEnabled:action.enabled
            }
          case callActions.CALL_SET_LOCAL_MIC_ENABLED:
            return{
              ...state,
              localMicEnabled:action.enabled
            }
          case callActions.CALL_SET_SCREEN_SHARING_ACTIVE:
            return{
              ...state,
              screenSharingActive:action.active
            }
          case callActions.CALL_SET_GROUP_CALL_ACTIVE:
            return{
              ...state,
              groupCallActive:action.active
            }
          case callActions.CALL_RESET_CALL_DATA:
            return{
              ...state,
              remoteStream: null,
              screenSharingActive:false,
              callingDialogVisible:false,
              callerUsername:'',
              localMicEnabled:true,
              localCamEnabled:true,

            }
          case callActions.CALL_SET_GROUP_CALL_STREAMS:
            return{
              ...state,
              groupCallStreams:action.groupCallStreams
            }

    default:
      return state;
  }
}
;

export default reducer;
