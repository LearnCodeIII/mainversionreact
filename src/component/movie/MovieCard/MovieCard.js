import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { blockStatement } from '@babel/types'
const MovieCard = props => (
  <>
    <div
      className="position-relative"
      style={{
        padding: '0',
        height: '400px',
        border: 'none',
        background: 'none',
        boxShadow: '0 2px 6px #191C20',
        cursor: 'pointer',
      }}
    >
      {props.collectOpen ? (
        props.isCollect ? (
          <i
            onClick={props.handleCollect}
            className="fas fa-bookmark position-absolute"
            style={{
              right: '10%',
              top: '10%',
              zIndex: '8',
              fontSize: '40px',
              color: '#ffa510',
            }}
          />
        ) : (
          <i
            onClick={props.handleCollect}
            className="far fa-bookmark position-absolute"
            style={{
              right: '10%',
              top: '10%',
              zIndex: '8',
              fontSize: '40px',
              color: '#ffa510',
            }}
          />
        )
      ) : (
        ''
      )}
      <LinkContainer to={'/movie/' + props.routerId + '/return'}>
        <div
          className="card activityCard"
          style={{
            height: '400px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <div className="card-header p-0" style={{ height: '300px' }}>
            <img
              style={{
                display: 'block',
                height: '400px',
                objectFit: 'cover',
                filter: 'brightness(70%)',
                zIndex: 0,
              }}
              src={props.imgSrc}
              className="card-img-top"
              alt="請重新載入"
            />
          </div>

          <div
            className="card-body"
            style={{
              height: '100px',
              backgroundColor: '#1f242a80',
              zIndex: 8,
              borderColor: 'none',
            }}
          >
            <h5 className="card-title text-center">{props.title}</h5>
            <p className="card-text text-center">{props.subtitle}</p>
          </div>
        </div>
      </LinkContainer>
    </div>
  </>
)

export default MovieCard
