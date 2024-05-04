import  {useState, useEffect} from'react';
import axios from "axios";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const baseUrl = "http://127.0.0.1:5000"

function Home() {
    const [usersList, setUsersList] = useState([]);
  
    const fetchUsers = async () =>{
      const data = await axios.get(`${baseUrl}/users`)
      const {Users} = data.data
      setUsersList(Users)
      console.log(data)
    };
  
   
  
    const handleDelete = async(id) => {
      await axios.delete(`${baseUrl}/users/${id}`)
      const updatedUsersList = usersList.filter(user => user.id !== id);
      setUsersList(updatedUsersList);
  
    }
  
  
    useEffect(()=>{
      fetchUsers();
    },[]);
  
  
  
    return (
        <section className="users">
            {usersList.map((user) => {
                return(
                  <div key={user.id}>
                    <h3>{user.id}</h3><br/>
                    <p>{user.name}</p><br/>
                    <span>{user.salary}</span><br/>
                    <button onClick={()=> handleDelete(user.id)} >DEL</button>
                    <Link to={`/users/${user.id}`}>EDIT</Link>
                  </div>)
            })}
        </section>

    );
  }

export default Home