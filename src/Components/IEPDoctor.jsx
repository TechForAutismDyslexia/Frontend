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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/caretaker/childIEP/${sessionStorage.getItem("childId")}`);
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

  const handleInputChange = (e, monthIndex, goalIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (monthIndex !== undefined && goalIndex !== undefined) {
        updatedData.monthlyGoals[monthIndex].goals[goalIndex] = value;
      } else if (monthIndex !== undefined) {
        updatedData.monthlyGoals[monthIndex].target = value;
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
          target: '',
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

  const handleModalOpen = (response) => {
    setSubmitText(response ? 'Update Progress' : 'Assign');
    const initialSelectedMonths = [1, 2, 3];
    setFormData(
      response || {
        doctorId : sessionStorage.getItem("id"),
        therapy: '',
        therapistName: therapistName,
        feedback: '',
        monthlyGoals: initialSelectedMonths.map((month) => ({
          month: new Date(0, month - 1).toLocaleString('default', { month: 'long' }),
          target: '',
          goals: ['']
        })),
        startingYear: currentYear,
        startingMonth: 1,
        selectedMonths: initialSelectedMonths,
        selectedMonthsNames : initialSelectedMonths.map((month) => new Date(0, month - 1).toLocaleString('default', { month: 'long' }))
      }
    );
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(`https://jwlgamesbackend.vercel.app/api/doctor/assignIEP/${sessionStorage.getItem("childId")}`, formData);
      await axios.put(`http://localhost:4000/api/doctor/assignIEP/${sessionStorage.getItem("childId")}`, formData);
      console.log(formData);
      setShowModal(false);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addGoal = (monthIndex) => {
    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals.push('');
      return { ...prevData, monthlyGoals: updatedGoals };
    });
  };

  const removeGoal = (monthIndex, goalIndex) => {
    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals = updatedGoals[monthIndex].goals.filter((_, index) => index !== goalIndex);
      return { ...prevData, monthlyGoals: updatedGoals };
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
              (response.selectedMonthsNames.map((month,idx)=>(
                <div className="col-md-4" key={`response-${idx}`}>
                  <div className="card" onClick={() => handleModalOpen(response)}>
                    <div className="card-body">
                      <h5 className="card-title">IEP {index + 1}</h5>
                      <ul className="d-flex justify-content-around">
                          <h3 key={`month-${index}-${idx}`}>{month}</h3>
                      </ul>
                      <h6 className="text-center">Starting Year: {response.startingYear}</h6>
                      <button className="btn btn-primary" onClick={() => handleModalOpen(response)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )))
            ))}
          </div>
      )}

      {showModal && formData && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">IEP Progress Form</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Therapy Type</label>
                    <input type="text" className="form-control" name="therapy" value={formData.therapy} onChange={(e) => handleInputChange(e)} placeholder="Enter therapy type" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Therapist Name</label>
                    <input type="text" className="form-control" name="therapistName" value={therapistName} disabled />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Year</label>
                    <select className="form-select" name="year" value={formData.startingYear} onChange={(e) => handleInputChange(e)}>
                      <option value="">Select year</option>
                      <option value={currentYear}>{currentYear}</option>
                      <option value={currentYear + 1}>{currentYear + 1}</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Starting Month</label>
                    <select className="form-select" name="startingMonth" value={formData.startingMonth || ''} onChange={(e) => handleInputChange(e)}>
                      <option value="">Select month</option>
                      {[...Array(12).keys()].map((i) => (
                        <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Targets and Goals by Month</label>
                    {formData.monthlyGoals.map((monthGoal, monthIndex) => (
                      <div key={monthIndex} className="card mb-3">
                        <div className="card-body">
                          <h5>{new Date(0, (formData.selectedMonths[monthIndex]) - 1).toLocaleString('default', { month: 'long' })}</h5>
                          <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Target for this month" 
                            value={monthGoal.target} 
                            onChange={(e) => handleInputChange(e, monthIndex)} 
                          />
                          {monthGoal.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="input-group mb-2">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder={`Goal ${goalIndex + 1}`} 
                                value={goal} 
                                onChange={(e) => handleInputChange(e, monthIndex, goalIndex)} 
                              />
                              <button type="button" className="btn btn-danger rounded-2" onClick={() => removeGoal(monthIndex, goalIndex)}> x </button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-primary" onClick={() => addGoal(monthIndex)}>Add Goal</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Feedback</label>
                    <textarea className="form-control" name="feedback" value={formData.feedback} onChange={(e) => handleInputChange(e)} placeholder="Enter feedback"></textarea>
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
