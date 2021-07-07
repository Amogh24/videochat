import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '300px',
    height: '300px',
    paddingLeft:'10px'
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius:"8px",
    backgroundColor:'white'
  }
};

const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);   //stream is the dependency for this use effect, every time a new user joins, component will be re rendered

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
    </div>
  );
};

export default GroupCallVideo;
