import React, { useRef, useEffect } from 'react';
import ConversationButtons from '../Button/ConversationButtons';

const styles = {
  videoContainer: {
    width: '500px',
    height: '70%',
    backgroundColor:'white',
    borderRadius:'8px',
    alignItems:'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left:'100%'
    
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const LocalVideoView = props => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
      
    </div>
  );
};

export default LocalVideoView;
