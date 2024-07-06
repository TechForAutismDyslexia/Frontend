import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChildRegister() {
    const [name, setName] = useState('');
    const [centreId, setCentreId] = useState('');
    const [age, setAge] = useState('');
    const [centres, setCentres] = useState([]);

    useEffect(() => {
        const fetchCentres = async () => {
            try {
                const res = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allcentres', {
                    headers: {
                        Authorization: `${sessionStorage.getItem('logintoken')}`
                    }
                });
                setCentres(res.data);
    
            } catch (e) {
                console.log("data not sent");
            }
        };

        fetchCentres();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCentreIdChange = (e) => {
        setCentreId(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://jwlgamesbackend.vercel.app/api/parent/childinfo', {
                name,
                centreId,
                age
            },
            {
                headers: {
                    Authorization: `${sessionStorage.getItem('logintoken')}`
                }
            });
            console.log('Registration successful:', response.data);
            toast.success("Registered successfully!" , {autoClose:2000});
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error states, show a message to the user, etc.
        }
    };

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
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="centreId">Centre</label>
                        <select
                            id="centreId"
                            value={centreId}
                            onChange={(e) => setCentreId(e.target.value)}
                            className="form-input"
                            required
                        >
                            <option value="">Select a centre</option>
                            {centres.map(centre => (
                                <option key={centre._id} value={centre.centreId}>
                                    {centre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            type="number"
                            placeholder="Enter your age"
                            value={age}
                            onChange={handleAgeChange}
                            className="form-input"
                            required
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
