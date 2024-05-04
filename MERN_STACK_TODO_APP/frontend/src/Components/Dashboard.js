import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const baseUrl = "http://localhost:4000"
const Dashboard = () => {
    const [persons,setPersons] = useState([])
    const navigate = useNavigate()

    const fetchPersons = async()=>{
        const data = await axios.get(`${baseUrl}`)
        const members = data.data
        console.log(members)
        setPersons(members)

    }
    const deletePerson = async(id)=>{
        const data = await axios.delete(`${baseUrl}/${id}`)
        const updatedPersonsList = persons.filter(person=>person._id !== id)
        setPersons(updatedPersonsList);
        console.log(data.data)
    }
    const editPerson = async(id)=>{
        navigate(`/edit/${id}`)
       
    }

    useEffect(()=>{
        fetchPersons()
    },[])


  return (
    <div className="dashboard">
        <Navbar />    
        <h2 className='title'>Users DashBoard</h2>
            {persons && persons.map((person)=>{
                return(
                    <div className="persons" key={person._id}>
                        <h3>{person.name}</h3>
                        <p>{person.profession}</p>
                        <button onClick={()=>{deletePerson(person._id)}}>X</button>
                        <button onClick={()=>{editPerson(person._id)}}>edit</button>
                    </div>
                )
            })}
        
        
    </div>
  )
}

export default Dashboard