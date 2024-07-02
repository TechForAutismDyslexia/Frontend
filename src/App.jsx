import Login from './Components/Login.jsx'
import ParentHome from './Components/ParentHome.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Caretaker from './Components/Caretaker.jsx'
import Admin from './Components/Admin.jsx'
import Games from './Components/Details.jsx'
import Doctor from './Components/Doctor.jsx'
import Profile from './Components/Profile.jsx'

function App() {

  return (
    <>
      <Router basename="/adminportal">
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/parentdashboard" element={<ParentHome />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/caretakerdashboard" element={<Caretaker/>}/>
          <Route path="/admindashboard" element={<Admin/>}/>
          <Route path="/parentdashboard/details" element={<Games/>}/>
          <Route path="/doctordashboard" element={<Doctor/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
      </Router> 
    </>
  )
}

export default App
