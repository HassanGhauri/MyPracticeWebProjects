import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios  from 'axios'
const baseUrl = "http://localhost:4000"

const Signin = () => {
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleName = (e)=>{
    setName(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  const handleSignin = async(e)=>{
    e.preventDefault()
    try{
      const data = await axios.post(`${baseUrl}/login`,{name,password})
      const {_id} = data.data
      console.log(data.data)
      navigate(`/userdashboard/${_id}`)

    }catch(e){
      if(e.response.status===400){
        alert("Invalid Person")
      } 
    }
    
    
  }

  return (
    <div className='Signin'>
      <h2 className='title'>LOGIN</h2>
      <div className='form'>
      <form action="" onSubmit={handleSignin}>
        <label htmlFor="name">Name:</label>
        <input 
        type="text"
        name='name'
        id='name'
        value={name}
        onChange={handleName}
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

export default Signin