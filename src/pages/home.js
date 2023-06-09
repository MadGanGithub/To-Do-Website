import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import ListViewer from "../components/ListViewer.js";
import { signOut } from 'firebase/auth';
import { app,auth} from '../config/firebase.js';
import "./home.css"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate=useNavigate()
  const[logged,setLogged]=useState("")

  const handleClick=()=>{
    navigate('/new')
  }
  const handleLogout = () => {    
    signOut(auth)
      .then(() => {
        toast.success('User logged out successfully');
        navigate('/signin')
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLogged(user.displayName)
      } else {
        navigate("/signin")
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  

  return (
    <div style={{marginTop:90}}>
      <Header></Header>
      <button
        onClick={handleClick}
        style={{ width: '100%',borderRadius:20, marginTop: '10px',backgroundColor:"#9ACD32",borderStyle:"none",padding:5,color:"white" }}
      >
        +
      </button>
      <div><span className="badge bg-secondary" style={{padding:5,width:200,borderRadius:20,fontSize:20,marginRight:390}}>Welcome {logged}</span>
      <button onClick={handleLogout} style={{ marginTop: '10px',backgroundColor:"#6C757D",fontWeight:"bolder",color:"white",borderRadius:20,borderStyle:"none",padding:4,paddingLeft:10,paddingRight:10}}>
        Log Out
      </button>
      </div>
      <ListViewer />
    </div>
  );
}

export default Home;
