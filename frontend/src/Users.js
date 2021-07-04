import React from 'react';
import ActiveUsersListItem from './User';
import { connect } from 'react-redux';
import './Users.css';



const ActiveUsersList = ({activeUsers,callState}) => {
  return (
    <div className='active_user_list_container'>
      <h4>List of active users</h4>
      <br/>
      {activeUsers.map((activeUser) =>              //renders the list of active users
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />)}
    </div>
  );
};

const mapStateToProps = ({dashboard,call})=>({     //this allows the state stored in reducers to be mapped to props of the current component
  ...dashboard,
  ...call
})

export default connect(mapStateToProps) (ActiveUsersList);
