import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Admin() {
  const [children, setChildren] = useState([]);
  const [verified, setVerified] = useState([]);
  const [pending, setPending] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allchildren', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`
          }
        });
        const allChildren = response.data;
        console.log(allChildren);
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

  const handleCardClick = (child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
  };

  return (
    <div className="container">
      <h1 className="my-4">Admin</h1>
      <h2>Verified Users</h2>
      {verified.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="row">
          {verified.map(child => (
            <div className="col-md-3 mb-4" key={child._id}>
              <div className="card h-100" onClick={() => handleCardClick(child)}>
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
              <div className="card h-100" onClick={() => handleCardClick(child)}>
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

      {selectedChild && (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="childModalLabel" aria-hidden={!isModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">{selectedChild.name}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Age: {selectedChild.age}</p>
                <p>Doctor: {selectedChild.doctorName}</p>
                <p>Caretaker: {selectedChild.caretakerName}</p>
                <p>Parent: {selectedChild.parentDetails}</p>
                <p>Games Completed:</p>
                <ul>
                  {selectedChild.gamesCompleted.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
}
