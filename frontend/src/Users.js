import React from 'react';
import ActiveUsersListItem from './User';

import './Users.css';

const activeUsers = [
  {
    socketId: 321,
    username: 'Akshat'
  },
  {
    socketId: 333,
    username: 'Aakash'
  },
  {
    socketId: 432,
    username: 'Amogh'
  },
  {
    socketId: 345,
    username: 'Aadi'
  }
];

const ActiveUsersList = () => {
  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) =>
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />)}
    </div>
  );
};

export default ActiveUsersList;
