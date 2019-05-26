import React from 'react'

const ActivitySearchbarContent = props => (
  <>
    <span className={"mr-3 "+props.className} onClick={props.handleOnClick}>{props.content}</span>
  </>
)

export default ActivitySearchbarContent
