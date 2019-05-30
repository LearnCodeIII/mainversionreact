import React from 'react'
import MovieCardBox from './MovieCardBox'
import MovieCardCollection from './MovieCardCollection'

const MovieCard = props => {
  return (
    <div className="col-3">
      <div className="position-relative mx-auto" style={{ width: '250px' }}>
        <MovieCardBox
          title={props.title}
          subtitle={props.subtitle}
          img={props.img}
        />
        <MovieCardCollection
          collectionIcon={props.collectionIcon}
          collectionClick={props.collectionClick}
          collection={props.collection}
        />
      </div>
    </div>
  )
}
export default MovieCard
