import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react";
import axios from "axios";


const baseUrl = "http://127.0.0.1:5000";
function Update() {
    const {id} = useParams();
    const history = useHistory();
    const [name,setName] = useState("");
    const [salary,setSalary] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleName = (e) => {
      setName(e.target.value);
    }
  
    const handleSalary = (e) => {
      setSalary(e.target.value);
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      const data = await axios.put(`${baseUrl}/users/${id}`,{name,salary});
      const updatedName = data.data.name;
      const updatedSalary = data.data.salary;
      const UpdatedUsersList = usersList.map(user =>{
        if(user.id === id){
          user.name = updatedName
          user.salary = updatedSalary
          return user
        }
        return user
      })
      setUsersList(UpdatedUsersList);
      setName('');
      setSalary('');
      history.push('/');
    }

  return (
    <div className="update">
      <h2 className="title">Update user with id: ({id})</h2>
      <div className="form">
        <form action="" onSubmit={handleSubmit} >
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
            <button type='submit'>Update</button>
        </form>
    </div>
      
    </div>
  )
}

export default Update