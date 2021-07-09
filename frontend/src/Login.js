import React from 'react'
import { Form, Button,Card,Alert,Container } from 'react-bootstrap'
import { useRef,useState } from 'react'
import { useAuth } from "./AuthContext"
import { Link ,useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { setUsername } from './store/actions/dashboardActions';
import { setUser,setSecret } from './store/actions/chatActions'
import { registerNewUser } from './utils/wssConnection/wssConnection'
import store from './store/store'

const Login =  function ({saveUsername}){
 
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const { login } = useAuth()
    const [error, setError] = useState("")
   
    const [loading, setLoading] = useState(false)
     const history = useHistory()

    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        // console.log(emailRef.current.value)
       
        await login(emailRef.current.value, passwordRef.current.value)
        setLoading(false)
        localStorage.setItem('username',emailRef.current.value)
        localStorage.setItem('password',passwordRef.current.value)
        store.dispatch(setUser(emailRef.current.value))
        const username = store.getState().chat.username
        console.log(username)
        store.dispatch(setSecret(passwordRef.current.value))
        saveUsername(usernameRef.current.value);
        registerNewUser(usernameRef.current.value)
         history.push("/")
      } catch {
        setLoading(false)
        setError("Failed to sign in")
      }
      
      
    }

    return(
        <div style={{justifyContent:"center",alignItems:"center",marginTop:"10vh",maxWidth:"400px",height:"90vh",marginLeft:"auto",marginRight:"auto"}}>
        
          <h1 style={{color:"white",width:"400px",marginBottom:"10px",textAlign:"center" }}> VConnect</h1>
        <Card style={{height:"65%",padding:"20px",paddingBottom:"30px"}}>
        <h2 className="text-center mb-4 mt-10">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group id="username" >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>
        <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{marginTop:"10px"}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
           
            <Button disabled ={loading} className = "w-100" type="submit" style={{marginTop:"10px",marginBottom:"10px",backgroundColor:"black"
          }}>Log in</Button>
          </Form>
          <div style={{marginTop:"10px",textAlign:"center"}}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        </Card>
        
        <div className="w-100 text-center mt-10" style={{color:"white",marginTop:"10px"}}>
        Need an account? <Link to="/signup" >Sign up</Link> 
      </div>
    
    </div>
    )
}
const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(Login)
