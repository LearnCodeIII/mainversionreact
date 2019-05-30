import React from 'react'
import MovieSectionImg from './MovieSectionImg'
import MovieSectionContent from './MovieSectionContent'

const MovieSection = props => (
  <>
    <div className="position-relative">
      <MovieSectionImg pictureSrc={props.pictureSrc} />
      <div
        className="position-absolute d-flex flex-column align-items-center justify-content-center"
        style={{
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          textShadow: '0 0 10px black',
        }}
      >
        <MovieSectionContent
          bigSlogan={props.bigSlogan}
          midSlogan={props.midSlogan}
          smallSlogan={props.smallSlogan}
        />
      </div>
    </div>
  </>
)

export default MovieSection
