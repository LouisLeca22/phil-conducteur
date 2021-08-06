import {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addBook} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom";

const AddBook = ({addBook, history}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const {title, description} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
 

  return (
    <>
      <h1 className="large text-primary">
       Ajouter un livre
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Ajouter tous les ouvrages, articles que vous avez écrits.
      </p>
      <small>* = champs obligatoires</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addBook(formData, history)
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Titre du livre" name="title" required  value={title} onChange={e => onChange(e)}/>
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

AddBook.propTypes = {
  addBook: PropTypes.func.isRequired,
}

export default connect(null, {addBook})(withRouter(AddBook))
