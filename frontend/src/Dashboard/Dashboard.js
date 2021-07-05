import { disconnectUser } from "../utils/wssConnection/wssConnection"
import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Dashboard.css'
import ActiveUsersList from '../Users';
import * as webRTCHandler from '../utils/Webrtc/WebrtcHandler'
import * as webRTCGroupHandler from '../utils/Webrtc/webRTCGroupCallHandler'
import DirectCall from './DirectCall/DirectCall'
import { callStates } from "../store/actions/callActions"
import { Socket } from "socket.io-client"
import DashboardInformation from "./DashboardInfo/DashboardInfo"
import { connect } from "react-redux"
import GroupCallRoomsList from "./GroupCalls/GroupCallRoomsList"

const Dashboard=({username,callState})=> {
   useEffect(()=>{
     webRTCHandler.getLocalStream();
     webRTCGroupHandler.connectWithMyPeer();
   },[])
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
     const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      disconnectUser(); //function to disconnect user from server
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section'>
        <div className='dashboard_content_container'>
            <DirectCall/>
            {callState!==callStates.CALL_IN_PROGRESS&&<DashboardInformation username={username}/>}
        </div>
        <div className='dashboard_rooms_container background_secondary_color'>
         <GroupCallRoomsList/>
        </div>
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          {callState!==callStates.CALL_IN_PROGRESS&&<ActiveUsersList/>}
        </div>
        <div className='dashboard_logo_container'>
        <Button  variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </div>
      </div>
    </div>

    </>
  )
 
}
const mapStateToProps = ({call,dashboard})=>({
  ...call,
  ...dashboard
})
export default connect(mapStateToProps)(Dashboard)
