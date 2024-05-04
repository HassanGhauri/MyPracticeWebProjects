import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <div>
        <h2 className='maintitle'>Welcome To Our ToDo App</h2>
        <p className='intro'>Here you can enter your daily tasks as Remainders <br /> 
        and make your daily schedule a walk in the park.</p>

        <p className='intro'>So, please make an account or login to your account and get started.</p>
        <div className="enter">
            <Link to="/signin">SignIn</Link>
            <p>or</p>
            <Link to="/signup">SignUp</Link>
        </div>
    </div>
  )
}

export default Main