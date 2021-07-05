import React from 'react';
import { Button } from 'react-bootstrap';
import './GroupCallButton.css';

const GroupCallButton = ({ onClickHandler, label }) => {
  return (
    <Button onClick={onClickHandler} className='group_call_button'>
      {label}
    </Button>
  );
};

export default GroupCallButton;
