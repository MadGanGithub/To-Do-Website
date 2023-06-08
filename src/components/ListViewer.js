import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../config/firebase.js';
import { useNavigate } from 'react-router-dom';
import Card from './card.js';

const ListViewer = () => {
  const [data, setData] = useState(null);
  const database = getDatabase(app);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('ongoing');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const dataRef = ref(database, 'users');

    const fetchData = () => {
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setData(data);
        console.log('Data retrieved from the database:', data);
      }, (error) => {
        console.error('Error reading data:', error);
      });
    };

    fetchData();
  }, []);

  const filteredData = data && Object.entries(data).filter(([key, item]) => {
    if (selectedOption === 'ongoing' && item.status === false) {
      return true;
    }
    if (selectedOption === 'completed' && item.status === true) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="ongoing"
            checked={selectedOption === 'ongoing'}
            onChange={handleOptionChange}
          />
          On-Going
        </label>

        <label>
          <input
            type="radio"
            value="completed"
            checked={selectedOption === 'completed'}
            onChange={handleOptionChange}
          />
          Completed
        </label>
      </div>

      {filteredData && filteredData.map(([key, item]) => (
        <div key={key}>
          <Card
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.duedate}
            status={item.status}
          />
        </div>
      ))}
    </div>
  );
};

export default ListViewer;
