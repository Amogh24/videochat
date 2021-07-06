import React from 'react';
import ConversationButtons from '../Button/ConversationButtons';

import './GroupCallRoom.css';

const GroupCallRoom = () => {
  return (
    <div className='group_call_room_container'>
      <span className='group_call_title'>Group Call</span>
      <div className='group_call_videos_container' style={{color:"white"}}>
        display the streams from the other users
      </div>
      <ConversationButtons />
    </div>
  );
};

export default GroupCallRoom;
