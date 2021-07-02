import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVid/LocalVideoView';
import RemoteVideoView from '../RemoteVid/RemoteVideoView';
import CallingMessage from '../CallingMessage/CallingMessage';
import CallRejectedMessage from '../CallRejected/CallRejectedMessage';
import IncomingCallMessage from '../IncomingCallMessage/IncomingCallMessage';
import { callStates, setCallRejected, setLocalCamEnabled, setLocalMicEnabled } from '../../store/actions/callActions';
import ConversationButtons from '../Button/ConversationButtons';
const DirectCall = (props) => {
  const { localStream, remoteStream,callState,callerUsername,callingDialogVisible,callRejected,hideCallRejectedDialog } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
       {callingDialogVisible&& <CallingMessage/>} 
      {callRejected.rejected && <CallRejectedMessage reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog}/> }
      {callState===callStates.CALL_REQUESTED&&<IncomingCallMessage callerUsername={callerUsername}/>}
       <ConversationButtons {...props}/> 
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchtoProps(dispatch){
  return {
    hideCallRejectedDialog:(callRejectedDetails)=>dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled:(enabled)=>dispatch(setLocalCamEnabled(enabled)),
    setMicrophoneEnabled:(enabled)=>dispatch(setLocalMicEnabled(enabled))
  }
}

export default connect(mapStoreStateToProps, mapDispatchtoProps)(DirectCall);
