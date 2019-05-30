import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import './article.css';
import { BrowserRouter as Link } from 'react-router-dom'
import Goback from '../ArticleList/ArticleButton/Goback'
import {
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaEye,
  FaHeart,
  FaBookmark,
} from 'react-icons/fa'

import { MdFavorite } from 'react-icons/md'

// 留言部分

class ViewPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var articlePageImg = {
      // width: '100%',
      height: '30vw',
      backgroundImage: 'url(' + this.props.pageImg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }
    return (
      <>
        <Row className="my-2 justify-content-md-center">
          <Col md={8} sm={12} className="box-shadow">
            <div class="mb-3 p-5">
              <div
                className="my-4 d-flex justify-content-center"
                style={articlePageImg}
              >
                {/* <img
                  src={this.props.pageImg}
                  className=""
                  style={{ width: 800 }}
                  alt="..."
                /> */}
              </div>
              <div className="row d-flex justify-content-between align-items-center">
                <h5 className="card-title">{this.props.title}</h5>
                {this.props.isMarked ? (
                  <div type="" className="">
                    <FaBookmark className="mb-3 h5 text-warning" />
                  </div>
                ) : (
                  <div type="" className="">
                    {/* 加入點閱的func */}
                    <FaBookmark
                      className="mb-3 h5"
                      // onClick={() => this.handleClick()}
                    />
                  </div>
                )}
              </div>
              <div className="row d-flex justify-content-between align-items-center">
                <div class="card-text">
                  <small class="text-muted">{this.props.date}</small>{' '}
                  <small class="text-muted">{this.props.author}</small>
                </div>
                <div className="row d-flex justify-content-between align-items-center">
                  {' '}
                  {this.props.isLiked}
                  <div className="ml-3">
                    {/* 我是愛心 LIKE <3 */}
                    {this.props.isLiked ? (
                      <FaHeart className="mb-1 mr-1 text-danger" />
                    ) : (
                      <FaHeart className="mb-1 mr-1" />
                    )}
                    {this.props.likeCounter}
                  </div>
                  {/* 我是眼睛 views <O> */}
                  <div className="ml-3">
                    <FaEye
                      className="mb-1 mr-1"
                      onClick={() => this.props.handleClick(1)}
                      type="button"
                    />
                    {this.props.viewCounter}
                  </div>
                </div>
              </div>
              {/* 危險的引入 innerHTML 方法 */}
              <div className="mt-3">
                <p
                  class="card-text"
                  dangerouslySetInnerHTML={{ __html: this.props.content }}
                />
              </div>
            </div>
            <Goback />
          </Col>
        </Row>
      </>
    )
  }
}

export default ViewPage
