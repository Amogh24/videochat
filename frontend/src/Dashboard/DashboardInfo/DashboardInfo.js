import React from 'react';

import './DashboardInfo.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title' style={{width:"30vw"}}>
      Hello {username} welcome to VConnect.
      </span>
      <span className='dashboard_info_text_description' style = {{width:"30vw"}}>
      You can start a one-to-one call to a person from the list or
        you can create or join a group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
