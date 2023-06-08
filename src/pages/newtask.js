import React, { useContext, useState } from 'react';
import {app} from "../config/firebase.js"
import { getDatabase, ref, push, set } from 'firebase/database';
import { LogContext } from '../components/logcontext.js';
import { useNavigate } from 'react-router-dom';

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
  const {logged,setLogged}=useContext(LogContext)
  const currentTime = new Date().getTime();
  const[status,setStatus]=useState(false)

  const navigate=useNavigate()
  const database = getDatabase(app);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log(dueDate);
    writeUserData(logged.uid,title,description,dueDate,currentTime,status)
    
    // Reset form fields
    setTitle('');
    setDueDate('');
    setDescription('');
    alert("User created successfully")
    navigate("/")

  } catch (error) {
    console.log(error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Newtask;
