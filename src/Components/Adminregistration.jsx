import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [role, setRole] = useState('caretaker');

    const handleNameChange = (e) => setName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleMobileNumberChange = (e) => setMobilenumber(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const endpoint = role === 'caretaker' ? 'careTakerRegister' : 'doctorRegister';
        try {
            const res = await axios.post(`https://jwlgamesbackend.vercel.app/api/admin/${endpoint}`, { name, username, email, mobilenumber, password },
                { headers: { Authorization: `${sessionStorage.getItem('logintoken')}` } }
            );
            console.log(res.data);
            toast.success("Registered successfully!" , {autoClose:2000});

            setTimeout(()=>{
                navigate("/admindashboard");
            },3000);
        } catch (e) {
            console.log("data not sent");
            toast.error("Registration failed. Please try again.");
        }
    }

    return (
        <div className="register-container">
            <ToastContainer />
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            onChange={handleNameChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobilenumber">Mobile Number</label>
                        <input
                            id="mobileno"
                            type="number"
                            placeholder="Mobile Number"
                            onChange={handleMobileNumberChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" value={role} onChange={handleRoleChange} className="form-input">
                            <option value="caretaker">Therapist</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
