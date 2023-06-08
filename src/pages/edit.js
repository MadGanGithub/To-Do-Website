import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { app } from '../config/firebase.js';
import { useParams} from 'react-router-dom';

const Edit = () => {
    const{id}=useParams()
    const[data,setData]=useState(null)
    const database = getDatabase(app);
    const nodeRef = ref(database, `users/${id}`);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");

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
            console.log('Data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });
    }catch(error){
        console.log(error)
    }
    }


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
  )
}

export default Edit
