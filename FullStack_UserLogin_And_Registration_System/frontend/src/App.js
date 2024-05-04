import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from "./Navbar";
import Register from "./Register";
import Update from "./Update";
import Login from "./Login";
import Loggedin from "./Loggedin";


function App() {
  
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route exact path="/users/:id">
            <Update/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/loggedin/:id">
            <Loggedin/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
