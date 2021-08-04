import {Link} from "react-router-dom";
import {useState} from "react";

function Register() {

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
      console.log("passwords do not match")
    } else {
     console.log("success")
    }
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
            required 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Adresse e-mail" 
            required
            name="email" 
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            required
            name="password"
            value={password}
            minLength="6"
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            required
            name="password2"
            value={password2}
            minLength="6"
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

export default Register
