import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVid/LocalVideoView';
import RemoteVideoView from '../RemoteVid/RemoteVideoView';

const DirectCall = (props) => {
  const { localStream, remoteStream } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
