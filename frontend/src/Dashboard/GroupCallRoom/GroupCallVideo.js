import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '300px',
    height: '300px'
  },
  videoElement: {
    width: '100%',
    height: '100%'
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
