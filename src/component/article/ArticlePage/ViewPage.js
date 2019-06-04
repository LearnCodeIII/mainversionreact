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
  FaRegBookmark,
} from 'react-icons/fa'

import { MdFavorite } from 'react-icons/md'
import ArticleBtnGroup from '../ArticleList/ArticleButton/ArticleBtnGroup'
import ArticleCommentInput from './ArticleCommentInput'
import { async } from 'q'

const memberId = sessionStorage.getItem('memberId')

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
        <Row className="mt-5 pt-5 justify-content-center">
          <Col md={8} sm={12} className="box-shadow">
            <div class="mb-3 p-3">
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
                    <FaBookmark
                      className="mb-3 h5 text-warning"
                      onClick={this.props.handleMarkClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ) : (
                  <div type="" className="">
                    {/* 加入點閱的func */}
                    <FaRegBookmark
                      className="mb-3 h5 text-warning"
                      onClick={this.props.handleMarkClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>
              <div className="row d-flex justify-content-between align-items-center">
                <div className="card-text">
                  <small className="text-muted mx-2">{this.props.date}</small>{' '}
                  <small className="text-muted">{this.props.author}</small>
                </div>
                <div className="row d-flex justify-content-between align-items-center">
                  {' '}
                  {/* {this.props.isLiked} */}
                  <div className="ml-3">
                    {/* 我是愛心 LIKE <3 */}
                    {this.props.isLiked ? (
                      <FaHeart
                        className="mb-1 mr-1 text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={this.props.handleLikeClick}
                      />
                    ) : (
                      <FaHeart
                        className="mb-1 mr-1"
                        style={{ cursor: 'pointer' }}
                        onClick={this.props.handleLikeClick}
                      />
                    )}
                    {this.props.likeCounter}
                  </div>
                  {/* 我是眼睛 views <O> */}
                  <div className="ml-3">
                    <FaEye className="mb-1 mr-1" />
                    {this.props.viewCounter}
                  </div>
                  {/* 我是分享 */}
                  {/* <div className="ml-3">
                    <FaShareSquare
                      className="mb-1 mr-1"
                      onClick={() => this.props.handleClick(1)}
                    />
                    分享
                  </div> */}
                </div>
              </div>
              {/* --------------我是內文---------------危險的引入 innerHTML 方法 */}
              <div className="mt-3">
                <p
                  className="card-text px-2"
                  dangerouslySetInnerHTML={{ __html: this.props.content }}
                  style={{ lineHeight: 2.5 }}
                />
              </div>
            </div>
            <div className="justify-content-center">
              {/* --------------------我是留言輸入區+----------------- */}
              <ArticleCommentInput
                sid={this.props.sid}
                handleRender={this.props.handleRender}
                goComment={this.props.goComment}
                handleChange={this.props.handleChange}
                inputText={this.props.inputText}
              />
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default ViewPage
