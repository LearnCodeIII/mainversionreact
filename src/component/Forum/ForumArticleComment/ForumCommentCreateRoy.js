import React from 'react'

const ForumCommentCreateRoy = props => {
  return (
    <>
      <button
        type="button"
        className="btn m-0 btn-outline-warning"
        onClick={props.handleCommentInput}
      >
        留言
      </button>
    </>
  )
}

export default ForumCommentCreateRoy
