import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const MovieCard = props => {
  return (
    <>
      <Col className="my-3">
        <Link to={props.link} className="text-decoration-none text-muted">
          <Card style={{ width: '100%' }}>
            <Card.Header
              style={{
                width: '100%',
                overflow: 'hidden',
                height: '316px',
              }}
              className="p-0 m-0"
            >
              <Card.Img
                variant="bottom"
                src={props.img}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 0,
                }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>{props.text}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  )
}

export default MovieCard
