import React from 'react'
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaRegBookmark,
  FaReply,
  FaHeart,
} from 'react-icons/fa'

import { ButtonToolbar, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'

class ArticleBtnGroup extends React.Component {
  constructor(props) {
    super(props)
    this.handleGoBack = this.handleGoBack.bind(this)
  }

  // 返回上一頁套餐

  handleGoBack = () => {
    window.location.href = '/article'
  }

  render() {
    return (
      <>
        <div className="btnGroupV text-light btn-group-vertical d-flex justify-content-start">
          {/* <button className="btn textColor1">
          <FaBookmark onClick={props.handleMarkClick} title="加入收藏" />
        </button>
        <button className="btn textColor1">
          <FaThumbsUp title="按讚此篇文章" />
        </button>
        <button className="btn textColor1">
          <FaShareSquare title="分享" />
        </button>
        <button className="btn textColor1">
          <FaReply title="返回列表" />
        </button> */}
          <ButtonToolbar className="d-flex flex-column m-3">
            <OverlayTrigger
              className=""
              placement={'left'}
              overlay={<Tooltip id={`tooltip-${'left'}`}>加入收藏</Tooltip>}
            >
              {this.props.isMarked ? (
                <div type="" className="">
                  <FaBookmark
                    className="my-4  text-warning"
                    onClick={this.props.handleMarkClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              ) : (
                <div type="" className="">
                  {/* 加入點閱的func */}
                  <FaRegBookmark
                    className="my-4 text-warning"
                    onClick={this.props.handleMarkClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </OverlayTrigger>
            <OverlayTrigger
              placement={'left'}
              overlay={<Tooltip id={`tooltip-${'left'}`}>按讚此篇文章</Tooltip>}
            >
              {this.props.isLiked ? (
                <FaHeart
                  className="mr-1 text-danger my-3"
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.handleLikeClick}
                />
              ) : (
                <FaHeart
                  className="mr-1"
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.handleLikeClick}
                />
              )}
            </OverlayTrigger>
            {/* 分享 暫無功能 */}
            {/* <OverlayTrigger
            placement={'left'}
            overlay={<Tooltip id={`tooltip-${'left'}`}>分享</Tooltip>}
          >
            <Button variant="secondary">
              <FaShareSquare />
            </Button>
          </OverlayTrigger> */}
            <OverlayTrigger
              placement={'left'}
              overlay={<Tooltip id={`tooltip-${'left'}`}>返回列表</Tooltip>}
            >
              <div
                variant="secondary"
                className="my-3"
                onClick={this.handleGoBack}
              >
                <FaReply style={{ cursor: 'pointer' }} />
              </div>
            </OverlayTrigger>
          </ButtonToolbar>
        </div>
      </>
    )
  }
}

export default ArticleBtnGroup
