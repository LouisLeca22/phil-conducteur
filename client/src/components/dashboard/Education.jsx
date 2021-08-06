import {Connect} from "react-redux"
import PropTypes from 'prop-types'


const Education = ({education}) => {

  const educations = education.map(e => (
    <tr key={e._id}>
      <td>{e.school}</td>
      <td>
        <button className="btn btn-danger">Supprimer</button>
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
}

export default Education
