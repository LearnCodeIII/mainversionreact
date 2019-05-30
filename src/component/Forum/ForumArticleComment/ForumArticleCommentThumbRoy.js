import React from 'react'

const ForumArticleCommentThumbRoy = props => {
  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="media d-flex align-items-center ">
          <i className="fas fa-thumbs-up text-light" />
          <p className="text-light mx-2 my-0">{props.commentLike}</p>
        </div>
        <div className="media d-flex align-items-center ml-3">
          <i className="fas fa-thumbs-down text-light" />
          <p className="text-light mx-2 my-0">{props.commentDislike}</p>
        </div>
      </div>
    </>
  )
}

export default ForumArticleCommentThumbRoy
