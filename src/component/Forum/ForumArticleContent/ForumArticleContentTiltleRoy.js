import React from 'react'

const ForumArticleContentTiltleRoy = props => {
  // console.log(props.contentheadlineId)
  return (
    <div className=" d-flex align-items-center justify-content-between">
      <div className=" my-4 text-center text-light border-bottom border-light  ">
        <h4
          id={'contentheadlineId' + props.contentheadlineId}
          onKeyPress={props.handleHeadlineEditKeyboardControl}
          className="text-light "
          // 關閉警告在REACT控制範圍內變更實體DOM產生的警告
          suppressContentEditableWarning={true}
          // 一定要把true false設為字串傳，contenteditable如果只給boolean不會顯示
          contentEditable={props.handleHeadlineEditStatus}
          // maxlength="20"
          // style={{ whiteSpace: 'nowrap' }}
          // dangerouslySetInnerHTML={{ __html: props.contentheadline }}
          required
          // 離開FOCUS就取消可編輯狀態
          // onBlur={props.handleHeadlineEditCancel}
        >
          {unescape(props.contentheadline)}
        </h4>
      </div>
      <div className="d-flex align-items-center pb-2">
        <div className="justify-content-end d-flex align-items-center ">
          <button
            className={
              'btn my-0 mr-0 btn-outline-warning  ' +
              props.HeadlineCancelBtnStatus
            }
            // 如果不是登入者不可觸發功能
            onClick={
              props.forumNameId === sessionStorage.getItem('memberId')
                ? props.handleHeadlineEditCancel
                : ''
            }
          >
            取消
          </button>
        </div>
        <div className="justify-content-end d-flex align-items-center  ">
          <button
            className={
              'btn my-0 mr-0  btn-outline-warning  ' +
              props.HeadlineEditBtnStatus +
              '' +
              // 驗證session
              (props.forumNameId === sessionStorage.getItem('memberId')
                ? ''
                : 'd-none')
            }
            onClick={
              // 如果不是登入者不可觸發功能
              props.forumNameId === sessionStorage.getItem('memberId')
                ? props.handleHeadlineEditTrigger
                : ''
            }
          >
            編輯
          </button>
        </div>
        <div className="justify-content-end d-flex  align-items-center  ">
          <button
            className={
              'btn btn-outline-warning my-0 mr-0 ' + props.HeadlineSaveBtnStatus
            }
            onClick={
              // 如果不是登入者不可觸發功能
              props.forumNameId === sessionStorage.getItem('memberId')
                ? props.handleHeadlineEditSave
                : ''
            }
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForumArticleContentTiltleRoy
