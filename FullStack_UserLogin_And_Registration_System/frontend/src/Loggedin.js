import  axios  from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
const baseUrl = "http://127.0.0.1:5000";
function Loggedin() {
    const {id} = useParams();
    const [user,setUser] = useState({});

    const fetchUser = async() =>{
        const User = await axios.get(`${baseUrl}/users/${id}`);
        setUser(User.data.User);

    }
    useEffect(()=>{
        fetchUser();
    },[])
    
  return (
    <div className='loggedin'>
        <h2 className='title'>User {user.name} with ID: {id} has successfully Loggedin.</h2>

    </div>
  )
}
export default Loggedin