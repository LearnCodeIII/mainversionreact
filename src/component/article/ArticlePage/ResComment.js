import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ArticleLike from '../ArticleList/ArticleButton/Like'

const ResComment = props => {
  return (
    <>
      <div className="row justify-content-end">
        <Col md={10} xs={12} className="">
          <div class="media">
            <div class="media-body d-flex py-4">
              <Col xs={4} md={2} className="row">
                <div className="avatar mr-3">
                  <img
                    src={'/images/member/' + props.avatar}
                    className="mr-3"
                    alt="..."
                  />
                </div>
                <div>
                  <div>{props.author}</div>
                  <div>{props.date}</div>
                </div>
              </Col>
              <Col md={'auto'} xs={8} className="">
                {props.content}
              </Col>
            </div>
            {/* <div className="commentGroup">讚</div> */}
          </div>
        </Col>
      </div>
    </>
  )
}

export default ResComment
