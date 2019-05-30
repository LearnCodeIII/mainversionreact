import React from 'react'
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaReply,
} from 'react-icons/fa'

import { ButtonToolbar, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'

const ArticleBtnGroup = props => {
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
            <div
              variant="secondary"
              className="my-3"
              onClick={props.handleMarkClick}
            >
              <FaBookmark />
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement={'left'}
            overlay={<Tooltip id={`tooltip-${'left'}`}>按讚此篇文章</Tooltip>}
          >
            <div
              variant="secondary"
              className="my-3"
              onClick={props.handleLikeClick}
            >
              <FaThumbsUp />
            </div>
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
            <div variant="secondary" className="my-3">
              <FaReply />
            </div>
          </OverlayTrigger>
        </ButtonToolbar>
      </div>
    </>
  )
}

export default ArticleBtnGroup
