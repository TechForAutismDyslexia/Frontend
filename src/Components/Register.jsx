import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader.jsx';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleMobileNumberChange = (e) => {
        setMobilenumber(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = async (e) => {
        setLoading(true);
        e.preventDefault(); 
        try {
            const res = await axios.post('https://jwlgamesbackend.vercel.app/api/users/register',{username, password, name, mobilenumber,email});
            console.log(res);
            setLoading(false);
            toast.success("Registered successfully!" , {autoClose:2000});
            setTimeout(()=>{
                navigate("/admindashboard");
            },2000);
        }
        catch (e) {
            if(e.response.status === 401){
                toast.error("Username already exists!" , {autoClose:2000});
                setLoading(false);
                return;
            }
            console.log("data not sent")
            setLoading(false);
            toast.error("Error has occured. Please try again!" , {autoClose:2000});
        }
    }
    return (
        <div className="register-container">
            <ToastContainer/>
            <div className="register-header">
                <p className="register-title">Register</p>
            </div>
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
                        <label htmlFor="username">Mobile Number</label>
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
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        {loading && <Loader />}
                    </div>
                </form>
            </div>
        </div>
    );
}
