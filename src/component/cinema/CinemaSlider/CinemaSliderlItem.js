import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// 圖片採 背景式置入
const SliderItem = props => {
  // 單張輪播的格式設定
  var sectionStyle = {
    height: '400px',
    backgroundImage:
      'url(http://localhost:3000/images/cinemaImg/' + props.img + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  }
  return (
    <>
      <div
        className="slider m-2 d-flex align-items-end box-shadow"
        style={sectionStyle}
      />
    </>
  )
}

export default SliderItem
