import React from 'react'
// import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import { HashLink as Link } from 'react-router-hash-link'

const CinemaSectionContent = props => {
  return (
    <>
      <h2>{props.bigSlogan}</h2>
      <h3>{props.midSlogan}</h3>
      <h4>
        <div>
          <Link
            to={props.pagename + props.pageid}
            className="mt-5 row justify-content-center"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div className="col-8 d-flex flex-column align-items-center">
              <span
                className="pr-1 mt-5 mb-1 text-center"
                style={{ lineHeight: '35px' }}
              >
                {props.smallSlogan}
              </span>
              <i className="far fa-play-circle mt-3" />
            </div>
          </Link>
        </div>
      </h4>
    </>
  )
}

export default CinemaSectionContent
