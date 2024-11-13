import React from 'react'
import axios from 'axios'
import { useState } from 'react';
const [appointment,setAppoinment] = useState([]);
export default function ApproveAppointments() {
    
    async function getAppointments() {
        const res = axios.get("http://localhost:4000/api/admin/getAppointments",{
            headers:{Authorization: localStorage.getItem("logintoken")}
        });
        setAppoinment(res);
    }

  return (
    <div>
        {appointment.map((item)=>{
            
        })}
    </div>
  )
}
