import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
export default function Therapist() {
  const [data, setData] = useState([]);
  const [childDetails, setChildDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('logintoken');
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/caretaker/assigned', {
          headers: {
            Authorization: `${token}`
          }
        });
        if (response.data.length === 0) {
          setResponseText('No Children Assigned');
          setLoading(false);
          return;
        }
        setResponseText('');
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCardClick = (child) => {
    setIsModalOpen(true);
    setChildDetails(child);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setChildDetails(null);
    localStorage.removeItem('childId');
    sessionStorage.removeItem('childId');
  };
  const navigate = useNavigate();
  const gotoGames = () => {
    sessionStorage.setItem('childId', childDetails._id);
    localStorage.setItem('childId', childDetails._id);
    navigate('/games');
  }
  const gotoReports = () => {
    sessionStorage.setItem('childId', childDetails._id);
    navigate('/reports');
  }
  const gotoIEP = () => {
    sessionStorage.setItem('childId', childDetails._id);
    localStorage.setItem('childId', childDetails._id);
    navigate('/caretakerdashboard/IEP');
  }


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
      <h1 className="text-center flex-grow-1">Therapist Dashboard</h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
      </svg>
    </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : responseText ? (
        <h3 className="text-center text-muted">{responseText}</h3>
      ) : null}
      <div className="row">
        {data.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-sm"
              onClick={() => handleCardClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">Age: {item.age}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {childDetails && (
        <div
          className={`modal fade ${isModalOpen ? 'show' : ''}`}
          style={{ display: isModalOpen ? 'block' : 'none' }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="childModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">
                  {childDetails.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Age:</strong> {childDetails.age}
                </p>
                <p>
                  <strong>Doctor:</strong> {childDetails.doctorName}
                </p>
                <p>
                  <strong>Therapist:</strong> {childDetails.caretakerName}
                </p>
                <p>
                  <strong>Parent:</strong> {childDetails.parentDetails}
                </p>
              </div>
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={gotoIEP}>
                  IEP
                </button>
                <button type="button" className="btn btn-success" onClick={gotoGames}>
                  Play Games
                </button>
                <button type="button" className="btn btn-primary" onClick={gotoReports}>
                  Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal-backdrop fade show"
          onClick={closeModal}
        ></div>
      )}
    </div>
  );
}

