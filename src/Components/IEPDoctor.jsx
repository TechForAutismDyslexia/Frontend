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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`,
          { headers: { Authorization: `${sessionStorage.getItem("logintoken")}` } }
      );
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

  const handleInputChange = (e, monthIndex, goalIndex,field) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (field==='goals'&&monthIndex !== undefined && goalIndex !== undefined) {
        updatedData.monthlyGoals[monthIndex].goals[goalIndex] = value;
      } else if (field==='target' && monthIndex !== undefined && goalIndex === null) {
        updatedData.monthlyGoals[monthIndex].target= value;
      } else if (name === 'therapy') {
        updatedData.therapy = value;
      } else if (name === 'startingMonth') {
        const startMonth = parseInt(value);
        updatedData.startingMonth = new Date(0, startMonth - 1).toLocaleString('default', { month: 'long' });
        updatedData.selectedMonths = [
          startMonth,
          (startMonth % 12) + 1,
          ((startMonth + 1) % 12) + 1
        ];
        updatedData.monthlyGoals = updatedData.selectedMonths.map((month) => ({
          month: new Date(0, month - 1).toLocaleString('default', { month: 'long' }),
          target: [''],
          goals: ['']
        }));
        updatedData.selectedMonthsNames = updatedData.selectedMonths.map((month) => new Date(0, month - 1).toLocaleString('default', { month: 'long' }));
      } else if (name === 'year') {
        updatedData.startingYear = value;
      } else if (name === 'feedback') {
        updatedData.feedback = value;
      }
      return updatedData;
    });
  };

  const handleModalOpen = (response, monthIndex) => {
    const isEdit = Boolean(response);
    setIsEditMode(isEdit);
    setSubmitText(isEdit ? 'Update Progress' : 'Assign');

    if (isEdit) {
      setSelectedMonth(monthIndex);
      const editData = JSON.parse(JSON.stringify(response));
      editData.iepId = response._id;
      setFormData(editData);
    } else {
      const initialSelectedMonths = [1, 2, 3];
      setFormData({
        iepId: '',
        doctorId: sessionStorage.getItem("id"),
        therapy: '',
        therapistName: therapistName,
        feedback: '',
        monthlyGoals: initialSelectedMonths.map((month) => ({
          month: new Date(0, month - 1).toLocaleString('default', { month: 'long' }),
          target: [''],
          goals: ['']
        })),
        startingYear: currentYear,
        startingMonth: 1,
        selectedMonths: initialSelectedMonths,
      });
      setSelectedMonth(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData(null);
    setShowModal(false);
    setIsEditMode(false);
    setSelectedMonth(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/doctor/assignIEP/${sessionStorage.getItem("childId")}`, formData, 
        { headers: { Authorization: `${sessionStorage.getItem("logintoken")}` } }
    );
      console.log(formData);
      setShowModal(false);
      alert('Data saved successfully');
      const response = await axios.get(`http://localhost:4000/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`,
        { headers: { Authorization: `${sessionStorage.getItem("logintoken")}` } }
    );
      setResponses(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addGoal = (monthIndex) => {
    if (isEditMode && monthIndex !== selectedMonth) return;

    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals.push('');
      return { ...prevData, monthlyGoals: updatedGoals };
    });
  };


  const removeGoal = (monthIndex, goalIndex) => {
    if (isEditMode && monthIndex !== selectedMonth) return;

    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals = updatedGoals[monthIndex].goals.filter((_, index) => index !== goalIndex);
      return { ...prevData, monthlyGoals: updatedGoals };
    });
  };


  const renderMonthlyGoals = () => {
    return (formData.selectedMonths ? formData.monthlyGoals : []).map((monthGoal, monthIndex) => {
      if (isEditMode && monthIndex !== selectedMonth) return null;

      const isDisabled = isEditMode && monthIndex !== selectedMonth;

      return (
        <div key={monthIndex} className="card mb-3">
          <div className="card-body">
            <h5 className="mb-3">{monthGoal.month}</h5>
            <h6 className="text-primary">Targets</h6>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Target`}
                  value={monthGoal.target}
                  onChange={(e) => handleInputChange(e, monthIndex,null, 'target')}
                  disabled={isDisabled}
                />
              </div>
            <h6 className="text-primary">Goals</h6>
            {monthGoal.goals.map((goal, goalIndex) => (
              <div key={goalIndex} className="d-flex align-items-center mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Goal ${goalIndex + 1}`}
                  value={goal}
                  onChange={(e) => handleInputChange(e, monthIndex, goalIndex, 'goals')}
                  disabled={isDisabled}
                />
                {!isDisabled && (
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-2 rounded-2"
                    onClick={() => removeGoal(monthIndex, goalIndex)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
      
            {!isDisabled && (
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => addGoal(monthIndex)}
              >
                Add Goal
              </button>
            )}
          </div>
        </div>
      );
      
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
              response.selectedMonthsNames.map((month, idx) => (
                <div className="col-md-4" key={`response-${idx}`}>
                  <div className="card" onClick={() => handleModalOpen(response, idx)}>
                    <div className="card-body">
                      <h5 className="card-title">IEP {index + 1}</h5>
                      <ul className="d-flex justify-content-around">
                        <h3 key={`month-${index}-${idx}`}>{month}</h3>
                      </ul>
                      <h6 className="text-center">Starting Year: {response.startingYear}</h6>
                      <button className="btn btn-primary" onClick={() => handleModalOpen(response, idx)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
      )}

      {showModal && formData && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit IEP Progress' : 'Assign New IEP'}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
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
                      onChange={handleInputChange}
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

                  <div className="mb-3">
                    <label className="form-label">Year</label>
                    <select
                      className="form-select"
                      name="year"
                      value={formData.startingYear}
                      onChange={handleInputChange}
                      disabled={isEditMode}
                    >
                      <option value="">Select year</option>
                      <option value={currentYear}>{currentYear}</option>
                      <option value={currentYear + 1}>{currentYear + 1}</option>
                    </select>
                  </div>

                  {!isEditMode && (
                    <div className="mb-3">
                      <label className="form-label">Select Starting Month</label>
                      <select className="form-select" name="startingMonth" value={formData.startingMonth} onChange={(e) => handleInputChange(e)}>
                        <option value="">Select month</option>
                        {[...Array(12).keys()].map((i) => (
                          <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Targets and Goals by Month</label>
                    {renderMonthlyGoals()}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Feedback</label>
                    <textarea
                      className="form-control"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      placeholder="Feedback for the month"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">{submitText}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}