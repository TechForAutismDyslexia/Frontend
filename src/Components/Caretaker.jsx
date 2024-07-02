import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
export default function Caretaker() {
  useEffect(async() => {
    try{
      const token = localStorage.getItem('token');
      try{
        const response = await axios.get('https://jwlgamesbackend.vercel.app/api/caretaker/assigned', {
          headers: {
            Authorization: `${token}`
          }
        });
        console.log(response.data);
      } catch(err){
        console.log(err);
      }
    }
    catch(err){
      console.log(err);
    }
  },[]);
  return (
    <div>Caretaker</div>
  )
}
