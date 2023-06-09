import React, { useEffect } from 'react'
import { useState} from "react"
import {auth} from "../config/firebase.js"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const navigate=useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/")
      } else {
        console.log("Logged out")
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
          
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error)
      });
    }catch(error){
      console.log(error)
    }
  }

  return (
          <div className="container" style={{marginLeft:"20%",marginTop:120,borderRadius:60}}>
      <div className="card shadow" style={{textAlign:"center",width:400}}>
      <div className="card-body" style={{width:400}}>
       <h5 className="card-title">Sign Up</h5>
      
        <form onSubmit={signUp}>
          <div className="input-group">
            <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Name:</div>
            <input className="form-control" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
    
          </div>

          <br></br>
          <div className="input-group">
            <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Email:</div>
            <input className="form-control" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <br></br>
          <div className="input-group">
            <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Password:</div>
            <input className="form-control" placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          <br></br>
          <button type="submit" className="btn" style={{width:"100%",backgroundColor:"#9ACD32"}}>SignUp</button> 
        </form>
        <br></br>
        <div className="already">
        Already registered? <a href="/signin" style={{color:"#9ACD32"}}>Login to your account</a>
        </div>

    </div>
    </div>
    </div>
  )
}

export default Signup
