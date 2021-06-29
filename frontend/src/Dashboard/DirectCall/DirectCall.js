import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVid/LocalVideoView';
import RemoteVideoView from '../RemoteVid/RemoteVideoView';
import CallingMessage from '../CallingMessage/CallingMessage';
import CallRejectedMessage from '../CallRejected/CallRejectedMessage';
import IncomingCallMessage from '../IncomingCallMessage/IncomingCallMessage';
import { callStates } from '../../store/actions/callActions';
const DirectCall = (props) => {
  const { localStream, remoteStream,callState,callerUsername,callingDialogVisible } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
       {callingDialogVisible&& <CallingMessage/>} 
      {/* <CallRejectedMessage/> */}
      {callState===callStates.CALL_REQUESTED&&<IncomingCallMessage callerUsername={callerUsername}/>}
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
