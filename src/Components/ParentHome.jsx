import React, { useEffect, useState } from 'react';
import './ParentHome.css';
import Profile from './images/profile.png';
import axios from 'axios';
import Loader from './Loader.jsx';

export default function ParentHome() {

  const [responses, setResponses] = useState('')

  const b = async () => {

    const response = await axios.get('https://jwlgamesbackend.vercel.app/api/parent/children',
      {
        headers: {
          'Authorization': `${localStorage.getItem('logintoken')}`
        }
      }
    )
    setResponses(response.data)
    console.log(response.data)
  }


  useEffect(() => {
    b();
  }, [])

  return (
    <div>
      <div className="parent-container container">
        <section className="navigation my-4 text-center">
          <h2>Welcome to the Parent Portal</h2>
        </section>
        <div>
          <section className="my-4 row justify-content-center">
            {!responses && <Loader />}
            {responses && responses.map((response, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center" style={{fontSize:'20px'}}>
                <div className="d-flex justify-content-center p-3">
                  <img src={Profile} className='img-fluid profile' alt="Profile"></img>
                </div>
                <h3><strong>Name : </strong>{response.name}</h3>
                <p><strong>Age : </strong>{response.age}</p>
                <p><strong>Parent Details : </strong>{response.parentDetails}</p>
                <p><strong>Caretaker Name : </strong>{response.caretakerName}</p>
                <p><strong>Doctor Name : </strong>{response.doctorName}</p>
                <p><strong>Center Id : </strong>{response.centreId}</p>
                <p><strong>Games Completed : </strong>{response.gamesCompleted}</p>
                <p><strong>Admin Status : </strong>{response.adminStatus ? "true" : "false"}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
