import { useState } from 'react'
import Login from './Components/Login.jsx'
import ParentHome from './Components/ParentHome.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Profile from './Components/Profile.jsx'


function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ParentHome />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
