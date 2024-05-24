import { Link } from "react-router-dom"
import '../components/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="authentication">Authentication</h1>
      <ul>
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/register'>Register</Link>
        <Link className="link" to='/login'>Login</Link>
      </ul>
    </nav>
  )
}

export default Navbar
