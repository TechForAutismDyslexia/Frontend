import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState(0);
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
        e.preventDefault(); 
        try {
            const res = await axios.post('https://jwlgamesbackend.vercel.app/api/users/register',{username, password, name, mobilenumber,email});
            console.log(res);
        }
        catch (e) {
            console.log("data not sent")
        }
    }
    return (
        <div className="register-container">
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
                </form>
            </div>
        </div>
    );
}
