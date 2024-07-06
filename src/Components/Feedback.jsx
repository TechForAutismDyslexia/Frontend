import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setMobilenumber(e.target.value);
    }
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(name, email, mobilenumber, feedback);
        try {
            const response = await axios.post('https://jwlgamesbackend.vercel.app/api/userfeedback', {
                name,
                email,
                mobilenumber,
                feedback
            });
            console.log('Feedback sent:', response.data);
            toast.success("Feedback sent successfully!" , {autoClose:2000});
            document.getElementById("Form").reset();
        } catch (error) {
            console.error('Feedback failed:', error);
            toast.error("Registration failed. Please try again.");
        }
    }
    return (

        <div className='container-fluid d-block' style={{ overflowX: "hidden" }} >
            <ToastContainer />
            <div className='fw-bold fs-5 text-center mb-3'>
                Help us improve our services by providing your valuable feedback.
            </div>
            <div className='d-flex justify-content-center'>
                <div className=' border border-2 border-black rounded-2 p-2 ' style={{ maxWidth: "540px", minWidth: "320px", backgroundColor: "#c1d2c1" }} >
                    <div className='fw-bold fs-5 mb-3 border-bottom border-2 border-black text-center'>
                        Feedback Form
                    </div>
                    <form onSubmit={handleSubmit} id='Form' className=' text-secondary'>
                        <div className="form-floating mb-3">
                            <input type="text" id='Name' className='form-control' placeholder='Name' required onChange={handleNameChange} />
                            <label htmlFor="Name" className=''>Name</label>
                        </div>
                        <div className="form-floating mb-3">    
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleEmailChange} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" id='number' className='form-control' placeholder='Phone number' required onChange={handlePhoneChange} />
                            <label htmlFor="number">Phone number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" required onChange={handleFeedbackChange} style={{ height: "100px" }}></textarea>
                            <label htmlFor="floatingTextarea2">Feedback</label>
                        </div>
                        <div className=' d-flex justify-content-center m-0 p-0'>
                        <button type="submit" className='btn btn-outline-dark'>Send</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>


    )
}
