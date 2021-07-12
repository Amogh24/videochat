import React from 'react'
import { Form, Button,Card,Alert } from 'react-bootstrap'
import { useRef,useState } from 'react'
import { useAuth } from "./AuthContext"
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import store from './store/store'
import { setUsername } from './store/actions/dashboardActions'
export default function Signup(){
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
     const history = useHistory()
    
    async function handleSubmit(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        store.dispatch(setUsername(usernameRef.current.value))
        localStorage.setItem('username',emailRef.current.value)
        localStorage.setItem('password',passwordRef.current.value)
        var axios = require('axios');
var data = {
	"username": emailRef.current.value,
	"secret": passwordRef.current.value,
	"first_name":usernameRef.current.value,
};

var config = {
	method: 'post',
	url: 'https://api.chatengine.io/users/',
	headers: {
		'PRIVATE-KEY': '{{eaac8ccd-7841-4bd3-87c2-3c7c08f42498}}'
	},
	data : data
};

axios(config)
.then(function (response) {
	console.log(JSON.stringify(response.data));
})
.catch(function (error) {
	console.log(error);
});
         history.push("/landing")
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }

    return(
        <div style={{justifyContent:"center",alignItems:"center",marginTop:"10vh",width:"25%",height:"90vh",marginLeft:"auto",marginRight:"auto",minWidth:'400px'}}>
        <Card style={{height:"75%",padding:"20px",paddingBottom:"30px",width:"100%"}}>
        <h2 className="text-center mb-4 mt-10">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label style={{marginTop:"10px"}}>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled ={loading} className = "w-100" type="submit" style={{marginTop:"10px",marginBottom:"10px",backgroundColor:"black"
          }}>Sign Up</Button>
          </Form>
        </Card>
        <div className="w-100 text-center mt-10" style={{color:"white",marginTop:"10px"}}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
    )
}