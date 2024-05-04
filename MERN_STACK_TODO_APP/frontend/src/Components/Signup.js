import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios  from 'axios'
const baseUrl = "http://localhost:4000/"
const Signup = () => {
  const [name,setName] = useState("")
  const [age,setAge] = useState("")
  const [profession,setProfession] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleName = (e)=>{
    setName(e.target.value)
  }
  const handleAge = (e)=>{
    setAge(e.target.value)
  }
  const handleProfession = (e)=>{
    setProfession(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post(`${baseUrl}`,{name,age,profession,password})
    console.log(data.data)
    setName('')
    setAge('')
    setProfession('')
    setPassword('')
    navigate.push('/dashboard')
  }
  
  return (
    <div className="Signup">
      <h2 className='title'>Create Account</h2>
      <div className='form'>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
        type="text"
        name='name'
        id='name'
        value={name}
        onChange={handleName}
        required 
        />
        <label htmlFor="age">Age:</label>
        <input 
        type="text"
        name='age'
        id='age'
        value={age}
        onChange={handleAge}
        required 
        />
        <label htmlFor="profession">Profession</label>
        <input 
        type="text"
        name='profession'
        id='profession'
        value={profession}
        onChange={handleProfession}
        required 
        />
        <label htmlFor="password">Password</label>
        <input 
        type="password"
        name='password'
        id='password'
        value={password}
        onChange={handlePassword}
        required 
        />
        <button type='submit'>SignUp</button>
      </form>
    </div>
    </div>
    
  )
}

export default Signup