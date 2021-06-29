import React, { useEffect } from 'react';

import './CallRejectedMessage.css';

const CallRejectedMessage = (props) => {

  useEffect(()=>{
    setTimeout(()=>{
      props.hideCallRejectedDialog({
        rejected:false,
        reason:''
      })
    },[4000])
  },[])
  return (
    <div className='call_rejected_dialog background_secondary_color'>
      <span>
        <b>{props.reason}</b>
      </span>
    </div>
  );
};

export default CallRejectedMessage;
