import React from 'react';
import { hangUp } from '../../utils/Webrtc/WebrtcHandler';
import { MdCallEnd } from 'react-icons/md';
import './CallingMessage.css';

const CallingMessage = () => {

  const handleHangUpButtonPressed = ()=>{
    hangUp()
  }

  const styles = {
    buttonContainer: {
      marginTop: '10px',
      width: '40px',
      height: '40px',
      borderRadius: '40px',
      border: '2px solid #e6e5e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:'red'
    }
  };
  //#e6e5e8
  return (
    <div className='direct_calling_dialog background_secondary_color'>
      <span><b>Calling</b></span>
      <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}>
        <MdCallEnd style={{ width: '20px', height: '20px', fill: '#e6e5e8' }} />   
      </div>
    </div>
  );
};

export default CallingMessage;