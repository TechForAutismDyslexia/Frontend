import React from 'react'

export default function Feedback() {
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
                    <form>
                        <div class="form-floating mb-3">
                            <input type="text" id='Name' className='form-control' placeholder='Name' />
                            <label for="Name">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="number" id='number' className='form-control' placeholder='Phone number' />
                            <label for="number">Phone number</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                            <label for="floatingTextarea2">Feedback</label>
                        </div>
                        <button type="submit" className='btn btn-outline-dark'>Send</button>
                    </form>

                </div>
            </div>
        </div>


    )
}
