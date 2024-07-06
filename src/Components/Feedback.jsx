import React from 'react'
import { useState } from 'react';
import axios from 'axios';
export default function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(name, email, phone, feedback);
        try {
            const response = await axios.post('https://jwlgamesbackend.vercel.app/api/userfeedback', {
                name,
                email,
                phone,
                feedback
            });
            console.log('Feedback sent:', response.data);
        } catch (error) {
            console.error('Feedback failed:', error);
        }
    }


    return (

        <div className='container-fluid d-block' style={{ overflowX : "hidden"}} >
            <div className='fw-bold fs-5 text-center mb-3'>
                Help us improve by providing your valuable feedback.
            </div>
            <div className='d-flex justify-content-center'>
                <div className=' border border-2 border-black rounded-2 p-2 ' style={{ maxWidth: "540px", minWidth: "320px", backgroundColor: "#c1d2c1" }} >
                    <div className='fw-bold fs-5 mb-3 border-bottom border-2 border-black text-center'>
                        Feedback Form
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" id='Name' className='form-control' placeholder='Name' required onChange={handleNameChange} />
                            <label for="Name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleEmailChange} />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" id='number' className='form-control' placeholder='Phone number' required onChange={handlePhoneChange} />
                            <label for="number">Phone number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" required onChange={handleFeedbackChange} style={{ height: "100px" }}></textarea>
                            <label for="floatingTextarea2">Feedback</label>
                        </div>
                        <button type="submit" className='btn btn-outline-dark'>Send</button>
                    </form>

                </div>
            </div>
        </div>


    )
}
