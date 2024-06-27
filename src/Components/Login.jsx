import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
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
