import React from 'react'
import { useEffect, useState } from 'react';

export default function IEPTherapist() {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [months, setMonths] = useState([[]]);
    const [targets, setTargets] = useState([]);
    const [goals, setGoals] = useState([]);
    const [therapy, setTherapy] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchMonths = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/api/caretaker/childIEP/${localStorage.getItem("childId")}`);
                setMonths(response.data['months']);
                const newTargets = response.data['targets'].map((target) => target.target);
                const newGoals = response.data['targets'].map((target) => target.goal);

                const newMonths = response.data['months'].map((month) => month + "");

                setTargets(newTargets);
                setGoals(newGoals)
                setMonths(newMonths);

                console.log(newMonths);
                setTherapy(response.data['therapy']);
                setFeedback(response.data['feedback']);
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
                console.error('Error fetching months:', error);
            }
        };
        fetchMonths();
    }, []);
    return (
        <div className="container py-4">
            <h1 className="mb-4">IEP Progress Tracking</h1>
            {loading ? <Loader /> :
                <div className="row g-4">
                    {months.map((month) => (
                        <div key={month} className="col-md-6 col-lg-4">
                            <div
                                className="card h-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedMonth(month);
                                    setShowModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{month}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
