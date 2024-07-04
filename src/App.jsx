import Login from './Components/Login.jsx'
import ParentHome from './Components/ParentHome.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Caretaker from './Components/Caretaker.jsx'
import Admin from './Components/Admin.jsx'
import Details from './Components/Details.jsx'
import Doctor from './Components/Doctor.jsx'
import Games from './Components/Games.jsx'
import './Components/Admin.css';
import AdminRegister from './Components/Adminregistration.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Reports from './Components/Reports.jsx'


function App() {
  return (
    <>
      <Router basename="/adminportal">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/parentdashboard" element={<ParentHome />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/caretakerdashboard" element={<Caretaker/>}/>
          <Route path="/caretakerdashboard/games" element={<Games/>}/>
          <Route path="/admindashboard" element={<Admin/>}/>
          <Route path="/admindashboard/adminregister" element={<AdminRegister/>}/>
          <Route path="/parentdashboard/details" element={<Details/>}/>
          <Route path="/doctordashboard" element={<Doctor/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/games" element={<Games/>}/>
        </Routes>
      </Router> 
    </>
  )
}

export default App
