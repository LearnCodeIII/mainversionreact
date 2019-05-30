import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const MoviePageSectionContent = props => (
  <>
    <div style={{ width: '500px' }}>
      <h2 className="mb-5">{props.theater}</h2>
      <h3 className="mb-5">{props.title}</h3>
      <h4>{props.content}</h4>
    </div>
  </>
)

export default MoviePageSectionContent
