import {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addEducation} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom";

const AddEducation = ({addEducation, history}) => {

  const [formData, setFormData] = useState({
    school: "",
    description: ""
  })

  const {school, description} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
 

  return (
    <>
      <h1 className="large text-primary">
       Ajouter une éducation
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Ajouter toutes les écoles auxquelles vous vous êtes formés
      </p>
      <small>* = champs obligatoires</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addEducation(formData, history)
      }}>
        <div className="form-group">
          <input type="text" placeholder="*Nom de l'école" name="school" required  value={school} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Résumé de l'ouvrage"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
      </form>
    </>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))
