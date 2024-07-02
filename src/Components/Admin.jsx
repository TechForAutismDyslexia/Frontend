import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Admin() {
  const [children, setChildren] = useState([]);
  const [verified, setVerified] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allchildren', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`
          }
        });
        const allChildren = response.data;
        setChildren(allChildren);

        const verifiedChildren = allChildren.filter(child => child.adminStatus === true);
        const pendingChildren = allChildren.filter(child => child.adminStatus === false);

        setVerified(verifiedChildren);
        setPending(pendingChildren);
      } catch (error) {
        console.error('Error fetching children:', error);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Admin</h1>
      <h2>Verified Users</h2>
      {verified.length === 0 ? (
        <p>No verified users.</p>
      ) : (
        <div className="row">
          {verified.map(child => (
            <div className="col-md-3 mb-4" key={child._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{child.name}</h5>
                  <p className="card-text">Age: {child.age}</p>
                  <p className="card-text">Doctor: {child.doctorName}</p>
                  <p className="card-text">Caretaker: {child.caretakerName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2>Pending Users</h2>
      {pending.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <div className="row">
          {pending.map(child => (
            <div className="col-md-3 mb-4" key={child._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{child.name}</h5>
                  <p className="card-text">Age: {child.age}</p>
                  <p className="card-text">Doctor: {child.doctorName}</p>
                  <p className="card-text">Caretaker: {child.caretakerName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
