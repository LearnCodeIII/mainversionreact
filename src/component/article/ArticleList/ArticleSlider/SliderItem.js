import React from 'react'
import ReadMore from '../ArticleButton/ReadMore'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// 圖片採 背景式置入
const SliderItem = props => {
  // 單張輪播的格式設定
  var sectionStyle = {
    // width: '100%',
    height: '400px',
    backgroundImage: 'url(' + props.img + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  }

  return (
    <>
      <div
        className="slider m-2 d-flex row align-items-end box-shadow"
        style={sectionStyle}
      >
        {/* <img
          src={'/images/article/' + props.img}
          class="d-block w-40"
          alt="..."
        /> */}
        <div className="bigDarkBG" />
        <div className="py-2 px-5 darkText" style={{ cursor: 'pointer' }}>
          {/* 標題只取20個字+點點 */}
          <h5>{props.title.substr(0, 16) + '......'}</h5>
          <p>
            {/* <small>{props.date}</small> */}
            {props.content.replace(/(<([^>]+)>)/gi, '').substr(0, 36) +
              '......'}{' '}
            <ReadMore sid={props.sid} />
          </p>
        </div>
        <div className="darkBG" />
      </div>
    </>
  )
}

export default SliderItem
