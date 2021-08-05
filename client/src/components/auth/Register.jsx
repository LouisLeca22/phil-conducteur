import {Link, Redirect} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert"
import {register} from "../../actions/auth"
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert("Les mots de passe ne correspondent pas", "danger")
    } else {
      register({name, email, password});
    }
  }
 

  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }
  return (
    <>
      <h1 className="large text-primary">S'inscrire</h1>
      <p className="lead"><i className="fas fa-user"></i> Créez votre compte</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Nom" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Adresse e-mail" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="S'inscrire" />
      </form>
      <p className="my-1">
        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated:  state.auth.isAuthenticated
})


export default connect(mapStateToProps, {setAlert, register})(Register);
