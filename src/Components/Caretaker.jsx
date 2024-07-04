import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Caretaker() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('logintoken');
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/caretaker/assigned', {
          headers: {
            Authorization: `${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleGames = () => {
    navigate('/caretakerdashboard/games');
  }

  return (
    <div className="container mt-4">
      <div className="row">
      {!data && <Loader />}
        {data.map((item) => (
          <div key={item._id} className="col-md-4 mb-4 br-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Age: {item.age}</p>
                {/* <p className="card-text">Centre ID: {item.centreId}</p> */}
                {/* <p className="card-text">Doctor: {item.doctorName}</p> */}
                {/* <p className="card-text">Caretaker: {item.caretakerName}</p> */}
                {/* <p className="card-text">Games Completed: {item.gamesCompleted.join(', ')}</p> */}
                {/* <p className="card-text">Parent Details: {item.parentDetails}</p> */}
                {/* <p className="card-text">Admin Status: {item.adminStatus ? 'Yes' : 'No'}</p> */}
                <button className='btn btn-primary' onClick={handleGames}>Games</button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
