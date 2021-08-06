import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {deleteBook} from "../../actions/profile"


const Book = ({book, deleteBook}) => {

  const books = book.map(b => (
    <tr key={b._id}>
      <td>{b.title}</td>
      <td>
        <button onClick={() => deleteBook(b._id)} className="btn btn-danger">Supprimer</button>
      </td>
    </tr>
  ))

  return (
    <>
      <h2 className="my-2">Infos livre</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Book</th>
            <th />
          </tr>
        </thead>
        <tbody>
            {books}
        </tbody>
      </table>
    </>
  )
}

Book.propTypes = {
  book: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
}

export default connect(null, {deleteBook})(Book)
