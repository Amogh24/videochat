import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates } from '../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../utils/Webrtc/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';

const GroupCall = (props) => {
  const { callState, localStream,groupCallActive,groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const exitRoom = ()=>{
    webRTCGroupCallHandler.exitGroupCall()
  }

  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
        <GroupCallButton onClickHandler={createRoom} label='Create room' />}
      
         {groupCallActive && <GroupCallRoom groupCallStreams={groupCallStreams}/>} 
         {groupCallActive && <GroupCallButton onClickHandler = {exitRoom} label='leave room'/>}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call
});

export default connect(mapStoreStateToProps)(GroupCall);
