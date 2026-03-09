
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
  bio,
  fields,
  user: {name}
}}) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <>
        <h2 class="text-primary">Biographie de {name}</h2>
        <p>
          {bio}
        </p>
        <div class="line"></div>
        </>
      )}

  
    <h2 class="text-primary">Champs d'investigation</h2>
    <div class="skills">
        {fields.map((field, index) =>  (
          <div key={index} className="p-1">
            <i className="fas fa-check"></i> {field}
          </div>
        ))}
    </div>
  </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
