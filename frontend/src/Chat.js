import React from 'react';
import store from './store/store'
import {ChatEngine} from 'react-chat-engine'
function Chat() {
  const username = store.getState().chat.username
  console.log(username)
  const usersecret = store.getState().chat.secret
  console.log(usersecret)
  return (
    <div style={{height:'100vh',width:'100%'}}>
     <ChatEngine                                            //calling the chat engine component
			projectID='9836fce5-37b2-419a-9c2a-cc4256195a3a'
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
            height = '100vh'/>
            </div>
  );
}

export default Chat;