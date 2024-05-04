import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import  axios  from 'axios'
const baseUrl = "http://localhost:4000"
const Userdashboard = () => {
    const {id} = useParams()
    const [personName,setPersonName] = useState("")
    const [value,setValue] = useState("")

    const handleValue =(e)=>{
        e.preventDefault()
        setValue(e.target.value)
    }
    
    const fetchuser = async()=>{
        const person = axios.get(`${baseUrl}/${id}`)
            .then((user)=>{
                const {data} = user
                const {name} = data
                setPersonName(name)
                console.log(data)
            })
        
    }

    useEffect(()=>{
        fetchuser()
    },[]);

  return (
    <div>
        <Navbar />
        <h2 className='title'>Welcome user : {personName}</h2>
        <div className="form">
            <h2>Enter Task</h2>
            <form action="">
                <label htmlFor="value">Value</label>
                <input 
                type="text"
                name='value'
                id='value'
                value={value}
                onChange={handleValue} 
                />
                <button type='submit'>enter</button>
            </form>
        </div>

        <div className="checkfrom">
            <h2>Tasks</h2>
            <form action="">
                <input type="checkbox" name='task' id='task'/>
                <label htmlFor="task">{value}</label><br />
            </form>
        </div>

    </div>
  )
}

export default Userdashboard