import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom"

const EditProfile = ({profile: {profile, loading},createProfile, getCurrentProfile, history}) => {

  const [formData, setFormData] = useState({
    website: "",
    location: "",
    fields: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    period: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      period: loading || !profile.period ? "" : profile.period,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      fields: loading || !profile.fields ? "" : profile.fields.join(','),
      bio: loading || !profile.bio ? "" : profile.bio,
      facebook: loading || !profile.social.facebook ? "" : profile.social.facebook,
      twitter: loading || !profile.social.twitter ? "" : profile.social.twitter,
      instagram: loading || !profile.social.instagram ? "" : profile.scial.instagram,
      youtube: loading || !profile.social.youtube ? "" : profile.social.youtube,
      linkedin: loading || !profile.social.linkedin ? "" : profile.scial.linkedin,

    })
  },[loading, getCurrentProfile]);

  const {
    website,
    location, 
    fields,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    period
  } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);

  }
  return (
    <>
        <h1 className="large text-primary">
        Editez votre profil
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Ajoutez des informations pour vous démarquer
      </p>
      <small>* = Champs obligatoires</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Période d'activité" name="period" value={period} onChange={e => onChange(e)}/>
          <small className="form-text">
            Entrez une période d'activité, un siècle, une date </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Site web" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text">
            Entrez le nom de votre site web</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Lieu" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text">
            Ville, pays, région...
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Champs d'étude" name="fields" value={fields} onChange={e => onChange(e)} />
          <small className="form-text">Séparez les champs d'études par des virgules (eg.
            Métaphysique, Ethique, Epistémologie , Phénoménologie)</small>
        </div>
        <div className="form-group">
          <textarea placeholder="Une courte biographie" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Racontez votre vie</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Ajoutez des liens vers d'autres réseaux sociaux
          </button>
          <span>Facultatif</span>
        </div>
        
        {displaySocialInputs && <>
          <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Lien Twitter" name="twitter" value={twitter} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Lien Facebook" name="facebook" value={facebook} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="Lien YouTube" name="youtube" value={youtube} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Lien Linkedin" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Lien Instagram" name="instagram" value={instagram} onChange={e => onChange(e)} />
        </div>
        </>}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
      </form>
    </>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile})(withRouter(EditProfile))
