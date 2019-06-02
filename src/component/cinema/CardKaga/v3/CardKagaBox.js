import React from 'react'
import { Link } from 'react-router-dom'
import CardKagaStar from './CardKagaStar'
const CardKagaBox = props => {
  // 算平均星星數
  // 如果有下這個參數顯示的就會是輸入進來資料的平均星星數
  const star = props.AStar ? AVstar() : props.star
  const AVstar = () => {
    let starProp = props.star
    let starTotal = 0
    starProp.map(item => (starTotal += +item.star))
    let final = Math.round(starTotal / props.star.length)
    return final
  }
  const link = props.link ? props.link : '#'
  let hoverChange = null

  const LinkhoverChange = () => {
    //hoverChange = Link這個元素
    hoverChange.className =
      'CardHoverBig card text-center flex-column border-0 cardAreaBgKaga'
  }
  const LinkOutChange = () => {
    //hoverChange = Link這個元素
    hoverChange.className =
      'CardHover card text-center flex-column border-0 cardAreaBgKaga'
  }
  return (
    <>
      <Link
        key={props.id}
        className="col-3 flex-column aCardText position-relative"
        to={link}
      >
        {/* 外框＋底圖 */}
        <div
          className="card text-center flex-column border-0 cardAreaBgKaga CardHover"
          style={{
            backgroundImage: `url(${props.img})`,
          }}
          onMouseOver={LinkhoverChange}
          onMouseOut={LinkOutChange}
          ref={el => (hoverChange = el)}
        >
          {/* 上方淺色遮罩 */}
          <div className="pr-1 cardTopMaskKaga" />

          {/* 下方深色遮罩 */}
          <div className="h-30 d-flex flex-column justify-content-center cardBottomMaskKaga">
            {/* 下方遮罩內文字 */}
            <h6 className="card-title mb-1">{props.subtitle}</h6>
            <h4 className="card-title m-0">{props.title}</h4>
            {props.starIcon ? <CardKagaStar star={star} /> : ''}
          </div>
        </div>
      </Link>
    </>
  )
}
export default CardKagaBox
