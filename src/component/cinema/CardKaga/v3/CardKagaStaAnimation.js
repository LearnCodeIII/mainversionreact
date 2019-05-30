import React from 'react'
const CardKagaStaAnimation = props => {
  // 這支很噁心 沒事不要看
  // star去抓到props下來的星星數值轉數字
  let star = +props.view
  //這邊用switch判斷四捨五入後的star做篩選

  return (
    <div className="Container">
      {Math.round(star) === 0 ? (
        <>
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      ) : Math.round(star) === 1 ? (
        <>
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      ) : Math.round(star) === 2 ? (
        <>
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      ) : Math.round(star) === 3 ? (
        <>
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      ) : Math.round(star) === 4 ? (
        <>
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar far fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      ) : (
        <>
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver1}
            onClick={props.Click1}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver2}
            onClick={props.Click2}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver3}
            onClick={props.Click3}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star ml-1"
            onMouseOver={props.mouseOver4}
            onClick={props.Click4}
            onMouseOut={props.mouseOut}
          />
          <i
            className="cardStar fas fa-star mx-1"
            onMouseOver={props.mouseOver5}
            onClick={props.Click5}
            onMouseOut={props.mouseOut}
          />
        </>
      )}
    </div>
  )
}
export default CardKagaStaAnimation
