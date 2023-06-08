import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../config/firebase.js"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { LogContext } from '../components/logcontext.js';


const Signin = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const {logged,setLogged}=useContext(LogContext)
  const navigate = useNavigate();

  const signIn=async(e)=>{

    e.preventDefault()
    try{
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setLogged(userCredential)
      const user = userCredential.user;
      console.log(user)
    })
    }catch(error){
      const errorMessage = error.message;
      console.log(errorMessage)
    };

    navigate("/")
}


  return (
          <div className="container" style={{marginLeft:"30%"}}>
      <div className="card shadow" style={{textAlign:"center",width:"40%"}}>
      <div className="card-body">
       <h5 className="card-title">Log in </h5>
          <form onSubmit={signIn}>
              <div className="input-group">
                <div className="input-group-text">Email:</div>
                <input className="form-control" type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

              </div>
              <br></br>
              <div className="input-group">
                <div className="input-group-text">Password:</div>
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
                <br></br>
                <button type="submit" className="btn btn-primary" style={{width:"100%"}} value="SignIn">SignIn</button> 
          </form>
          <br></br>
          <div>
          New to Xometry? <a href="/signup">Join Now</a>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Signin
