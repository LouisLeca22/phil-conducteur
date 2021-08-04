import {Link} from "react-router-dom";



function Navbar() {
  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/"><img src="img/philosophy.png" style={{height: "25px", width:"25px"}} alt="" /> Phil-conducteur</Link>
    </h1>
    <ul>
      <li><Link to="/!#">Philosophes</Link></li>
      <li><Link to="/register">S'inscrire</Link></li>
      <li><Link to="/login">S'identifier</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar
