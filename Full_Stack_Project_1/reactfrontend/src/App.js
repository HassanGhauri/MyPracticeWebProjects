import axios from "axios";
import { format } from "date-fns";
import './App.css';
import {useState, useEffect} from 'react'

const baseUrl = "http://127.0.0.1:5000"

function App() {
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [eventsList,setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);

  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/events`)
    const {events} = data.data
    setEventsList(events)
    console.log("DATA: ",data)
  }

  const handleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description);
  }

  const handleChange = (e) =>{
    setDescription(e.target.value);
  }

  const handleDelete = async (id) =>{
    try{
      await axios.delete(`${baseUrl}/events/${id}`)
      const updatedList = eventsList.filter(event => event.id !== id)
      setEventsList(updatedList);
    } catch(err) {
      console.error(err.message)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const data = await axios.post(`${baseUrl}/events`, {description})
      setEventsList([...eventsList,data.data]);
      setDescription('');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() =>{
    fetchEvents();
  },[])

  return (
    <div className="App">
      <section>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            <input
            onChange={handleChange}
            type="text"
            name="description"
            id="description"
            value={description}
            required
            />
            <button type="submit" >Submit</button>
          </form>
      </section>
      <section>
        <ul>
          {eventsList.map((event) =>{
            return (
              <li style={{display:"flex"}} key={event.id}>
                {event.description}
                <button onClick={() => handleDelete(event.id)} >X</button>
              </li>
            )
          })}
        </ul>
      </section>
        
    </div>
  );
}

export default App;
