import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function Doctor() {
    const [children, setChildren] = useState([]);
    const getChildren = async () => {
        try {
            const res = await axios.get('https://jwlgamesbackend.vercel.app/api/users/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>Doctor</div>

    )
}
