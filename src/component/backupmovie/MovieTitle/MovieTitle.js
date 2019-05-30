import React from 'react'

const MovieTitle = props => (
  <>
    <span
      style={{
        borderBottom: '2px solid #d4d1cc',
        fontSize: '28px',
      }}
    >
      {props.title}
    </span>
  </>
)

export default MovieTitle
