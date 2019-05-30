import React from 'react'

const MovieSearchbarTitle = props => (
  <>
    <span
      className={props.spanClass}
      style={{
        fontSize: '24px',
        color: '#d4d1cc',
        border: 'none',
        cursor: 'default',
      }}
    >
      {props.title}
    </span>
  </>
)

export default MovieSearchbarTitle
