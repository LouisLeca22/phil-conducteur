import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

function Navbar({auth: {isAuthenticated, loading}, logout}) {

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
        Philosophes
        </Link>
      </li>
      <li>
        <Link to="/posts">
        Articles
        </Link>
      </li>
      <li>
      <Link to="/dashboard">
        <i className="fas fa-user"></i>{" "}
        <span className="hide-sm">Tableau de bord</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Se déconnecter</span>
        </a>
      </li>
  </ul>
  )

  const guestLinks = (
    <ul>
    <li><Link to="/profiles">Philosophes</Link></li>
    <li><Link to="/register">S'inscrire</Link></li>
    <li><Link to="/login">S'identifier</Link></li>
  </ul>
  )

  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/"><img src="img/philosophy.png" style={{height: "25px", width:"25px"}} alt="" /> Phil-conducteur</Link>
    </h1>
    {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
  </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)
