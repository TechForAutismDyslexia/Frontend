import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';


export default function IEPTherapist() {
  const [responses, setResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGoalData, setCurrentGoalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [performanceInputs, setPerformanceInputs] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`,
          {headers: {Authorization: `${sessionStorage.getItem("logintoken")}`}}
        );
        setResponses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleModalOpen = (goalData, responseIndex, monthIndex) => {
    setCurrentGoalData({ ...goalData, responseIndex, monthIndex });
    setCurrentMonth(goalData.month);
    setPerformanceInputs(
      goalData.performance && goalData.performance.length
        ? [...goalData.performance]
        : goalData.goals.map(() => '')
    );
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentGoalData(null);
    setPerformanceInputs([]);
  };

  const handlePerformanceChange = (goalIndex, value) => {
    setPerformanceInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[goalIndex] = value;
      return updatedInputs;
    });
  };

  const handleSavePerformance = async () => {
    if (!performanceInputs.length) return;

    try {
      const childId = sessionStorage.getItem("childId");
      await axios.put(
        `http://localhost:4000/api/doctor/updateperformance/${childId}`,
        {
          performance: performanceInputs,
          month: currentMonth,
        },
        {headers: {Authorization: `${sessionStorage.getItem("logintoken")}`}}
      );

      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        const { responseIndex, monthIndex } = currentGoalData;
        updatedResponses[responseIndex].monthlyGoals[monthIndex].performance =
          [...performanceInputs];
        return updatedResponses;
      });

      alert('Performance updated successfully!');
    } catch (error) {
      console.error("Error updating performance:", error);
    } finally {
      handleModalClose();
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">IEP Progress Tracking</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {responses.map((response, responseIndex) =>
            response.monthlyGoals.map((goalData, monthIndex) => (
              <div className="col" key={`${responseIndex}-${monthIndex}`}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{goalData.month}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleModalOpen(goalData, responseIndex, monthIndex)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && currentGoalData && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">IEP Details - {currentGoalData.month}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Targets:</h6>
                <ul>
                  <li>{currentGoalData.target}</li>
                </ul>

                <h6>Goals:</h6>
                <ul>
                  {currentGoalData.goals.map((goal, goalIndex) => (
                    <li key={goalIndex}>
                      {goal}
                      <div className="mt-2">
                        <input
                          type="number"
                          className="form-control"
                          value={performanceInputs[goalIndex] || ''}
                          onChange={(e) =>
                            handlePerformanceChange(goalIndex, e.target.value)
                          }
                          placeholder="Enter performance (0-100 %)"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSavePerformance}
                >
                  Save Performance
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
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
