import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <Link to="/"><h2>Todo App</h2></Link>
    </div>
  )
}

export default Navbar