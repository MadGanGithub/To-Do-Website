import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { app } from '../config/firebase.js';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({id,title,description,date,status}) => {
      const navigate=useNavigate()
      const [data, setData] = useState(null);
      const database = getDatabase(app);
      const nodeRef = ref(database, `users/${id}`);

      const handleEdit=()=>{
        navigate(`/edit/${id}`)
    }

    const handleDelete=(id_delete)=>{
        const nodeRef = ref(database, `users/${id_delete}`);

        remove(nodeRef)
        .then(() => {
        toast.success('Task deleted successfully');
        })
        .catch((error) => {
        console.error('Error deleting data:', error);
        });

    }

    const handleCheck = (event) => {
        const checked = event.target.checked;
    
        try {
          const updatedData = {
            status: checked,
          };
    
          update(nodeRef, updatedData)
            .then(() => {
              console.log('Updated Status Successfully');
            })
            .catch((error) => {
              console.log(error)
            });
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        const dataRef = ref(database, 'users');
    
        const fetchData = () => {
          onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
          }, (error) => {
            console.error('Error reading data:', error);
          });
        };
    
        fetchData();
      }, []);


  return (
    <div style={{paddingTop:20}}>

<ul class="list-group">
  <li class="list-group-item" style={{backgroundColor:'#9ACD32'}}>
    <div class="card" style={{ borderStyle: 'dashed', borderColor: "#9ACD32", borderWidth: 2, padding: 10,paddingBottom:20,marginBottom:0,marginTop:0}}>
      <div class="card-body">
        <div >
          <h3 class="card-title">{title}</h3>
          <p class="card-text">Description: {description}</p>
          <p class="card-text">Due Date: {date}</p>
        </div>
        <div>
        <div style={{ display: 'flex', alignItems: 'center',marginBottom:10 }}>
          <div style={{ marginRight: '10px' }}>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={status} onChange={handleCheck} style={{backgroundColor:'grey'}} />
          </div>
          <label class="form-check-label" for="flexCheckDefault">
            Status
          </label>
        </div>
          <a onClick={handleEdit} class="btn" style={{ backgroundColor: "#9ACD32", borderRadius: 10,padding:5,color:'white',paddingRight:5 }}><EditOutlinedIcon/></a>
          <a onClick={() => handleDelete(id)} class="btn" style={{ backgroundColor: "#E70127", borderRadius: 10,padding:5,color:'white'}}><DeleteOutlinedIcon/></a>
        </div>
      </div>
    </div>
  </li>
</ul>



    </div>
  )
}

export default Card
