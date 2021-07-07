import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates, setLocalCamEnabled,setLocalMicEnabled } from '../../store/actions/callActions';
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
      
         {groupCallActive && <GroupCallRoom {...props}/>} 
         {groupCallActive && <GroupCallButton onClickHandler = {exitRoom} label='leave room'/>}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call
});

const mapActionsToProps = (dispatch) =>{
  return{
    setCameraEnabled: enabled =>dispatch(setLocalCamEnabled(enabled)),
    setMicrophoneEnabled: enabled =>dispatch(setLocalMicEnabled(enabled))
  }
}

export default connect(mapStoreStateToProps,mapActionsToProps)(GroupCall);
