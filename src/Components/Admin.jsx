import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const [children, setChildren] = useState([]);
  const [verified, setVerified] = useState([]);
  const [pending, setPending] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedCaretaker, setSelectedCaretaker] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childFeedback, setChildFeedback] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allcaretakers', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`
          }
        });
        setCaretakers(response.data);
      } catch (error) {
        console.error('Error fetching caretakers:', error);
      }
    };

    fetchCaretakers();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/alldoctors', {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleCardClick = async (child) => {
    setSelectedChild(child);
    setSelectedCaretaker('');
    setSelectedDoctor('');
    setIsModalOpen(true);
    sessionStorage.setItem('childId', child._id);

    try {
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/feedback/${child._id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`
        }
      });
      setChildFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleCaretakerChange = (event) => {
    setSelectedCaretaker(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(selectedChild._id, selectedCaretaker, selectedDoctor);
      await axios.put(`https://jwlgamesbackend.vercel.app/api/admin/${selectedChild._id}/assign`, {
        caretakerId: selectedCaretaker,
        doctorId: selectedDoctor
      }, {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`
        }
      });
      useNavigate('/');
      closeModal();

      // Fetch children again to update the state
      const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allchildren', {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`
        }
      });
      setChildren(response.data);
      toast.success('Child data updated successfully!');
    } catch (error) {
      console.error('Error updating child:', error);
      toast.error('Error updating child data. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
    sessionStorage.removeItem('childId');
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="my-4">Admin</h1>
        <div className=''>
          <button className="btn  m-1 fw-bold" style={{backgroundColor:"rgb(100, 150, 200)"}} onClick={() => navigate('/register')}>Add Parent</button>
          <button className="btn  m-1 fw-bold"  style={{backgroundColor:"rgb(100, 150, 200)"}} onClick={() => navigate('/admindashboard/adminregister')}>Add Doctor/Caretaker</button>
          <button className="btn  m-1 fw-bold"  style={{backgroundColor:"#16a085"}} onClick={() => navigate('/admindashboard/admingamedetailsftech')}>Game Details</button>
        </div>
      </div>
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
              </div>
              <div className="modal-body">
                <p><strong>Age:</strong> {selectedChild.age}</p>
                <p><strong>Doctor:</strong> {selectedChild.doctorName}</p>
                <p><strong>Caretaker:</strong> {selectedChild.caretakerName}</p>
                <p><strong>Parent:</strong> {selectedChild.parentDetails}</p>
                {/* <p>Games Completed:</p>
                <ul>
                  {selectedChild.gamesCompleted.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul> */}
                {childFeedback && (
                  <div>
                    <h5><strong>Feedback</strong></h5>
                    <ul>
                      {childFeedback.feedback.map((fb, index) => (
                        <li key={index}>{fb}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="caretakerSelect"><strong>Assign Caretaker</strong></label>
                  <select id="caretakerSelect" className="form-control" value={selectedCaretaker} onChange={handleCaretakerChange}>
                    <option value="">Select Caretaker</option>
                    {caretakers.map(caretaker => (
                      <option key={caretaker._id} value={caretaker._id}>{caretaker.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="doctorSelect"><strong>Assign Doctor</strong></label>
                  <select id="doctorSelect" className="form-control" value={selectedDoctor} onChange={handleDoctorChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Save changes</button>
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
