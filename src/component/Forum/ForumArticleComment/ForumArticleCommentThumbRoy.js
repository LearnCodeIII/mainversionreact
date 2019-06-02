import React from 'react'

const ForumArticleCommentThumbRoy = props => {
  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="media d-flex align-items-center ">
          <i
            className={
              props.commentlikeStatus
                ? 'fas fa-thumbs-up text-warning'
                : 'fas fa-thumbs-up text-light'
            }
            style={{ cursor: 'pointer' }}
            onClick={props.handleCommentLike}
          />
          <p className="text-light mx-2 my-0">{props.commentLike}</p>
        </div>
        <div className="media d-flex align-items-center ml-3">
          <i
            className={
              props.commentDislikeStatus
                ? 'fas fa-thumbs-down text-warning'
                : 'fas fa-thumbs-down text-light'
            }
            style={{ cursor: 'pointer' }}
            onClick={props.handleCommentDislike}
          />
          <p className="text-light mx-2 my-0">{props.commentDislike}</p>
        </div>
      </div>
    </>
  )
}

export default ForumArticleCommentThumbRoy
