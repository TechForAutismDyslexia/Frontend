import React from 'react';
import './ParentHome.css';
import Navbar from './Navbar.jsx'
import Profile from './images/profile.png'

export default function ParentHome() {
  return (
    <div>
      <div className="parent-container container">
        <section className="navigation my-4">
          <h2>Welcome to the Parent Portal</h2>
          <p>This portal provides access to important information and resources for parents. Navigate through the sections to find details about school activities, events, and more.</p>
        </section>
        <section className="my-4">
          <img src={Profile} className='img-fluid profile'></img>
          <h3>School Activities</h3>
          <p>Stay updated with the latest school activities. Here you can find information about upcoming events, extracurricular activities, and programs that are designed to enhance your child's educational experience.</p>
        </section>
        <section className="my-4">
          <h3>Parent-Teacher Meetings</h3>
          <p>We believe in strong communication between parents and teachers. Check out the schedule for the next parent-teacher meetings and learn how to get involved in your child's education.</p>
        </section>
        <section className="my-4">
          <h3>Resources for Parents</h3>
          <p>Explore a range of resources that can help you support your child's learning at home. From educational articles to online tools, we have compiled a list of valuable resources for you.</p>
        </section>
      </div>
    </div>
  );
}
