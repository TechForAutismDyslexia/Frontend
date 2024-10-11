import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

export default function Progress() {
  const [responses, setResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState('');
  const [therapistName, setTherapistName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`);
        setResponses(response.data);
        setTherapistName(sessionStorage.getItem("therapistName"));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e, targetIndex, goalIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (name === 'therapy') {
        updatedData.therapy = value;
      } 
      else if (name === 'feedback') {
        updatedData.feedback = value;
      } else if (targetIndex !== undefined && goalIndex === undefined) {
        updatedData.targets[targetIndex].target = value;
      } else if (targetIndex !== undefined && goalIndex !== undefined) {
        updatedData.targets[targetIndex].goal[goalIndex] = value;
      }
      return updatedData;
    });
  };

  const handleModalOpen = (response) => {
    setFormData(
      response || {
        therapy: '',
        therapistName: therapistName,
        feedback: '',
        targets: [{ target: '', goal: [''] }],
        iepId : null,
      }
    );
    if(response) {
      setFormData((prevData) => ({
        ...prevData,
        iepId: response._id,
      }));
      setSubmitText('Update Progress');
    } 
    else {
      setSubmitText('Assign');
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(`http://localhost:4000/api/doctor/assignIEP/${localStorage.getItem("childId")}`, formData);

      setShowModal(false);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addTarget = () => {
    setFormData((prevData) => ({
      ...prevData,
      targets: [
        ...prevData.targets,
        { target: '', goal: [''] }
      ]
    }));
  };

  const removeTarget = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      targets: prevData.targets.filter((_, i) => i !== index)
    }));
  };

  const addGoal = (targetIndex) => {
    setFormData((prevData) => {
      const updatedTargets = [...prevData.targets];
      updatedTargets[targetIndex].goal.push('');
      return { ...prevData, targets: updatedTargets };
    });
  };

  const removeGoal = (targetIndex, goalIndex) => {
    setFormData((prevData) => {
      const updatedTargets = [...prevData.targets];
      updatedTargets[targetIndex].goal = updatedTargets[targetIndex].goal.filter((_, i) => i !== goalIndex);
      return { ...prevData, targets: updatedTargets };
    });
  };

  return (
    <div className="container py-4">
      <div className='mb-4 d-flex justify-content-between'>
        <div className=''>
          <h1 className="">Individual Education Plan (IEP)</h1>
        </div>
        <button type='button' className='btn btn-success' onClick={() => handleModalOpen(null)}>Assign IEP</button>
      </div>
      {loading ? <Loader /> : (
        responses.length === 0 ? <h3>No IEPs assigned</h3> :
        <div className="row g-4">
          {responses.map((response, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" onClick={() => handleModalOpen(response)}>
                <div className="card-body">
                  <h5 className="card-title">IEP {index + 1}</h5>
                  <ul className='d-flex justify-content-around'>
                    {response.months.map((month, idx) => (
                      <li key={idx}>{month}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary" onClick={() => handleModalOpen(response)}>
                    Edit
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
                <h5 className="modal-title">IEP Progress Form</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Therapy Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="therapy"
                      value={formData.therapy}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Enter therapy type"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Therapist Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="therapistName"
                      value={therapistName}
                      disabled
                    />
                  </div>
                  {/* <div className='mb-3'>
                    <label className="form-label">Starting Month</label>
                    <select className="form-select" name="startingMonth" value={formData.startingMonth} onChange={(e) => handleInputChange(e)}>
                      <option value="">Select month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div> */}

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label className="form-label mb-0">Targets and Goals</label>
                    </div>

                    {formData.targets.map((target, targetIndex) => (
                      <div key={targetIndex} className="card mb-3">
                        <div className="card-body">
                          <label className='mb-3'>Target {targetIndex + 1}</label>
                          <div className="mb-3 d-flex gap-2">
                            <input
                              type="text"
                              className="form-control"
                              name="target"
                              value={target.target}
                              onChange={(e) => handleInputChange(e, targetIndex)}
                              placeholder="Enter target"
                            />
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeTarget(targetIndex)}
                            >
                              ×
                            </button>
                          </div>
                          <div className="ms-3">
                            {target.goal.map((goal, goalIndex) => (
                              <div>
                                <label className='mb-2'>Goal {goalIndex + 1}</label>
                                <div key={goalIndex} className="d-flex gap-2 mb-2">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="goal"
                                    value={goal}
                                    onChange={(e) => handleInputChange(e, targetIndex, goalIndex)}
                                    placeholder="Enter goal"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => removeGoal(targetIndex, goalIndex)}
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => addGoal(targetIndex)}
                            >
                              + Add Goal
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mb-3"
                    onClick={addTarget}
                  >
                    + Add Target
                  </button>
                  <div className="mb-3">
                    <label className="form-label">Feedback</label>
                    <textarea
                      className="form-control"
                      name="feedback"
                      value={formData.feedback}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Enter feedback"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleModalClose}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {submitText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
