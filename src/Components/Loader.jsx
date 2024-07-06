import React from 'react'
import './Loader.css';
export default function Loader() {
  return (
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  )
}