import Login from './Components/Login.jsx'
import ParentHome from './Components/ParentHome.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Therapist from './Components/Therapist.jsx'
import Admin from './Components/Admin.jsx'
// import Details from './Components/Details.jsx'
import Doctor from './Components/Doctor.jsx'
import Games from './Components/Games.jsx'
import './Components/Admin.css';
import AdminRegister from './Components/Adminregistration.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Reports from './Components/Reports.jsx'
import Admingamedetailsftech from './Components/Admingamedetailsftech.jsx'
import ContactUs from './Components/ContactUs.jsx'
import ChildRegister from './Components/Childform.jsx'
import './App.css';
import Feedback from './Components/Feedback.jsx'
import AboutUs from './Components/AboutUs.jsx'
import IEPDoctor from './Components/IEPDoctor.jsx'
import IEPTherapist from './Components/IEPTherapist.jsx'
import AppointmentBooking from './Components/BookAppointment.jsx'
import TaskCalendar  from './Components/Calender.jsx';


function App() {
  return (
    <>
      <Router basename="/adminportal">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/parentdashboard" element={<ParentHome />} />
          <Route path="/parentdashboard/childregister" element={<ChildRegister/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/caretakerdashboard" element={<Therapist/>}/>
          <Route path="/doctordashboard/iep" element={<IEPDoctor/>}/>
          <Route path="/caretakerdashboard/iep" element={<IEPTherapist/>}/>
          <Route path="/admindashboard" element={<Admin/>}/>
          <Route path="/admindashboard/adminregister" element={<AdminRegister/>}/>
          <Route path="/admindashboard/admingamedetailsftech" element={<Admingamedetailsftech/>}/>
          {/* <Route path="/doctordashboard/gamedetailsfetch" element={<Admingamedetailsftech/>}/> */}
          {/* <Route path="/parentdashboard/details" element={<Details/>}/> */}
          <Route path="/doctordashboard" element={<Doctor/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/contact" element={< ContactUs/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/calendar" element={<TaskCalendar/>} />
          <Route path="/bookappointment" element={<AppointmentBooking/>} />
          <Route path="/" element={
            <div className='container mt-5'>
              <div className='fw-bolder fs-1 text-center'>
                Welcome to the Admin Portal
              </div>
            </div>
          } />
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </Router> 
    </>
  )
}

export default App
