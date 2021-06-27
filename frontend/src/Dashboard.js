
import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Dashboard.css'

import { Container,Row,Col } from "react-bootstrap";
export default function Dashboard() {
   
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
     const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
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
            content
        </div>
        <div className='dashboard_rooms_container background_secondary_color'>
            rooms
        </div>
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          users
        </div>
       
      </div>
    </div>
{/*      
        <Container style={{color:"black",height:"100%",width:"100%"}}>
           <Row xl={12}>
             <Col>
           <Card style={{textAlign:"center",width:"100px"}}>
              <Card.Body>Rooms</Card.Body>
               </Card>
              </Col>
               <Col>
            <Card style={{textAlign:"center"}}>
               <Card.Body>Content</Card.Body>
               </Card>
               </Col>
               <Col>
             <Card style={{textAlign:"center"}}>
               <Card.Body>Active Users</Card.Body>
               </Card>
               </Col> */}
            

        {/* </Row> */}
        {/* </Container> */}
      <div className="w-100 text-center mt-2">
        <Button style={{marginBottom:"10px",marginTop:"80%"}}variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
