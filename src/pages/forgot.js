import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app,auth } from '../config/firebase.js';
import React, { useState } from 'react'

const Forgot = () => {
    const[email,setEmail]=useState('')



    const handleForgotPassword = () => {
      
        sendPasswordResetEmail(auth, email)
          .then(() => {
            console.log('Password reset email sent');
          })
          .catch((error) => {
            console.error('Error sending password reset email:', error);
          });
      };

      
  return (
    <div>
    <h2>Forgot Password</h2>
    <form onSubmit={handleForgotPassword}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  </div>
  )
}

export default Forgot
