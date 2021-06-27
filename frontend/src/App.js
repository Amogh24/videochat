
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./signup"
import { AuthProvider } from "./AuthContext"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login';
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './Forgot';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import { useEffect } from 'react';
import Home from './Home'

function App() {

  useEffect(()=>{
    connectWithWebSocket()
  },[])
  return(
    <div><Home/></div>
    
  )
}
  // "linear-gradient(to right, #000000, #434343)"
//   return (
//     <div  style={{background:"linear-gradient(to right, #000000, #434343)",display:"flex"}}>
//       <Container fluid
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh",width:"100%"}}
//     >  
//       <div className="w-100" style={{ maxWidth: "400px",marginTop:"10vh"}}>
//       <Router>
//           <AuthProvider>
//             <Switch>
//               <PrivateRoute exact path="/" component={Dashboard} />
//               {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
         
//               <Route path="/signup" component={Signup} />
//               <Route path="/login" component={Login} />
              
//               <Route path="/forgot-password" component={ForgotPassword} /> 
//             </Switch>
//           </AuthProvider>
//         </Router>
//         </div>
//          </Container>  
//     </div>
//   );
// }

export default App;
