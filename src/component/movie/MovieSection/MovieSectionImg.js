import React from 'react'

const MovieSectionImg = props => (
  <>
    <img
      className="img-fluid"
      style={{
        width: '100%',
      }}
      alt=""
      src={props.pictureSrc}
    />
  </>
)

export default MovieSectionImg
