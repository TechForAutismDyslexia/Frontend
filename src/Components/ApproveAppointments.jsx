import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Loader from './Loader';

export default function ApproveAppointments() {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getAppointments() {
      try {
        setIsLoading(true);
        const res = await axios.get("https://joywithlearning.com/api/admin/getAppointments", {
          headers: { Authorization: localStorage.getItem("logintoken") },
        });
        setAppointment(res.data); // Assume res.data is an array of appointments
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error('Failed to fetch appointments!');
        console.error(e);
      }
    }
    getAppointments();
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  async function rejectIt(appointmentID) {
    try {
      setIsLoading(true);
      await axios.put(
        `https://joywithlearning.com/api/admin/verifyAppointment/${appointmentID}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`,
          },
        }
      );
      toast.success("Appointment rejected successfully!");
      refreshAppointments();
    } catch (e) {
      toast.error("Failed to reject appointment.");
      console.error(e);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }

  async function approveIt(appointmentID) {
    try {
      setIsLoading(true);
      await axios.put(
        `https://joywithlearning.com/api/admin/verifyAppointment/${appointmentID}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('logintoken')}`,
          },
        }
      );
      toast.success("Appointment approved successfully!");
      refreshAppointments();
    } catch (e) {
      toast.error("Failed to approve appointment.");
      console.error(e);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }

  async function refreshAppointments() {
    try {
      const res = await axios.get("https://joywithlearning.com/api/admin/getAppointments", {
        headers: { Authorization: localStorage.getItem("logintoken") },
      });
      setAppointment(res.data);
    } catch (e) {
      toast.error("Failed to refresh appointments!");
      console.error(e);
    }
  }

  return (
    <div className="parent-container container">
      <ToastContainer />
      {isLoading && <Loader />}
      {!isLoading && appointment.length === 0 && <h3>No Appointments Pending</h3>}
      {!isLoading && appointment.length > 0 && (
        <section className="card-container row">
          {appointment.map((item) => (
            <div
              className="col-md-3 mb-4"
              key={item._id}
              onClick={() => handleClick(item)}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Appointment Request by {item.parentName}</h5>
                  <p className="card-text mt-1">Child Name: {item.childName}</p>
                  <p className="card-text mt-1">Phone No: {item.parentPhoneNo}</p>
                  <p className="card-text mt-1">Address: {item.address}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      {selectedItem && (
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="childModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="childModalLabel">
                  Appointment Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Parent Name:</strong> {selectedItem.parentName}</p>
                <p><strong>Child Name:</strong> {selectedItem.childName}</p>
                <p><strong>Parent Phone No:</strong> {selectedItem.parentPhoneNo}</p>
                <p><strong>Address:</strong> {selectedItem.address}</p>
                <p><strong>Appointment Date:</strong> {selectedItem.appointmentDate}</p>
                <p><strong>Time:</strong> {selectedItem.time}</p>
                <p><strong>Consultation Type:</strong> {selectedItem.consultationType}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => rejectIt(selectedItem._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => approveIt(selectedItem._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
}
