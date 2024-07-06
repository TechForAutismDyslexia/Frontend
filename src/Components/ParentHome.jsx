import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ParentHome.css';
import axios from 'axios';
import Loader from './Loader.jsx';

export default function ParentHome() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childFeedback, setChildFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [c,setC] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/parent/children', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`,
          },
        });
        if(response.data.length===0){
          setC(false);
        }
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children:', error);
      }
    };

    fetchChildren();
  }, []);

  const handleClick = (child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
    sessionStorage.setItem('childId', child._id);
    fetchChildFeedback(child._id);
  };

  const fetchChildFeedback = async (childId) => {
    try {
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/feedback/${childId}`, {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`,
        },
      });
      setChildFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
    sessionStorage.removeItem('childId');
    setChildFeedback(null);
  };

  return (
    <div className="parent-container container">
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="my-4">Parent</h1>
        <div className=''>
          <button className="btn  m-1 fw-bold"  style={{backgroundColor:"#16a085"}} onClick={() => navigate('/parentdashboard/childregister')}>Add Child</button>
        </div>
      </div>
      <div>
        <section className="card-container">
          {!c || children.length  && <Loader />}
          {children.map((child, index) => (
            <div key={index} className="card rounded-5" onClick={() => handleClick(child)}>
              <div className="card-body">
                <h3 className="card-title">{child.name}</h3>
                <p className="card-text"><strong>Age :</strong> {child.age}</p>
                <p className="card-text"><strong>Parent Details :</strong> {child.parentDetails}</p>
                <p className="card-text"><strong>Caretaker Name :</strong> {child.caretakerName}</p>
                <p className="card-text"><strong>Doctor Name :</strong> {child.doctorName}</p>

              </div>
            </div>
          ))}
        </section>
      </div>

      {selectedChild && (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="childModalLabel" aria-hidden={!isModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">{selectedChild.name}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Age :</strong> {selectedChild.age}</p>
                <p><strong>Parent Details :</strong> {selectedChild.parentDetails}</p>
                <p><strong>Caretaker Name :</strong> {selectedChild.caretakerName}</p>
                <p><strong>Doctor Name :</strong> {selectedChild.doctorName}</p>
                <p><strong>Center Id :</strong> {selectedChild.centreId}</p>
                <p><strong>Games Completed :</strong> {selectedChild.gamesCompleted}</p>
                <p><strong>Admin Status :</strong> {selectedChild.adminStatus ? 'true' : 'false'}</p>
                {childFeedback && (
                  <div>
                    <h5 className="mt-4">Feedback:</h5>
                    <ul className="list-unstyled">
                      {childFeedback.feedback.map((fb, index) => (
                        <li key={index}>{fb}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
