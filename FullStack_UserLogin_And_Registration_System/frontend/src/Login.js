import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const baseUrl = "http://127.0.0.1:5000";
function Login() {
    const [name,setName] = useState("");
    const [id, setId] = useState("");
    const history = useHistory();
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleId = (e) => {
        setId(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${baseUrl}/users/login`,{id,name});
            console.log(response);
            history.push(`/loggedin/${id}`);
        }
        catch(e){
            if (e.response.status===200){
                
            } else if(e.response.status===401){
                alert("Invalid User");
            }  
        }  
    }


  return (
    <div className="login">
        <h2 className="title">User Login</h2>
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
                <label htmlFor="id">ID: </label>
                <input 
                type="text"
                name='id'
                id='id'
                value={id}
                required
                onChange={handleId} 
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login