import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
export default function Caretaker() {
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
  };
  const navigate = useNavigate();
  const gotoGames = () => {
    navigate('/games');
    sessionStorage.setItem('childId', childDetails._id);
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
                {/* <p className="card-text">Centre ID: {item.centreId}</p> */}
                {/* <p className="card-text">Doctor: {item.doctorName}</p> */}
                {/* <p className="card-text">Caretaker: {item.caretakerName}</p> */}
                {/* <p className="card-text">Games Completed: {item.gamesCompleted.join(', ')}</p> */}
                {/* <p className="card-text">Parent Details: {item.parentDetails}</p> */}
                {/* <p className="card-text">Admin Status: {item.adminStatus ? 'Yes' : 'No'}</p> */}
                {/* <div className='display d-flex justify-content-around'>
                  <button type="button" className="btn btn-primary">Games</button>
                  <Link to='/reports'><button type="button" className="btn btn-danger">Reports</button></Link>
                </div> */}
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
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Age: {childDetails.age}</p>
                <p>Doctor: {childDetails.doctorName}</p>
                <p>Caretaker: {childDetails.caretakerName}</p>
                <p>Parent: {childDetails.parentDetails}</p>
                <p>Games Completed:</p>
                <ul>
                  {childDetails.gamesCompleted.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={gotoGames}>Games</button>
                <button type="button" className="btn btn-primary">Reports</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show" onClick={closeModal}></div>}
    </div>
  );
}

