import  {useState} from'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import axios from "axios";


const baseUrl = "http://127.0.0.1:5000";

function Register() {
    const [name,setName] = useState("");
    const [salary,setSalary] = useState("");
    const [usersList, setUsersList] = useState([]);
    const history = useHistory();
    const handleName = (e) => {
      setName(e.target.value);
    }
  
    const handleSalary = (e) => {
      setSalary(e.target.value);
    }
  
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const data = await axios.post(`${baseUrl}/users`,{name,salary})
      setUsersList([...usersList,data.data]);
      setName('');
      setSalary('');
      history.push('/');
    }
  return (
    <div className="form">
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input 
            type="text"
            name='name'
            id='name'
            value={name}
            required
            onChange={handleName}
            />
            <label htmlFor="salary">Salary: </label>
            <input 
            type="text"
            name='salary'
            id='salary'
            value={salary}
            required
            onChange={handleSalary} 
            />
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register