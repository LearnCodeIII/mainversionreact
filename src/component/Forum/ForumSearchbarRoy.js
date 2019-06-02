import React from 'react'

const ForumSearchbarRoy = props => (
  <div className="input-group md-form form-sm form-2 pl-0 border border-warning rounded d-flex ">
    <div className="p-0 m-0 col-10">
      <input
        id="forumSearchBar"
        className="form-control my-0 py-1 text-light  bg-transparent border-0"
        type="text"
        placeholder="請輸入搜尋內容"
        aria-label="Search"
        onChange={props.handleSearch}
      />
    </div>
    <div className=" rounded-right m-0 p-0 bg-warning col-2">
      <button
        onClick={props.filterBarShowClick}
        className="text-dark btn-outline-warning border-0 bg-warning px-3 w-100 h-100"
      >
        更多
      </button>
    </div>
  </div>
)

export default ForumSearchbarRoy
