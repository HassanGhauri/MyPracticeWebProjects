import { Link } from "react-router-dom/cjs/react-router-dom.min"

function Navbar() {
  return (
    <nav className="navbar">
        <p>Registraton-Site</p>
        <div className="links">
            <Link to="/" >Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>

        </div>
    </nav>
    

  )
}

export default Navbar