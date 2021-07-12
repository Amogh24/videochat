import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./AuthContext"
//this component ensures that if a user is not logged in then he cannot access any other route apart from login
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}