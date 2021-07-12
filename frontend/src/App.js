
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ChatEngine} from 'react-chat-engine'
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import { useEffect } from 'react';
import Home from './Home'

function App() {

  useEffect(()=>{
    connectWithWebSocket()   //connecting to the socket when the app is mounted
  },[])
  return(
    <div><Home/></div>
    
  )
}

export default App;
