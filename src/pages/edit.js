import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { app } from '../config/firebase.js';
import { useNavigate, useParams} from 'react-router-dom';
import {auth } from "../config/firebase.js"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const{id}=useParams()
    const[data,setData]=useState(null)
    const database = getDatabase(app);
    const nodeRef = ref(database, `users/${id}`);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const navigate=useNavigate()

    useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          console.log("Logged in")
        } else {
          // User is signed out
          navigate("/signin")
        }
      });
      return () => {
        unsubscribe();
      };
    }, []);

    const handleSubmit=(event)=>{
        event.preventDefault()

        try{
        // Define the updated data
        const updatedData = {
            title: title,
            description: description,
            duedate:dueDate
        };

        update(nodeRef, updatedData)
        .then(() => {
            toast.success('Task updated successfully');
            navigate('/')
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });
    }catch(error){
        console.log(error)
    }
    }


  return (
    <div className="container" style={{marginLeft:"20%",marginTop:120,borderRadius:100}}>
    <div className="card shadow" style={{textAlign:"center",width:400}}>
    <div className="card-body" style={{width:400}}>
     <h5 className="card-title">Edit Task</h5>
    
     <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Title:</div>
          <input className="form-control" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <br></br>
        <div className="input-group">
          <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Due Date:</div>
          <input className="form-control" type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
        </div>
        <br></br>
        <div class="input-group">
        <div className="input-group-text" style={{backgroundColor:"#9ACD32"}}>Description:</div>
          <textarea class="form-control" aria-label="Textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <br></br>
        <button type="submit" className="btn" style={{width:"100%",backgroundColor:"#9ACD32"}}>Edit</button> 
      </form>
  

  </div>
  </div>
  </div>  )
}

export default Edit
