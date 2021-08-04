import {Link} from "react-router-dom";

function Landing() {
  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Phil Conducteur</h1>
        <p className="lead">
          Un réseau social qui met en relation les philsophes
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">S'inscrire</Link>
          <Link to="/login" className="btn btn-light">S'identifier</Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Landing
