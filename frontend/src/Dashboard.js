
import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard({username}) {
   
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br/><br/>
          <Link to="/peer-to-peer"><Button style={{backgroundColor:"black"}}>peer to peer call</Button></Link>
          {/* <Link to="/update-profile" className="btn btn-dark w-100 mt-3">
            Update Profile
          </Link> */}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
