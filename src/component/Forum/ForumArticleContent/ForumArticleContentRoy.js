import React from 'react'
// import { Link } from 'react-router-dom'
import ForumArticleAvatarRoy from '../ForumArticleAvatarRoy'
import ForumArticleContentTiltleRoy from './ForumArticleContentTiltleRoy'
import ForumArticleContentDateRoy from './ForumArticleContentDateRoy'

const ForumArticleContentRoy = props => {
  // console.log(sessionStorage.getItem('memberId'))
  // 用來抓coockie的名稱經過次串處理
  function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  // console.log(props.forumNameId)
  // console.log(sessionStorage.getItem('memberId'))
  // console.log(props.forumNameId === sessionStorage.getItem('memberId'))
  // console.log(props.articleeID.toString())
  // console.log(getCookie('username').split(','))
  // console.log(
  //   getCookie('username')
  //     .split(' ')
  //     .indexOf(props.articleeID)
  // )

  // console.log(sessionStorage.getItem('memberId'))
  // 確認目前收藏狀態的陣列，如我抓不到藥讓第一次渲染先回RENDER<></>
  const collectall = props.collectStatus
  // console.log(props.contentSpoiler)
  // console.log(props.articleShow)
  // if (sessionStorage.getItem('memberId') !== null) {
  const nowSession = sessionStorage.getItem('memberId')
  // 比對陣列中有沒有符合的的session
  const findMmber = collectall.indexOf(nowSession)
  // }
  // console.log(props.articleeID)
  return (
    <>
      <div
        className="position-absolute"
        style={{ right: '50px', top: '10px', zIndex: '8', cursor: 'pointer' }}
      >
        <i
          // 避免不是會員的人可以進行操作
          onClick={props.handleCollect}
          className={
            // 確認目前收藏狀態，這邊文章所有蒐藏者陣列中找
            findMmber === -1 ? 'far fa-bookmark ' : 'fas fa-bookmark '
          }
          style={{
            fontSize: '32px',
            color: '#ffa510',
          }}
        />
      </div>
      <div className="d-flex position-relative">
        <ForumArticleContentTiltleRoy
          handleHeadlineEditSave={props.handleHeadlineEditSave}
          handleHeadlineEditCancel={props.handleHeadlineEditCancel}
          handleHeadlineEditKeyboardControl={
            props.handleHeadlineEditKeyboardControl
          }
          // 確認是否有點擊編輯文章標按鈕
          handleHeadlineEditTrigger={props.handleHeadlineEditTrigger}
          contentheadline={props.contentheadline}
          contentheadlineId={props.contentheadlineId}
          // 傳送是否可編輯部林值確認是否啟動編輯
          handleHeadlineEditStatus={props.handleHeadlineEditStatus}
          HeadlineEditBtnStatus={props.HeadlineEditBtnStatus}
          HeadlineSaveBtnStatus={props.HeadlineSaveBtnStatus}
          HeadlineCancelBtnStatus={props.HeadlineCancelBtnStatus}
          // 將登入id狀態傳下去
          forumNameId={props.forumNameId}
        />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <ForumArticleAvatarRoy
          contentUserAvatar={props.contentUserAvatar}
          contentUserName={props.contentUserName}
          // 圖片路徑前墜
          avatarPath={props.avatarPath}
          articleCreateTimeCount={props.articleCreateTimeCount}
          forumCreateTimeCount={props.forumCreateTimeCount}
        />
        <div className="">
          <div className={'d-flex justify-content-end my-3 '}>
            <div
              className={
                'justify-content-end d-flex align-items-center  ' +
                props.ArticleCancelBtnStatus
              }
            >
              <button
                className={
                  'btn my-0 mr-0  btn-outline-warning  ' +
                  props.ArticleCancelBtnStatus
                }
                onClick={
                  props.forumNameId === sessionStorage.getItem('memberId')
                    ? props.handleArticleEditCancel
                    : ''
                }
              >
                取消
              </button>
            </div>
            <div
              className={
                'justify-content-end d-flex align-items-center ml-2 ' +
                props.ArticleEditBtnStatus
              }
            >
              <button
                className={
                  'btn my-0 mr-0 btn-outline-warning ' +
                  props.ArticleEditBtnStatus +
                  '' +
                  // 判斷seesion
                  (props.forumNameId === sessionStorage.getItem('memberId')
                    ? ''
                    : 'd-none')
                }
                onClick={
                  props.forumNameId === sessionStorage.getItem('memberId')
                    ? props.handleArticleEditTrigger
                    : ''
                }
              >
                編輯
              </button>
            </div>
            <div
              className={
                'justify-content-end d-flex  align-items-center mr-2 ' +
                props.ArticleSaveBtnStatus
              }
            >
              <button
                className={
                  'btn my-0 mr-0 btn-outline-warning ' +
                  props.ArticleSaveBtnStatus
                }
                onClick={
                  props.forumNameId === sessionStorage.getItem('memberId')
                    ? props.handleArticleEditSave
                    : ''
                }
              >
                儲存
              </button>
            </div>
            <div className="justify-content-end d-flex align-items-center ">
              <button
                className={
                  'btn my-0 mr-0  btn-outline-warning   ' +
                  '' +
                  // 判斷seesion
                  (props.forumNameId === sessionStorage.getItem('memberId')
                    ? ''
                    : 'd-none')
                }
                onClick={
                  // 判斷seesion
                  props.forumNameId === sessionStorage.getItem('memberId')
                    ? props.handleArticleDelete
                    : ''
                }
              >
                刪除
              </button>
            </div>
          </div>
          <ForumArticleContentDateRoy
            contentIssueDate={props.contentIssueDate}
          />
        </div>
      </div>
      <div className="my-4">
        {/* 路徑前墜+後墜 */}
        <img
          src={props.avatarPath + props.contentArticlePic}
          className="h-100 w-100"
          alt=""
        />
      </div>
      <p
        id={'contentArticleId' + props.contentheadlineId}
        className="text-light my-4 "
        // hidden="hidden"
        // 將文字內容tag用html方式render到頁面
        // dangerouslySetInnerHTML={{ __html: props.contentReview }}
        // 判讀cocckie是否有在決定要不要帶入值，避免用HIDDEN，HTML還是可以看到內容
        dangerouslySetInnerHTML={{
          __html:
            // coockie字串經過分割成不同ID的陣列然後判讀是不是和當篇文章一樣，找不到就回傳-1繼續判讀
            // 找到就直接顯示內容，同時也要符合是否為發文者，發文者不必影藏內容
            props.forumNameId !== sessionStorage.getItem('memberId') &&
            getCookie('username')
              .split(',')
              .indexOf(props.articleeID.toString()) === -1
              ? // 判斷玩coockie代表使用者點過了可以直接看
                // 如果沒有看過就再再判斷是否暴雷
                props.contentSpoiler === true
                ? // 如果是有爆雷的內容就不顯示，判斷爆雷後再判斷是否有被使用者點顯示內容的按鈕
                  props.articleShow === true
                  ? props.contentReview
                  : ''
                : props.contentReview
              : props.contentReview,
        }}
        contentEditable={props.handleArticleEditStatus}
        // 關閉警告在REACT控制範圍內變更實體DOM產生的警告
        suppressContentEditableWarning={true}
        // 沒有ONFOCUS就取消編輯狀態
        // onBlur={props.handleArticleEditCancel}
      />
      <div
        className="m-0 p-0 w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          transition: '0.5s',
          // 要在handleClick控制切換文章後馬上把articleShow設回FALSE
          height:
            props.forumNameId !== sessionStorage.getItem('memberId') &&
            getCookie('username')
              .split(',')
              .indexOf(props.articleeID.toString()) === -1
              ? props.contentSpoiler === true
                ? props.articleShow === true
                  ? '0'
                  : '300px'
                : '0'
              : '0',
        }}
        hidden=""
      >
        <div
          className="p-5 m-o"
          hidden={
            props.forumNameId !== sessionStorage.getItem('memberId') &&
            getCookie('username')
              .split(',')
              .indexOf(props.articleeID.toString()) === -1
              ? props.contentSpoiler === true
                ? props.articleShow === true
                  ? 'hidden'
                  : ''
                : 'hidden'
              : 'hidden'
          }
        >
          <h3>內有劇透，確認是否顯示內容?</h3>
        </div>
        <div>
          {/* <Link to="/LoginSign"> */}
          <button
            className="btn btn-warning"
            hidden={
              props.forumNameId !== sessionStorage.getItem('memberId') &&
              getCookie('username')
                .split(',')
                .indexOf(props.articleeID.toString()) === -1
                ? props.contentSpoiler === true
                  ? props.articleShow === true
                    ? 'hidden'
                    : ''
                  : 'hidden'
                : 'hidden'
            }
            onClick={props.handleSpoilerShow}
          >
            顯示內容
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default ForumArticleContentRoy
