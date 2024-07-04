import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Admingamedetailsftech() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allgames');
        setGames(response.data);
      } catch (e) {
        console.log('Data not fetched');
      }
    };
    fetchAllGames();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedGameId(e.target.value);
  };

  const handleGetDetails = async () => {
    try {
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/admin/gamedetails/${selectedGameId}`, {
        headers: { Authorization: `${sessionStorage.getItem('logintoken')}` },
      });
      setChildren(response.data);
    } catch (e) {
      console.log('Failed to fetch game details');
    }
  };

  const handleCardClick = (child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="text-center mb-4">Admin Game Details Fetch</h1>
        <div className=''>
          <button className="btn m-1 fw-bold" style={{ backgroundColor: "rgb(100, 150, 200)" }} onClick={() => window.location.href = '/adminportal/register'}>Add Parent</button>
          <button className="btn m-1 fw-bold" style={{ backgroundColor: "rgb(100, 150, 200)" }} onClick={() => window.location.href = '/adminportal/admindashboard/adminregister'}>Add Doctor/Caretaker</button>
          <button className="btn m-1 fw-bold" style={{ backgroundColor: "#16a085" }} onClick={() => window.location.href = '/adminportal/admindashboard/admingamedetailsftech'}>Game Details</button>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="gameSelect" className="col-sm-2 col-form-label">Select Game: </label>
        <div className="col-sm-10">
          <select id="gameSelect" className="form-control" onChange={handleSelectChange}>
            <option value="">--Select a game--</option>
            {games.map((game) => (
              <option key={game._id} value={game.gameId}>
                {game.gamename}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleGetDetails}>Get</button>
      </div>
      <div className="mt-4">
        <h2>Game Details</h2>
        {children.length > 0 ? (
          <div className="row">
            {children.map((child) => (
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
        ) : (
          <p>No game details to display</p>
        )}
      </div>

      {selectedChild && (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="childModalLabel" aria-hidden={!isModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">{selectedChild.name}</h5>
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
