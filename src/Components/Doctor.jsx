import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from './Loader';
export default function Doctor() {
    const [children, setChildren] = useState('');
    const getChildren = async () => {
        try {
            const res = await axios.get('https://jwlgamesbackend.vercel.app/api/doctor/assigned',{
                headers: {
                    Authorization: `${sessionStorage.getItem('logintoken')}`
                }
            });
            console.log(res.data);
            setChildren(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getChildren();
      }, [])
    return (
        <>
        <div>
            <div className="parent-container container">
                <section className="navigation my-4 text-center">
                    <h2>Welcome to the Doctor Portal</h2>
                </section>
                <div>
                    <section className="my-4 row justify-content-center">
                        {!children && <Loader />}
                        {children && children.map((child, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center" style={{fontSize:'20px'}}>
                                <div className="d-flex justify-content-center p-3">
                                    {/* <img src={Profile} className='img-fluid profile' alt="Profile"></img> */}
                                </div>
                                <h3><strong>Name : </strong>{child.name}</h3>
                                <p><strong>Age : </strong>{child.age}</p>
                                <p><strong>Parent Details : </strong>{child.parentDetails}</p>
                                <p><strong>Caretaker Name : </strong>{child.caretakerName}</p>
                                <p><strong>Doctor Name : </strong>{child.doctorName}</p>
                                <p><strong>Center Id : </strong>{child.centreId}</p>
                                <p><strong>Games Completed : </strong>{child.gamesCompleted}</p>
                                {/* <p><strong>Admin Status : </strong>{child.adminStatus ? "true" : "false"}</p> */}
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
        </>
    )
}
