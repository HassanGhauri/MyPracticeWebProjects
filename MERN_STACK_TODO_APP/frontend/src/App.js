import Dashboard from "./Components/Dashboard";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Edit from "./Components/Edit";
import Main from "./Components/Main";
import Userdashboard from "./Components/Userdashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/userdashboard/:id" element={<Userdashboard/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={ <Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
