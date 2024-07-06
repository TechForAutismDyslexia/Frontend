import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

export default function Doctor() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [childFeedback, setChildFeedback] = useState(null);
  const [childGames, setChildGames] = useState([]);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getChildren = async () => {
      try {
        const res = await axios.get('https://jwlgamesbackend.vercel.app/api/doctor/assigned', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`
          }
        });
        setChildren(res.data);
      } catch (error) {
        console.error('Error fetching children:', error);
      }
    };

    getChildren();

    const fetchAllGames = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allgames');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchAllGames();
  }, []);

  const handleCardClick = async (child) => {
    setSelectedChild(child);
    setIsModalOpen(true);

    try {
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/admin/gametable/${child._id}`, {
        headers: { Authorization: `${sessionStorage.getItem('logintoken')}` },
      });
      setChildGames(response.data);
    } catch (error) {
      console.error('Error fetching child games:', error);
      setChildGames([]);
    }

    // try {
    //   const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/feedback/${child._id}`, {
    //     headers: {
    //       Authorization: `${sessionStorage.getItem('logintoken')}`
    //     }
    //   });
    //   setChildFeedback(response.data);
    // } catch (error) {
    //   console.error('Error fetching feedback:', error);
    // }
  };

  const handleSubmitFeedback = async () => {
    try {
      console.log(selectedChild._id);
      const response = await axios.put(`https://jwlgamesbackend.vercel.app/api/data/feedback/${selectedChild._id}`, {
        feedback: feedback
      }, {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`
        }
      });
      setChildFeedback(response.data);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  const handleReports = async()=>{
    sessionStorage.setItem('childId', selectedChild._id);
    navigate('/reports');
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
    setChildFeedback(null);
    setChildGames([]);
    sessionStorage.removeItem('childId');
  };

  return (
    <div>
      <div className="parent-container container">
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className="my-4">Doctor</h1>
        </div>
        <div>
          <section className="my-4 row justify-content-center">
            {!children.length ? (
              <Loader />
            ) : (
              children.map((child, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center">
                  <div className="card h-100" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(child)}>
                    <div className="card-body">
                      <h5 className="card-title">{child.name}</h5>
                      <p className="card-text">Age: {child.age}</p>
                      <p className="card-text">Parent Details: {child.parentDetails}</p>
                      <p className="card-text">Caretaker: {child.caretakerName}</p>
                      <p className="card-text">Center ID: {child.centreId}</p>
                      <p className="card-text">Games Completed: {child.gamesCompleted}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </div>

      {selectedChild && (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="childModalLabel" aria-hidden={!isModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p><strong>Age:</strong> {selectedChild.age}</p>
                <p><strong>Parent Details:</strong> {selectedChild.parentDetails}</p>
                <p><strong>Caretaker:</strong> {selectedChild.caretakerName}</p>
                <p><strong>Doctor:</strong> {selectedChild.doctorName}</p>
                <p><strong>Center ID:</strong> {selectedChild.centreId}</p>
                <p><strong>Games Completed:</strong></p>
                <ul>
                  {selectedChild.gamesCompleted.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul>
                <p><strong>Game Table:</strong></p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Game ID</th>
                      <th>Game Name</th>
                      <th>Tries</th>
                      <th>Timer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {childGames.map((game) => (
                      <tr key={game._id}>
                        <td>{game.gameId}</td>
                        <td>{games.find(g => g.gameId === game.gameId)?.gamename || 'Unknown Game'}</td>
                        <td>{game.tries}</td>
                        <td>{game.timer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {childFeedback && (
                  <div>
                    <h5>Feedback:</h5>
                    <ul>
                      {childFeedback.feedback.map((fb, index) => (
                        <li key={index}>{fb}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-3">
                  
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleReports}>Reports</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
}
