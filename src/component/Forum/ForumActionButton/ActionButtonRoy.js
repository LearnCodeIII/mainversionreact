import React from 'react'

const ActionButtonRoy = props => (
  <button type="button" className="btn btn-outline-warning px-3  m-0">
    <i className={props.buttonIcon}> {props.buttonText}</i>
  </button>
)

export default ActionButtonRoy
