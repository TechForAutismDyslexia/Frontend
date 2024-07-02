import React, { useEffect } from 'react'

export default function Details() {
  useEffect(() => {
    const childid = sessionStorage.getItem('childId');
  }
  ,[])

  return (
    <div>Details</div>
  )
}
