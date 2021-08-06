import {Connect} from "react-redux"
import PropTypes from 'prop-types'


const Book = ({book}) => {

  const books = book.map(b => (
    <tr key={b._id}>
      <td>{b.title}</td>
      <td>
        <button className="btn btn-danger">Supprimer</button>
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
}

export default Book
