import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Loader from "./Loader";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    // Fetch appointments data
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.joywithlearning.com/api/admin/getAppointments/${id}`,
          {
            headers: {
              Authorization: `${sessionStorage.getItem("logintoken")}`,
            },
          }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Appointments</h1>
      {loading ? 
       <div className="d-flex justify-content-center">
        <Loader />
        </div>
         : (
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Child Name</th>
            <th scope="col">Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.parentName}</td>
              <td>{appointment.childName}</td>
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
      )}
    </div>
  );
};

export default Appointments;
