import Signup from "./signup"
import { AuthProvider } from "./AuthContext"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login';
import Dashboard from './Dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './Forgot';

 export default function Home(){
    return (
        <div style={{background:"linear-gradient(to right, #000000, #434343)",height:"100vh",width:"100%",display:"flex"}}>
         
          {/* <div className="w-100" style={{ maxWidth: "400px",marginTop:"10vh"}}> */}
          <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
             
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  
                  <Route path="/forgot-password" component={ForgotPassword} /> 
                </Switch>
              </AuthProvider>
            </Router>
            {/* </div> */}
             {/* </Container>   */}
        </div>
      );
    }
    
 