import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import { toast, ToastContainer } from 'react-toastify';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(''); // No conversion to number
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhoneNo, setParentPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorId, setDoctorId] = useState('');
  
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '2:00 PM',
    '3:00 PM',
    '3:30 PM',
    '4:30 PM',
    '5:30 PM',
  ]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Fetch all doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/data/alldoctors', {
          headers: {
            Authorization: localStorage.getItem('logintoken'),
          },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch booked slots for the selected doctor and date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (doctorId && date) {
        try {
          const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/admin/getConsultations/${doctorId}/${date}`, {
            headers: {
              Authorization: localStorage.getItem('logintoken'),
            },
          });
  
          const booked = response.data
            .flatMap(consultation =>
              consultation.slots.filter(slot => slot.booked).map(slot => slot.time)
            );
  
          setBookedSlots(booked);
        } catch (error) {
          console.error('Error fetching consultations:', error);
        }
      } else {
        setBookedSlots([]);
      }
    };
  
    fetchBookedSlots();
  }, [doctorId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://jwlgamesbackend.vercel.app/api/admin/bookAppointment', {
            childName, 
            childAge, 
            parentName, 
            parentEmail, 
            parentPhoneNo, 
            date, 
            time, 
            doctorId ,
      }, {
        headers: {
          Authorization: localStorage.getItem('logintoken'),
        },
      });
      console.log('Appointment booked:', response.data);
      toast.success('Appointment booked successfully!');

      setTimeout(() => {
        navigate('/admindashboard');
      }, 1500); // Wait 1.5 seconds before redirecting
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="childName">Child Name:</label>
          <input
            type="text"
            className="form-control"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="childAge">Child Age:</label>
          <input
            type="text"
            className="form-control"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentName">Parent Name:</label>
          <input
            type="text"
            className="form-control"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentEmail">Parent Email:</label>
          <input
            type="email"
            className="form-control"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentPhoneNo">Parent Phone No:</label>
          <input
            type="tel"
            className="form-control"
            value={parentPhoneNo}
            onChange={(e) => setParentPhoneNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorId">Doctor:</label>
          <select
            className="form-control"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Available Time Slots:</label>
          <div className="d-flex flex-wrap">
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn ${bookedSlots.includes(slot) ? 'btn-secondary' : 'btn-primary'} m-1`}
                  disabled={bookedSlots.includes(slot)}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>No available time slots.</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Book Appointment</button>
      </form>
      <ToastContainer /> {/* Ensure ToastContainer is placed here for toasts to work */}
    </div>
  );
}
