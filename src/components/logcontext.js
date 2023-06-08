import React, { createContext, useEffect, useState } from 'react';
import {auth} from "../config/firebase.js"
import { useNavigate } from 'react-router-dom';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logged,setLogged] = useState(null);
  const navigate=useNavigate()
  console.log(logged)

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setLogged(user);
      } else {
        // User is signed out
        setLogged(null);
        navigate("/signin")
      }
    });

    // Clean up the event listener
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <LogContext.Provider value={{logged,setLogged }}>
      {children}
    </LogContext.Provider>
  );
};
