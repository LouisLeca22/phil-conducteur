
import {useState} from "react";
import {Link} from "react-router-dom";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    console.log("sucess");
  }
 
  return (
    <>
      <h1 className="large text-primary">S'identifier</h1>
      <p className="lead"><i className="fas fa-user"></i> Connectez-vous à votre compte </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
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
        <input type="submit" className="btn btn-primary" value="S'identifier" />
      </form>
      <p className="my-1">
        Vous n'avez pas encore de compte compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </>
  )
}

export default Login;
