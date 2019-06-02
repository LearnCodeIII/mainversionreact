import React from 'react'

const ForumArticleAvatarRoy = props => {
  // console.log(props)
  return (
    <>
      <div className="media d-flex align-items-center ">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: '75px', height: '75px' }}
        >
          <img
            src={props.avatarPath + props.commentAvatar}
            className="h-100 w-100 align-self-center mr-3"
            alt=""
          />
        </div>
        <div className="media-body border-0">
          <p className="text-light m-3">{props.commentUserName}</p>
          <p className="text-light m-3">{props.commentCreateTimeCount}</p>
        </div>
      </div>
    </>
  )
}

export default ForumArticleAvatarRoy
