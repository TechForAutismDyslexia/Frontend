import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from './images/family.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {  NavDropdown } from 'react-bootstrap';
export default function Navbar() {
    const [user, setUser] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('logintoken');
        const roleP = sessionStorage.getItem('role');   
        setRole(roleP);
        setUsername(sessionStorage.getItem('username'));
        if (token) {
            setUser(true);
        }
    }, [location]);

    const handleModal = () => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }

    const handleLogout = () => {
        setOpenModal(false);
        sessionStorage.removeItem('logintoken');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        setUser(false);
        navigate('/login');
    };
    return (
        // style={{backgroundColor:'#76c2f5'}}
        <nav className="navbar navbar-expand-lg border border-2 border-dark rounded-4 m-3 fs-6" style={{ backgroundColor: 'rgb(100, 150, 200)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/${role ? role+'dashboard' : ''}`}>
                    <img src={logo} style={{ borderRadius: '40px' }} className='border border-dark border-2' alt="Logo" height='40' width='40' />
                    <span className='ms-4'>JWL</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/about"><strong>About Us</strong></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact"><strong>Contact Us</strong></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback"><strong>Feedback</strong></Link>
                        </li>
                    </ul>
                    {user &&
                        <div>
                            {/* <ul className="navbar-nav  dropstart">

                                <li className="nav-item ">
                                    <button className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>
                                    </button>
                                    <ul className="dropdown-menu text-center">
                                        <li>
                                            <p className='fw-bold ps-2 pt-2'>{username}</p>
                                        </li>
                                        <li className='d-flex justify-content-center'>
                                            <button onClick={handleLogout} className='btn pt-0 btn btn-outline-danger btn-light'><strong>Logout</strong></button>
                                        </li>
                                    </ul>
                                </li>

                            </ul> */}

                            <NavDropdown className='p-0'
                                title={
                                   
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>

                                  
                                }
                                id="basic-nav-dropdown"
                                alignRight
                            >
                                <NavDropdown.Item className='fw-bold'>{username}</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} className='text-danger fw-bolder'>Logout</NavDropdown.Item>
                            </NavDropdown>


                        </div>

                    }
                    {!user &&
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"><strong>Login</strong></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register"><strong>Register</strong></Link>
                            </li>
                        </ul>
                    }
                    {openModal &&
                        <div className={`modal fade ${openModal ? 'show' : ''}`} style={{ display: openModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!openModal}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: '#f57676' }}>
                                        <h5 className="modal-title">Logout</h5>
                                        <button type="button" className="close btn-large btn" onClick={closeModal} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to logout?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}
