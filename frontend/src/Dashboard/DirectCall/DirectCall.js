import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVid/LocalVideoView';
import RemoteVideoView from '../RemoteVid/RemoteVideoView';
import CallingMessage from '../CallingMessage/CallingMessage';
import CallRejectedMessage from '../CallRejected/CallRejectedMessage';
import IncomingCallMessage from '../IncomingCallMessage/IncomingCallMessage';
const DirectCall = (props) => {
  const { localStream, remoteStream } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/* <CallingMessage/> */}
      {/* <CallRejectedMessage/> */}
      <IncomingCallMessage/>
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
