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
  const [email, setParentEmail] = useState('');
  const [dob, setDob] = useState('');
  const [parentPhoneNo, setParentPhoneNo] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [schoolBoard, setSchoolBoard] = useState('');
  const [childConcerns, setChildConcerns] = useState('');
  const [branch, setBranch] = useState('');
  const [gender, setGender] = useState('');                 
  const [alternativeNumber, setAlternativeNumber] = useState(''); 
  const [address, setAddress] = useState('');               
  const [consultationType, setConsultationType] = useState(''); 
  const [referredBy, setReferredBy] = useState('');         
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([
    '10:30 AM', '11:30 AM', '12:30 PM', '2:00 PM', '3:00 PM', '3:30 PM', '4:30 PM', '5:30 PM',
  ]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [pdf,setPDF] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data/alldoctors', {
          headers: { Authorization: localStorage.getItem('logintoken') },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (doctorId && appointmentDate) {
        try {
          const response = await axios.get(`http://localhost:4000/api/admin/getConsultations/${doctorId}/${appointmentDate}`, {
            headers: { Authorization: localStorage.getItem('logintoken') },
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
  }, [doctorId, appointmentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('parentName', parentName);
      formData.append('childName', childName);
      formData.append('childAge', childAge);
      formData.append('appointmentDate', appointmentDate);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('parentPhoneNo', parentPhoneNo);
      formData.append('alternativeNumber', alternativeNumber);
      formData.append('address', address);
      formData.append('schoolName', schoolName);
      formData.append('classGrade', classGrade);
      formData.append('schoolBoard', schoolBoard);
      formData.append('consultationType', consultationType);
      formData.append('referredBy', referredBy);
      formData.append('childConcerns', childConcerns);
      formData.append('branch', branch);
      formData.append('doctorId', doctorId);
      formData.append('time', time);

      if (pdf) {
        formData.append('pdf', pdf); // Attach the file
      }

      const response = await axios.post(
        'http://localhost:4000/api/admin/bookAppointment',
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('logintoken'),
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      console.log('Appointment booked:', response.data);
      toast.success(response.data);

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    }
  };
  const handleFileChange = (e) => {
    setPDF(e.target.files[0]); 
  };

  const handleTimeSelect = (selectedTime) => {
    if (!bookedSlots.includes(selectedTime)) {
      setTime(selectedTime);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="childName">Child Name:</label>
          <input type="text" className="form-control" value={childName} onChange={(e) => setChildName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="childAge">Child Age:</label>
          <input type="text" className="form-control" value={childAge} onChange={(e) => setChildAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Birth:</label>
          <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="parentName,">Parent Name:</label>
          <input type="text" className="form-control" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Parent Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setParentEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="parentPhoneNo">Parent Phone No:</label>
          <input type="tel" className="form-control" value={parentPhoneNo} onChange={(e) => setParentPhoneNo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="alternativeNumber">Alternative Contact Number:</label>
          <input type="tel" className="form-control" value={alternativeNumber} onChange={(e) => setAlternativeNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="schoolName">School Name:</label>
          <input type="text" className="form-control" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="classGrade">Class/Grade:</label>
          <input type="text" className="form-control" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="schoolBoard">School Board:</label>
          <select className="form-control" value={schoolBoard} onChange={(e) => setSchoolBoard(e.target.value)} required>
            <option value="">Select School Board</option>
            <option value="CBSE">CBSE</option>
            <option value="SSC">SSC</option>
            <option value="ICSE">ICSE</option>
            <option value="Camebridge (IB)">Cambridge (IB)</option>
            <option value="NIOS">NIOS</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="consultationType">Consultation Type:</label>
          <select className="form-control" value={consultationType} onChange={(e) => setConsultationType(e.target.value)} required>
            <option value="">Select Consultation Type</option>
            <option value="New Consultation">New Consultation Rs.700/-</option>
            <option value="Assessment(IQ)">Assessment (IQ) Rs.6000/-</option>
            <option value="For IB board Assessment(IQ)">For IB board Assessment (IQ) Rs.12000/-</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="referredBy">Referred By:</label>
          <input type="text" className="form-control" value={referredBy} onChange={(e) => setReferredBy(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="childConcerns">Child Concerns:</label>
          <textarea className="form-control" value={childConcerns} onChange={(e) => setChildConcerns(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="Branch">Branch:</label>
          <select className="form-control" value={branch} onChange={(e) => setBranch(e.target.value)} required>
            <option value="">Select Branch</option>
            <option value="Bowenpally">Bowenpally</option>
            <option value="Barkathpura">Barkathpura</option>
            <option value="Champapet">Champapet</option>
            <option value="Nacharam">Nacharam</option>
            <option value="Neredmet">Neredmet</option>
            <option value="Kukatpally">Kukatpally</option>
            <option value="Banjarahills">Banjarahills</option>
            <option value="Manikonda">Manikonda</option>
            <option value="Suchitra">Suchitra</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Appointment Date:</label>
          <input type="date" className="form-control" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="doctorId">Doctor:</label>
          <select className="form-control" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time Slot:</label>
          <div className="d-flex flex-wrap">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`btn m-1 ${bookedSlots.includes(slot) && !time.includes(slot) ? 'disabled btn-primary' : 'btn-outline-primary' } ${time.includes(slot) ? 'btn-primary text-light' : ''}`}
                onClick={() => handleTimeSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="reports">Any medical reports/ Previous Assessment reports</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={!doctorId || !time}>Book Appointment</button>
      </form>
      <ToastContainer />
    </div>
  );
}
