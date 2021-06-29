import React from 'react';
import { acceptIncomingCall, rejectIncomingCall } from '../../utils/Webrtc/WebrtcHandler';

import './IncomingCallMessage.css';

const IncomingCallMessage = (props) => {
  const handleAcceptButtonPressed = () => {
    // accept the call
    acceptIncomingCall()
  };

  const handleRejectButtonPressed = () => {
    // accept the call
    rejectIncomingCall()
  };

  return (
    <div className='direct_call_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>Call from {props.callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallMessage;
