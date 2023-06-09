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
        setData(data);
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
<div className="radio-buttons" style={{marginLeft:10}}>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      value="ongoing"
      checked={selectedOption === 'ongoing'}
      onChange={handleOptionChange}
      id="ongoingRadio"
      style={{ backgroundColor: '#9ACD32', color: 'white' }}
    />
    <label className="form-check-label" htmlFor="ongoingRadio">
      On-Going
    </label>
  </div>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      value="completed"
      checked={selectedOption === 'completed'}
      onChange={handleOptionChange}
      id="completedRadio"
      style={{ backgroundColor: '#9ACD32', color: 'white' }}
    />
    <label className="form-check-label" htmlFor="completedRadio">
      Completed
    </label>
  </div>
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
