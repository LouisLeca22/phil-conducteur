import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Spinner from "../layout/Spinner"
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileBook from "./ProfileBook"
import ProfileEducation from "./ProfileEducation"

const Profile = ({getProfileById, profile: {profile, loading}, auth, match}) => {

  useEffect(() => {
    getProfileById(match.params.id);

  }, [getProfileById, match.params.id])
  return (
    <>
      {profile === null || loading ? <Spinner /> : <>
      

        <Link to="/profiles" className="btn btn-light">
          Retour aux profils
        </Link>

        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Editer votre profil</Link>)}

        <div className="profile-grid my-1">
          <ProfileTop profile={profile}/>
          <ProfileAbout profile={profile}/>
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">
              Livres
            </h2>
            {profile.book.length > 0 ? (<>
              {profile.book.map(book => (
                <ProfileBook key={book._id} book={book}/>
              ))}
            </>) : (<h4>Acun livre</h4>)}
          </div>
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">
              Education
            </h2>
            {profile.education.length > 0 ? (<>
              {profile.education.map(education => (
                <ProfileEducation key={education._id} education={education}/>
              ))}
            </>) : (<h4>Acune Ecole</h4>)}
          </div>
        </div>
      </>}
    </>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, {getProfileById})(Profile)
