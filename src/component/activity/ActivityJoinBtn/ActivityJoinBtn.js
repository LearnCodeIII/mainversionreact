import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const ActivityJoinBtn = props => (
  <>
    <LinkContainer to={'/activity/join/' + props.id}>
      <button
        type="button"
        className="btn btn-warning px-3"
        onClick={props.handleOnClick}
      >
        立即報名
      </button>
    </LinkContainer>
  </>
)

export default ActivityJoinBtn
