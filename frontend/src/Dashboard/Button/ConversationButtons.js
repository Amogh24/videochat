import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdVideoCall, MdCamera } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { hangUp, switchForScreenSharingStream } from '../../utils/Webrtc/WebrtcHandler';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '29%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCamEnabled,
    localMicEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screensharingActive,
    groupCall
  } = props;

  const handleMicButtonPressed = () => {
    const micEnabled = localMicEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCamEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () =>{
    switchForScreenSharingStream();
  }

  const handleEndCallButtonPressed = () =>{
    hangUp();
  }

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationButton>
      {!groupCall &&<ConversationButton onClickHandler = {handleEndCallButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCamEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationButton>
      {!groupCall&&<ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
       {screensharingActive? <MdCamera style={styles.icon}/>:<MdVideoLabel style={styles.icon} />}
      </ConversationButton>}
    </div>
  );
};

export default ConversationButtons;
