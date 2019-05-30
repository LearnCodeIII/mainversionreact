import React from 'react'
import MoviePageSectionImg from './MoviePageSectionImg'
import MoviePageSectiontent from './MoviePageSectionContent'

const MovieSection = props => (
  <>
    <div className="position-relative">
      <MoviePageSectionImg pictureSrc={props.HeroImage} />
      <div
        className="position-absolute d-flex flex-column align-items-center justify-content-center"
        style={{
          top: '0',
          bottom: '0',
          left: '120px',
          textShadow: '0 0 10px black',
        }}
      >
        <MoviePageSectiontent
          theater={props.theater}
          title={props.title}
          content={props.content}
        />
      </div>
    </div>
  </>
)

export default MovieSection
