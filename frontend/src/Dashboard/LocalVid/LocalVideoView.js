import React, { useRef, useEffect } from 'react';
import store from '../../store/store';
const styles = {
  videoContainer: {
    width: '180px',
    height: '180px',
    borderRadius: '8px',
    position: 'absolute',
    top: '5%',
    right: '23%',
    backgroundColor:'white'
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();
  const name = store.getState().dashboard.username

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
      <h4 style={{color:"white",textAlign:"center"}}>{name}</h4> 
    </div>
  );
};

export default LocalVideoView;
