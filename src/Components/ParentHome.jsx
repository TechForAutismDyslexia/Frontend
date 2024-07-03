import React, { useEffect, useState } from 'react';
import './ParentHome.css';
import Profile from './images/profile.png';
import axios from 'axios';
import Loader from './Loader.jsx';
import { Link } from 'react-router-dom';

export default function ParentHome() {
  const [responses, setResponses] = useState('');

  const b = async () => {
    const response = await axios.get('https://jwlgamesbackend.vercel.app/api/parent/children', {
      headers: {
        Authorization: `${sessionStorage.getItem('logintoken')}`,
      },
    });
    setResponses(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    b();
  }, []);

  const handleClick = (response) => {
    sessionStorage.setItem('childId', response._id);
  };

  return (
    <div>
      <div className="parent-container container">
        <section className="navigation my-4 text-center">
          <h2>Welcome to the Parent Portal</h2>
        </section>
        <div>
          <section className="card-container">
            {!responses && <Loader />}
            {responses &&
              responses.map((response, index) => (
                <Link
                  key={index}
                  to="/parentdashboard/details"
                  className="btn"
                  onClick={() => handleClick(response)}
                >
                  <div className="card">
                    <div className="d-flex justify-content-center p-3">
                      <img src={Profile} className="img-fluid profile" alt="Profile"></img>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title"><strong>{response.name}</strong></h3>
                      <p>
                        <strong>Age : </strong>
                        {response.age}
                      </p>
                      <p>
                        <strong>Parent Details : </strong>
                        {response.parentDetails}
                      </p>
                      <p>
                        <strong>Caretaker Name : </strong>
                        {response.caretakerName}
                      </p>
                      <p>
                        <strong>Doctor Name : </strong>
                        {response.doctorName}
                      </p>
                      <p>
                        <strong>Center Id : </strong>
                        {response.centreId}
                      </p>
                      <p>
                        <strong>Games Completed : </strong>
                        {response.gamesCompleted}
                      </p>
                      <p>
                        <strong>Admin Status : </strong>
                        {response.adminStatus ? 'true' : 'false'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
