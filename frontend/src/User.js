import React from 'react';
import userAvatar from './icon.jpg';
import { callStates } from './store/actions/callActions';
import { callToOtherUser } from './utils/Webrtc/WebrtcHandler';

const ActiveUsersListItem = (props) => {
  const { activeUser,callState } = props;

  const handleListItemPressed = () => {
    if(callState===callStates.CALL_AVAILABLE)
    {
      // calling the other user
      callToOtherUser(activeUser)
    }
    
  };

  console.log(activeUser);

  return (
    <div className='active_user_list_item' onClick={handleListItemPressed}>
      <div className='active_user_list_image_container'>
       <img className='active_user_list_image' src={userAvatar} /> 
       <span className='caption'>{activeUser.username}</span>
      </div>
      
      
    </div>
  );
};

export default ActiveUsersListItem;
