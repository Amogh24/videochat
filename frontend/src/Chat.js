import React from 'react';
import {ChatEngine} from 'react-chat-engine'
function Chat() {
  return (
    <div style={{height:'100vh',width:'100%'}}>
     <ChatEngine
			projectID='9836fce5-37b2-419a-9c2a-cc4256195a3a'
			userName='A2'
			userSecret='123456'
            height = '100vh'/>
            </div>
  );
}

export default Chat;