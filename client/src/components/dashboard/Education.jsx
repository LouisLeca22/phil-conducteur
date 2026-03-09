import {connect} from "react-redux"
import PropTypes from 'prop-types'
import { deleteEducation } from "../../actions/profile"

const Education = ({education, deleteEducation}) => {

  const educations = education.map(e => (
    <tr key={e._id}>
      <td>{e.school}</td>
      <td>
        <button onClick={() => deleteEducation(e._id)} className="btn btn-danger">Supprimer</button>
      </td>
    </tr>
  ))

  return (
    <>
      <h2 className="my-2">Infos Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ecole</th>
            <th />
          </tr>
        </thead>
        <tbody>
            {educations}
        </tbody>
      </table>
    </>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)
