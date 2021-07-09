import react from 'react'
import { Button,Container,Row,Col } from 'react-bootstrap'
import videocallroom from './videocallroom.jpg'
import chatroom from './chatroom.jpg'
import {Link} from 'react-router-dom'
// import './LandingPage.css'
const Landing = ()=>{
    return(
      
      
      <Container >
        <Row><h1 style={{textAlign:"center",color:"white",marginTop:"10px",fontSize:"60px"}}>Welcome to VConnect</h1></Row>
        <Row style={{marginBottom:"5px"}}>
          <Col style={{justifyContent:"center",marginLeft:"auto",marginRight:"auto",marginBottom:"0px"}}>
          <img src={videocallroom}alt="Video Call Room" height="200px" style={{display:"block",marginLeft:"auto",marginRight:"auto",borderRadius:"8px",marginTop:"30vh"}}/>
          </Col>
          <Col style={{justifyContent:"center",marginLeft:"auto",marginRight:"auto",display:"block"}}>
          <img src = {chatroom} alt="Chat Room" height="200px" style={{display:"block",borderRadius:"8px",marginTop:"30vh",marginLeft:"auto",marginRight:"auto"}}></img>
          </Col>
        </Row>
        <Row >
          <Col>
          
          <Link to="/"><Button style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:"0%"}}>Head to Video Rooms</Button></Link>
          </Col>
          <Col>
          <Link to="/chat"><Button style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:"0%"}}>Head to Chat Rooms</Button></Link>
          </Col>
        </Row>
         {/* <div style = {{marginLeft:"30%"}}>
          <img src={videocallroom}alt="Video Call Room" height="200px" style={{marginRight:"20px",borderRadius:"8px",marginTop:"30vh",marginBottom:"30vh"}}/>
          <Button>Video call room</Button>
          <img src = {chatroom} alt="Chat Room" height="200px" style={{marginRight:"20px",marginLeft:"20px",borderRadius:"8px",marginTop:"30vh",marginBottom:"30vh"}}></img>
        </div>  */}
      </Container>
    )}
export default Landing