import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ParentAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`https://api.joywithlearning.com/api/parent/getAppointments/${sessionStorage.getItem("id")}`, {
          headers: {
            Authorization: `${sessionStorage.getItem("logintoken")}`,
          },
        });
        setAppointments(response.data); 
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Appointments</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Child Name</th>
            <th scope="col">Appointment Date</th>
            <th scope="col">Time</th>
            <th scope="col">Branch</th>
            <th scope="col">Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.parentName}</td>
              <td>{appointment.childName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.time}</td>
              <td>{appointment.branch}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    window.open(
                      `https://api.joywithlearning.com/${appointment.prescription}`,
                      "_blank"
                    )
                  }
                >
                  View Prescription
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentAppointments;
