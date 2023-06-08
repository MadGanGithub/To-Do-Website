import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../config/firebase.js';
import { useNavigate } from 'react-router-dom';
import Card from './card.js';

const ListViewer = () => {
  const [data, setData] = useState(null);
  const database = getDatabase(app);
  const navigate=useNavigate()


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
    <div>
      {data &&
        Object.entries(data).map(([key, item]) => (
          <div key={key}>
            <Card id={item.id} title={item.title} description={item.description} date={item.duedate}/>
          </div>
        ))}
    </div>
  );
};

export default ListViewer;
