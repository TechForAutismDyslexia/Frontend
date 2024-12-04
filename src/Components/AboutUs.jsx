import React from 'react'

export default function AboutUs() {
  return (
    <div className='p-1 mt-4'>
        <div className=' container d-flex justify-content-evenly gap-2 flex-column border border-2 border-black rounded-2 p-4 mt-4' style={{ backgroundColor:"#c1d2c1" }}>
            <div className=' fw-semibold display-3 text-center border-black border-bottom border-2'>
                About us
            </div>
            <div className='text-break mt-3 fw-normal fs-5 text-center lh-base'>
            Welcome to JoyWithLearning Admin Portal, a platform dedicated to providing support for individuals with dyslexia and autism spectrum disorder (ASD),Therapists,Doctors,Parents. 
            Our mission is to empower individuals, families, and educators by offering valuable information, practical strategies, and a supportive community.
            </div>
        </div>
    </div>
  )
}
