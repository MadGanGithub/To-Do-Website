import React from 'react'
import { useState} from "react"
import {auth} from "../config/firebase.js"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const Signup = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")


  const signUp=async(event)=> {
    event.preventDefault()

    try{
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {


        updateProfile(auth.currentUser, {
          displayName: name
          
          }).then(() => {
              console.log("Profile updated")
          }).catch((error) => {
              console.log(error)
          });
          
        console.log(userCredential)
        const user = userCredential.user;
        console.log('User signed up:', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Signup error:', errorCode, errorMessage);
      });
    }catch(error){
      console.log(error)
    }
  }

  return (
          <div className="container" style={{marginLeft:"25%"}}>
      <div className="card shadow" style={{width:"60%"}}>
      <div className="card-body" style={{textAlign:"center"}}>
       <h5 className="card-title">Create an account</h5>
      
        <form onSubmit={signUp}>
          <div className="input-group">
            <div className="input-group-text">Name:</div>
            <input className="form-control" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
    
          </div>

          <br></br>
          <div className="input-group">
            <div className="input-group-text">Email:</div>
            <input className="form-control" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

            <div className="input-group-text">Password:</div>
            <input className="form-control" placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          <br></br>
          <button type="submit" className="btn btn-info " style={{width:400,backgroundColor:'#0E6AED'}}>SignUp</button> 
        </form>
        <br></br>
        <div className="already">
        Already registered? <a href="/signin">Login to your account</a>
        </div>

    </div>
    </div>
    </div>
  )
}

export default Signup
