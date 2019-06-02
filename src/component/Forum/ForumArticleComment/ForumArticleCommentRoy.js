import React from 'react'
import ForumCommentAvatarRoy from './ForumCommentAvatarRoy'
import ForumArticleCommentThumbRoy from './ForumArticleCommentThumbRoy'

const ForumArticleCommentRoy = props => {
  // console.log(props)
  return (
    <>
      {/* 設計一個ID給刪除留言時抓ID用 */}
      <div className="my-5 " id={props.forumCommentId + 'nowCommentId'}>
        <div className="d-flex my-4 justify-content-between align-items-end ">
          <ForumCommentAvatarRoy
            commentUserName={props.commentUserName}
            commentAvatar={props.commentAvatar}
            // 照片路徑前墜
            avatarPath={props.avatarPath}
            commentCreateTimeCount={props.commentCreateTimeCount}
          />
          <div className="">
            <div className="justify-content-end d-flex align-items-center  ml-2 my-2">
              <button
                className={
                  // 控制不符合的ID不顯示刊除按鈕
                  props.forumCommentUserId ===
                  sessionStorage.getItem('memberId')
                    ? 'btn btn-outline-warning m-0'
                    : 'btn btn-outline-warning m-0 d-none'
                }
                onClick={
                  // 判斷SEESON控制不能刪別人留言
                  props.forumCommentUserId ===
                  sessionStorage.getItem('memberId')
                    ? props.handleCommentDelete
                    : ''
                }
              >
                刪除
              </button>
            </div>
            {/* <div className="m-o p-0">
              <ForumArticleCommentThumbRoy
                handleCommentLike={props.handleCommentLike}
                handleCommentDislike={props.handleCommentDislike}
                commentLike={props.commentLike}
                commentDislike={props.commentDislike}
                commentlikeStatus={props.commentlikeStatus}
                commentDislikeStatus={props.commentDislikeStatus}
              />
            </div> */}
          </div>
        </div>
        <div className="text-light ">
          <p
            className="m-0"
            // 將文字內容tag用html方式render到頁面
            dangerouslySetInnerHTML={{ __html: props.commentComment }}
          />
        </div>
      </div>
    </>
  )
}

export default ForumArticleCommentRoy
