import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Caretaker() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
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

  return (
    <div className="container mt-4">
      <div className="row">
        {data.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Age: {item.age}</p>
                <p className="card-text">Centre ID: {item.centreId}</p>
                <p className="card-text">Doctor: {item.doctorName}</p>
                <p className="card-text">Caretaker: {item.caretakerName}</p>
                <p className="card-text">Games Completed: {item.gamesCompleted.join(', ')}</p>
                <p className="card-text">Parent Details: {item.parentDetails}</p>
                <p className="card-text">Admin Status: {item.adminStatus ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
