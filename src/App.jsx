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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import './App.css';
// import Profile from './Components/profile.jsx'

function App() {
  const [sharedUsername , setSharedUsername] = useState('');
  const updateUsername = (username) => {
    setSharedUsername(username);
  }

  return (
    <>
      <Router basename="/adminportal">
        <Navbar username = {sharedUsername} set = {setSharedUsername}/>
        <Routes>
          <Route path="/login" element={<Login update={updateUsername}/>} />
          <Route path="/parentdashboard" element={<ParentHome />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/caretakerdashboard" element={<Caretaker/>}/>
          <Route path="/caretakerdashboard/games" element={<Games/>}/>
          <Route path="/admindashboard" element={<Admin/>}/>
          <Route path="/parentdashboard/details" element={<Details/>}/>
          <Route path="/doctordashboard" element={<Doctor/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}

        </Routes>
      </Router> 
    </>
  )
}

export default App
