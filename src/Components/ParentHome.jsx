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
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzViODkyZjE4NGY2NDJiNDNkOGY0NyIsImlhdCI6MTcxOTU3MTE0Mn0.02N3zcaK1Ap9QlOawJaYoKIXTu2VNoi06jNBxYdiI8o'
        }
      }
    )
    setResponses(response.data)
    console.log(response.data[0])
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
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center">
                <div className="d-flex justify-content-center p-3">
                  <img src={Profile} className='img-fluid profile' alt="Profile"></img>
                </div>
                <h3>Name : {response.name}</h3>
                <p>Age : {response.age}</p>
                <p>Parent Details : {response.parentDetails}</p>
                <p>Caretaker Id : {response.caretakerId}</p>
                <p>Doctor Id : {response.doctorId}</p>
                <p>Center Id : {response.centreId}</p>
                <p>Games Completed : {response.gamesCompleted}</p>
                <p>Admin Status : {response.adminStatus ? "true" : "false"}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
