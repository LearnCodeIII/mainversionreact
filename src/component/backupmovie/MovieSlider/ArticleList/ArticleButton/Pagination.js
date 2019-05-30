import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Pagination = props => {
  // 先預設空白陣列
  var totalPages = [];
  for (let i = 1; i <= props.totalPages; i++) {
    // 迴圈將數值引入陣列 並且push    需有**key**
    totalPages.push(
      <div className="btn" key={i}>
        <Link to="/">{i}</Link>
      </div>
    );
  }
  return (
    <>
      <div className="btn">上一頁</div>
      {totalPages} <div className="btn">/ {props.totalPages}</div>
      <div className="btn">下一頁</div>
    </>
  );
};

export default Pagination;
