import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const ForumPage = props => {
  // 先預設空白陣列，沒放會炸
  // const a =
  // console.log(props.ForumTotalPages)
  // console.log(props.currentPage)
  // console.log(props.currentPage < props.ForumTotalPages)
  var ForumTotalPages = []
  for (let i = 1; i <= props.ForumTotalPages; i++) {
    // 迴圈將數值引入陣列 並且push    需有**key**
    ForumTotalPages.push(
      <Link
        // 接上層的頁碼然後迴圈設定連結都會是10的倍數+1
        to={'/forum/' + props.cuerrenPageFirstData[(i - 1) * 10].id}
        className="text-warning"
        // 每當典籍將目前頁面的頁設進state
      >
        <button className="btn btn-outline-warning  my-0 mx-1 px-3" key={i}>
          {i}
        </button>
      </Link>
    )
  }
  return (
    <>
      <div
        className="d-flex justify-content-between  m-0 w-100"
        // onClick={props.handlePrevPageNumber}
      >
        <div className="m-0 p-0" onClick={props.handlePrevPage}>
          <Link to={'/forum/1'} className="text-warning">
            <button className="btn btn-outline-warning m-0  px-3  ">
              <i class="fas fa-chevron-left" />
            </button>
          </Link>
        </div>
        <div className="m-0 p-0" onClick={props.handleNowPageNumber}>
          {ForumTotalPages}
        </div>
        {/* <div className="btn btn-outline-warning">/ {props.ForumTotalPages}</div> */}
        <div className="m-0 p-0" onClick={props.handleNextvPage}>
          <Link to={'/forum/1'} className="text-warning">
            <button className={'btn  m-0 btn-outline-warning  px-3 '}>
              <i class="fas fa-chevron-right" />
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ForumPage
