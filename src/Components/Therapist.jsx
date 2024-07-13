import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
export default function Therapist() {
  const [data, setData] = useState([]);
  const [childDetails, setChildDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('logintoken');
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/caretaker/assigned', {
          headers: {
            Authorization: `${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
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


  return (
    <div className="container mt-4">
      <div className="row">
        {data.length === 0 && <Loader />}
        {data.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(item)}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Age: {item.age}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {childDetails && (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="childModalLabel" aria-hidden={!isModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">{childDetails.name}</h5>
                <button type="button" className="btn close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Age:</strong> {childDetails.age}</p>
                <p><strong>Doctor:</strong> {childDetails.doctorName}</p>
                <p><strong>Therapist:</strong> {childDetails.caretakerName}</p>
                <p><strong>Parent:</strong> {childDetails.parentDetails}</p>
                {/* <p>Games Completed:</p>
                <ul>
                  {childDetails.gamesCompleted.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={gotoGames}>Play Games</button>
                <button type="button" className="btn btn-primary" onClick={gotoReports}>Reports</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show" onClick={closeModal}></div>}
    </div>
  );
}

