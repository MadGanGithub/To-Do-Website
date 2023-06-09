import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../config/firebase.js"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/')
      } else {
        console.log("Logged out")
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const signIn=async(e)=>{

    e.preventDefault()
    try{
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success("Signedin Successfully")
    })
    }catch(error){
      console.log(error)
      toast.warning("Email or password is wrong")
    };

    navigate("/")
}


  return (
          <div className="container" style={{marginLeft:"20%",marginTop:120,borderRadius:60}}>
      <div className="card shadow" style={{textAlign:"center",width:400}}>
      <div className="card-body" style={{width:400}}>
       <h5 className="card-title">Log in </h5>
          <form onSubmit={signIn}>
              <div className="input-group">
                <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Email:</div>
                <input className="form-control" type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

              </div>
              <br></br>
              <div className="input-group">
                <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Password:</div>
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
                <br></br>
                <button type="submit" className="btn" style={{width:"100%",backgroundColor:"#9ACD32"}} value="SignIn">SignIn</button> 
          </form>
          <br></br>
          <div>
          New to TO-DO? <a href="/signup" style={{color:"#9ACD32"}}>Join Now</a>
          </div>
          <a href='/forgot' style={{color:"#9ACD32"}}>Forgot Password</a>
          </div>
      </div>
    </div>
  )
}

export default Signin
