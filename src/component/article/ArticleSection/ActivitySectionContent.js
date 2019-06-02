import React from 'react'
// import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
// import { HashLink as Link } from 'react-router-hash-link'

const ActivitySectionContent = props => (
  <>
    <h2>{props.bigSlogan}</h2>
    <h3>{props.midSlogan}</h3>
    <h4>
      <div>
        <div
          onClick={props.handleScrollToElement}
          style={{ cursor: 'pointer' }}
        >
          <span className="pr-1">{props.smallSlogan}</span>
          <i className="far fa-play-circle " />
        </div>
      </div>
    </h4>
  </>
)

export default ActivitySectionContent
