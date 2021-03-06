import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

const ProfileItem = ({profile: {user: {_id, name, avatar}, location, fields}}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img"  style={{height: "200px", widht:"200px"}}/>
      <div>
        <h2>{name}</h2>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          Voir le profil
        </Link>
      </div>
      <ul>
        {fields.slice(0,4).map((field, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {field}
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,

}

export default ProfileItem
