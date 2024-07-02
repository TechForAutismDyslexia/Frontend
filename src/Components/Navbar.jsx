import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from './images/family.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [user, setUser] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('logintoken');
        if (token) {
            setUser(true);
        }
    }, [location]);
    const handleLogout = () => {
        sessionStorage.removeItem('logintoken');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        navigate('/login');
        setUser(false);
    };
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} style={{borderRadius:'40px'}} alt="Logo" height='50' width='50' />
                    <span className='ms-4'>JWL</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback">Feedback</Link>
                        </li>
                    </ul>
                    { user &&
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                            <li className="nav-item">
                                <button className="btn btn-danger mt-2" onClick={handleLogout}  >Logout</button>
                            </li>
                        </ul>
                        

                    }
                    { !user &&
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </nav>
    )
}
