import {Link} from "react-router-dom"

export const DashboardActions = () => {
  return (
    <div className="dash-buttons">
    <Link to="/edit-profile" className="btn btn-light"
      ><i className="fas fa-user-circle text-primary"></i> Editer le profil</Link>
    <Link to="/add-book" className="btn btn-light"
      ><i className="fab fa-black-tie text-primary"></i> Ajouter un livre</Link>
    <Link to="/add-education" className="btn btn-light"
      ><i className="fas fa-graduation-cap text-primary"></i> Ajouter une Education</Link>
  </div>
  )
}
