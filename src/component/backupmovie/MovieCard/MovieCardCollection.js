import React from 'react'
const MovieCardCollection = props => {
  console.log(props)
  return (
    <>
      {props.collectionIcon ? (
        props.collection === 'true' ? (
          <a
            onClick={props.collectionClick}
            className="position-absolute"
            //下方style轉放scss
            style={{
              top: '35px',
              right: '20px',
              fontSize: '25px',
              cursor: 'pointer',
              color: '#ffa510',
            }}
          >
            <i className="fas fa-bookmark" />
          </a>
        ) : (
          <a
            onClick={props.collectionClick}
            className="position-absolute"
            //下方style轉放scss
            style={{
              top: '35px',
              right: '20px',
              fontSize: '25px',
              cursor: 'pointer',
              color: '#ffa510',
            }}
          >
            <i className="far fa-bookmark" />
          </a>
        )
      ) : (
        ''
      )}
    </>
  )
}
export default MovieCardCollection
