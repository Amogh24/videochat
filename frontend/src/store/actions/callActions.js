export const callStates ={
    CALL_UNAVAILABLE:'CALL_UNAVAILABLE',
    CALL_AVAILABLE:'CALL_AVAILABLE',
    CALL_REQUESTED:'CALL_REQUESTED',
    CALL_IN_PROGRESS:'CALL_IN_PROGRESS'
}

export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE'
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE'
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME'
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED'
export const CALL_SET_REMOTE_STREAM = 'CALL.SET_REMOTE_STREAM'
export const CALL_SET_LOCAL_MIC_ENABLED = 'CALL.SET_LOCAL_MIC_ENABLED'
export const CALL_SET_LOCAL_CAM_ENABLED = ' CALL.SET_LOCAL_CAM_ENABLED'
export const CALL_SET_SCREEN_SHARING_ACTIVE = 'CALL.SET_SCREEN_SHARING_ACTIVE'
export const CALL_RESET_CALL_DATA = 'CALL.RESET_CALL_DATA'
export const CALL_SET_GROUP_CALL_ACTIVE = 'CALL.SET_GROUP_CALL_ACTIVE'

export const setLocalStream = (localStream)=>{
    return{
        type:CALL_SET_LOCAL_STREAM,
        localStream
    }
}
export const setCallState = (callState)=>{
    return{
        type:CALL_SET_CALL_STATE,
        callState
    }
}
export const setCallingDialogVisible = (visible)=>{
    return{
        type:CALL_SET_CALLING_DIALOG_VISIBLE,
        visible
    }
}
export const setCallerUsername = (callerUsername)=>{
    return{
        type:CALL_SET_CALLER_USERNAME,
        callerUsername
    }
}

export const setCallRejected = (callRejectedDetails)=>{
    return{
        type:CALL_SET_CALL_REJECTED,
        callRejected:{
        rejected:callRejectedDetails.rejected,
        reason:callRejectedDetails.reason
    }
}
}

export const setRemoteStream=(remoteStream)=>{
    return{
        type:CALL_SET_REMOTE_STREAM,
        remoteStream
    }
}
export const setLocalMicEnabled = (enabled)=>{
    return{
        type:CALL_SET_LOCAL_MIC_ENABLED,
        enabled
    }
}
export const setLocalCamEnabled = (enabled)=>{
    return{
        type:CALL_SET_LOCAL_CAM_ENABLED,
        enabled
    }
}
export const setScreenSharingActive = (active)=>{
    return{
        type:CALL_SET_SCREEN_SHARING_ACTIVE,
        active
    }
}

export const resetCallDataStateToDefault = ()=>{
    return{
        type:CALL_RESET_CALL_DATA
    }
}

export const setGroupCallActive = (active)=>{
    return{
        type:CALL_SET_GROUP_CALL_ACTIVE,
        active
    }
}