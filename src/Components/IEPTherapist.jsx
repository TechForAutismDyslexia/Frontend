import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

export default function IEPTherapist() {
  const [responses, setResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`);
        setResponses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleModalOpen = (response) => {
    setFormData(response);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData(null);
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">IEP Progress Tracking</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="row g-4">
          {responses.map((response, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" onClick={() => handleModalOpen(response)}>
                <div className="card-body">
                  <h5 className="card-title">IEP {index + 1}</h5>
                  <ul className="d-flex justify-content-around">
                    {response.months.map((month, idx) => (
                      <li key={idx}>{month}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary" onClick={() => handleModalOpen(response)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && formData && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">IEP Details</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Therapy Type</th>
                      <td>{formData.therapy}</td>
                    </tr>
                    <tr>
                      <th>Feedback</th>
                      <td>{formData.feedback}</td>
                    </tr>
                    <tr>
                      <th>Targets and Goals</th>
                      <td>
                        {formData.targets.map((target, targetIndex) => (
                          <div key={targetIndex} className="mb-3">
                            <strong>Target {targetIndex + 1}:</strong> {target.target}
                            <ul>
                              {target.goal.map((goal, goalIndex) => (
                                <li key={goalIndex}>{goal}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
