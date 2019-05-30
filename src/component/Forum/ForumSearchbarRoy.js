import React from 'react'

const ForumSearchbarRoy = props => (
  <div className="input-group md-form form-sm form-2 pl-0 border border-warning rounded">
    <input
      id="forumSearchBar"
      className="form-control my-0 py-1 text-light  bg-transparent border-0"
      type="text"
      placeholder="請輸入搜尋內容"
      aria-label="Search"
      onChange={props.handleSearch}
    />

    <div className="input-group-append rounded-right bg-transparent">
      <button
        onClick={props.handleSearch}
        className="text-dark btn-outline-warning border-0 bg-warning px-3 "
      >
        搜尋
      </button>
    </div>
  </div>
)

export default ForumSearchbarRoy
