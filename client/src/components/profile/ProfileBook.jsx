import React from 'react'
import PropTypes from 'prop-types'

const ProfileBook = ({book: {
  title,
  description
}}) => {
  return (
    <div>
      <h3 className="text-dark">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

ProfileBook.propTypes = {
  book: PropTypes.array.isRequired,
}

export default ProfileBook
