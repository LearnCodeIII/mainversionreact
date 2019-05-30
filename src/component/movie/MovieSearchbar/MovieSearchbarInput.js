import React from 'react'

const MovieSearchbarInput = props => (
  <>
    <input
      className="activitySearch"
      type="text"
      value={props.value}
      onChange={props.handleOnChange}
      onKeyDown={props.handleOnKeyDown}
      placeholder={props.placeholder}
      style={{
        background: 'inherit',
        padding: '4px',
        border: '2px solid #ffa510',
        borderRadius: '4px',
        color: '#ffa510',
        fontSize: '24px',
        textAlign: 'center',
      }}
    />
  </>
)

export default MovieSearchbarInput
