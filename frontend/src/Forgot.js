import React from 'react'
import { Form, Button,Card,Alert } from 'react-bootstrap'
import { useRef,useState } from 'react'
import { useAuth } from "./AuthContext"
import { Link } from 'react-router-dom'

export default function ForgotPassword(){
    const emailRef = useRef()
    
  
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check your inbox for further instructions")
      } catch {
        setError("Failed to reset password")
      }
  
      setLoading(false)
    }

    return(
        <div style={{justifyContent:"center",alignItems:"center",marginTop:"20vh",width:"20%",height:"80vh",marginLeft:"auto",marginRight:"auto"}}>
        <Card style={{height:"45%",padding:"20px",paddingBottom:"30px"}}>
        <h2 className="text-center mb-4 mt-10">Reset Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group id="email" style={{textAlign:"center"}}>
              <Form.Label >Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
           
            <Button disabled ={loading} className = "w-100" type="submit" style={{marginTop:"10px",marginBottom:"10px",backgroundColor:"black"
          }}>Reset Password</Button>
          </Form>
          <div style={{marginTop:"10px",textAlign:"center"}}>
          <Link to="login">Login</Link>
        </div>
        </Card>
        
        <div className="w-100 text-center mt-10" style={{color:"white",marginTop:"10px"}}>
        Need an account? <Link to="/signup" >Sign up</Link> 
      </div>
    </div>
    ) 
}