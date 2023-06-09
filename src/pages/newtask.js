import React, {useEffect, useState } from 'react';
import {app} from "../config/firebase.js"
import { getDatabase, ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {auth} from "../config/firebase.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function writeUserData(userId,title,description,duedate,currentTime,status) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId+currentTime), {
      id:userId+currentTime,
      title:title,
      description:description,
      duedate:duedate,
      status:status
    });
  }

const Newtask = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [logged,setLogged]=useState(null)
  const currentTime = new Date().getTime();
  const[status,setStatus]=useState(false)

  const navigate=useNavigate()
  const database = getDatabase(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged in")
        setLogged(user)
      } else {
        navigate("/signin")
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log(dueDate);
    writeUserData(logged.uid,title,description,dueDate,currentTime,status)
    
    setTitle('');
    setDueDate('');
    setDescription('');
    toast.success("Task created successfully")
    navigate("/")

  } catch (error) {
    console.log(error);
  }
};


  return (
              <div className="container" style={{marginLeft:"20%",marginTop:120,borderRadius:100}}>
              <div className="card shadow" style={{textAlign:"center",width:400}}>
              <div className="card-body" style={{width:400}}>
               <h5 className="card-title">New Task</h5>
              
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
                  <button type="submit" className="btn" style={{width:"100%",backgroundColor:"#9ACD32"}}>Create</button> 
                </form>
            
        
            </div>
            </div>
            </div>

    
  );
};

export default Newtask;
