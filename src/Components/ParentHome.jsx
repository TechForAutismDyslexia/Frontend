import React from 'react';
import './ParentHome.css';
import Navbar from './Navbar.jsx'
export default function ParentHome() {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="parent-container">
        <div className="navigation">
          <ul>
            <li>Profile</li>
            <li></li>
            <li>Link 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
