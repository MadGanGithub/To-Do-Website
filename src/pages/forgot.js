import { sendPasswordResetEmail } from 'firebase/auth';
import { app,auth } from '../config/firebase.js';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
    const[email,setEmail]=useState('')
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


    const handleForgotPassword = () => {
      
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success('Password reset email sent');
            navigate("/signin")
          })
          .catch((error) => {
            console.error('Error sending password reset email:', error);
          });
      };

      
  return (
            <div className="container" style={{marginLeft:"20%",marginTop:120,borderRadius:60}}>
            <div className="card shadow" style={{textAlign:"center",width:400}}>
            <div className="card-body" style={{width:400}}>
             <h5 className="card-title">Forgot Password</h5>
            
             <form onSubmit={handleForgotPassword}>
                <div className="input-group">
                  <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Email:</div>
                  <input className="form-control" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
      
                <br></br>
                <button type="submit" className="btn" style={{width:"100%",backgroundColor:"#9ACD32"}}>Reset Password</button> 
              </form>
      
          </div>
          </div>
          </div>
  )
}

export default Forgot
