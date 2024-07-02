import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('https://jwlgamesbackend.vercel.app/api/users/login', {username,password})
            sessionStorage.setItem('logintoken', response.data);
            const decodedToken = jwtDecode(response.data);
            sessionStorage.setItem('role', decodedToken.role);
            sessionStorage.setItem('id', decodedToken.id);
            Navigate(`/${decodedToken.role}dashboard`);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <p className="login-title">Login</p>
            </div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
