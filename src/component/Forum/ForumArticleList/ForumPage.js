import React from 'react'
// 如果指引入LINK箭頭會沒有顯示手指
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const ForumPage = props => {
  // 先預設空白陣列，沒放會炸
  // const a =
  // console.log(props.nowPage[0].id)
  // console.log(props.currentPage)
  // console.log(props.currentPage < props.ForumTotalPages)
  var ForumTotalPages = []
  for (let i = 1; i <= props.ForumTotalPages; i++) {
    // 迴圈將數值引入陣列 並且push    需有**key**
    ForumTotalPages.push(
      <Link
        // 接上層的頁碼然後迴圈設定連結都會是10的倍數+1
        to={'/forum/' + props.cuerrenPageFirstData[(i - 1) * 10].id}
        className="text-warning m-0 p-0"
        // 每當典籍將目前頁面的頁設進state
      >
        <div
          style={{ width: '40px', height: '40px' }}
          className={
            props.currentPage === i
              ? 'btn-warning btn  my-0 mx-1 px-0 py-2 rounded  text-center d-flex justify-content-center align-content-center'
              : 'btn-outline-warning btn  my-0 mx-1 px-0 py-2 rounded  text-center d-flex justify-content-center align-content-center'
          }
          key={i}
        >
          <p className="px-2">{i}</p>
        </div>
      </Link>
    )
  }
  return (
    <>
      <div
        className="d-flex  m-0 w-100 justify-content-between"
        // onClick={props.handlePrevPageNumber}
      >
        <div className="p-0 m-0 d-flex col-3 justify-content-start">
          {/* ------------快轉左-------- */}
          <div
            className="m-0 p-0 "
            onClick={props.handleOnlyScrollLeftPage}
            onMouseOver={props.handleOnlyScrollLeftHover}
          >
            <div
              style={{ maxWidth: '40px', height: '40px', cursor: 'pointer' }}
              className="m-0 m btn btn-outline-warning  rounded  text-center d-flex justify-content-center align-content-center  "
            >
              <i className="fas fa-chevron-left py-1 " />
              <i className="fas fa-chevron-left py-1 " />
            </div>
          </div>
          {/* ------------快轉左-------- */}
          {/* ------------上一頁--------- */}
          <div
            className={
              // props.currentPage === 1 ? ' m-0 p-0 col-1 d-none' :
              'mx-2 my-0 p-0 '
            }
            onClick={props.handlePrevPage}
          >
            <Link
              to={'/forum/' + props.nowPage.length === 0 ? '' : props.nowPage}
              className="text-warning  m-0 p-0"
            >
              <div
                style={{ Width: '40px', height: '40px' }}
                className="btn btn-outline-warning rounded  text-center d-flex justify-content-center align-content-center  "
              >
                <i className="fas fa-chevron-left py-1 " />
              </div>
            </Link>
          </div>
          {/* ------------上一頁--------- */}
        </div>
        <div
          id="forumListScollRightLeft"
          className={'m-0 p-0 d-flex flex-nowrap col-6 '}
          onClick={props.handleNowPageNumber}
          style={{
            overflowY: 'hidden',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
          }}
        >
          {ForumTotalPages}
        </div>
        <div className="m-0 p-0 d-flex col-3 justify-content-end">
          {/* ------------下一頁--------- */}
          <div
            className={
              // props.currentPage === props.ForumTotalPages
              //   ? ' m-0 p-0 col-1 d-none':
              'mx-2 my-0  p-0 '
            }
            onClick={props.handleNextvPage}
          >
            <Link to={'/forum/1'} className="text-warning  m-0 p-0">
              <div
                style={{ Width: '40px', height: '40px' }}
                className={
                  'btn  m-0 btn-outline-warning  rounded  text-center d-flex justify-content-center align-content-center '
                }
              >
                <i className="fas fa-chevron-right  py-1" />
              </div>
            </Link>
          </div>
          {/* ------------下一頁-------- */}
          {/* ------------快轉右-------- */}
          <div
            className={'m-0 p-0'}
            onClick={props.handleOnlyScrollRightPage}
            onMouseOver={props.handleOnlyScrollRightHover}
          >
            <div
              style={{ maxWidth: '40px', height: '40px', cursor: 'pointer' }}
              className={
                'btn  m-0 btn-outline-warning   rounded  text-center d-flex justify-content-center align-content-center '
              }
            >
              <i className="fas fa-chevron-right  py-1" />
              <i className="fas fa-chevron-right  py-1" />
            </div>
          </div>
          {/* ------------快轉右-------- */}
        </div>
      </div>
    </>
  )
}

export default ForumPage
