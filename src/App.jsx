import { useState } from 'react'
import Login from './Components/Login.jsx'
import ParentHome from './Components/ParentHome.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ParentHome />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
