import  {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getCurrentProfile, deleteAccount} from '../../actions/profile';
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import { DashboardActions } from './DashboardActions';
import Education from "./Education"
import Book from './Book';
const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}}) => {

  useEffect(() => {
    getCurrentProfile();
  },  [getCurrentProfile])
  return loading && profile === null ? <Spinner /> : 
  <>
  <h1 className="large text-primary">Tableau de bord</h1> 
  <p className="lead">
    <i className="fas fa-user"></i> Bienvenue {user && user.name}
  </p>
  {profile !== null ? (
  <>
    <DashboardActions />
    <Book book={profile.book} />
    <Education education={profile.education} />

    <div className="my-2">
      <button onClick={() => deleteAccount()} className="btn btn-danger">
        <i className="fas fa-user-minus">Supprimer mon compte</i>
      </button>
    </div>
  </>
  ) : (
  <>
    <p>Tu n'as pas encore créé de profil. Ajoutez des informations</p>
    <Link to="/create-profile" className="btn btn-primary my-1">
      Créer un profil
    </Link>
  </>
  )}
  </>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
