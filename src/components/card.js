import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { app } from '../config/firebase.js';


const Card = ({id,title,description,date}) => {
      const navigate=useNavigate()
      const [data, setData] = useState(null);
      const database = getDatabase(app);
      

      const handleEdit=()=>{
        navigate(`/edit/${id}`)
    }

    const handleDelete=(id_delete)=>{
        const nodeRef = ref(database, `users/${id_delete}`);

        remove(nodeRef)
        .then(() => {
        console.log('Data deleted successfully');
        })
        .catch((error) => {
        console.error('Error deleting data:', error);
        });

    }

      useEffect(() => {
        const dataRef = ref(database, 'users');
    
        const fetchData = () => {
          onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            setData(data);
            console.log('Data retrieved from the database:', data);
          }, (error) => {
            console.error('Error reading data:', error);
          });
        };
    
        fetchData();
      }, []);


  return (
    <div style={{paddingTop:100}}>
      <div className="card sm" style={{borderRadius:20,backgroundColor:"#303030"}}>
        <div className="card-body" style={{color:"white"}}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text"> {description}</p>
          <p className="card-text"> {date}</p>
          <a onClick={handleEdit} className="btn">Edit</a>
          <br></br>
          <a onClick={() => handleDelete(id)} className="btn">Delete</a>
        </div>
</div>
<br></br>

    </div>
  )
}

export default Card
