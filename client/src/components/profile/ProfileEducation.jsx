import React from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({education: {
  school,
  description
}}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>{description}</p>
    </div>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
}

export default ProfileEducation;
