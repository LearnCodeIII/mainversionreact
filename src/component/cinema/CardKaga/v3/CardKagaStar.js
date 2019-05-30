import React from 'react'
const CardKagaStar = props => {
  // star去抓到props下來的星星數值轉數字
  let star = +props.star

  let stardom = ''
  let fullstar = '<i class="cardStar fas fa-star ml-1" />'
  let emptystar = '<i class="cardStar far fa-star ml-1" />'
  //這邊用switch判斷四捨五入後的star做篩選
  switch (Math.round(star)) {
    case 0:
      stardom = emptystar.repeat(4) + '<i class="cardStar far fa-star mx-1" />'
      break
    case 1:
      stardom =
        fullstar.repeat(1) +
        emptystar.repeat(3) +
        '<i class="cardStar far fa-star mx-1" />'
      break
    case 2:
      stardom =
        fullstar.repeat(2) +
        emptystar.repeat(2) +
        '<i class="cardStar far fa-star mx-1" />'
      break
    case 3:
      stardom =
        fullstar.repeat(3) +
        emptystar.repeat(1) +
        '<i class="cardStar far fa-star mx-1" />'
      break
    case 4:
      stardom = fullstar.repeat(4) + '<i class="cardStar far fa-star mx-1" />'
      break
    default:
      stardom = fullstar.repeat(4) + '<i class="cardStar fas fa-star mx-1" />'
      break
  }
  return (
    <div className="Container" dangerouslySetInnerHTML={{ __html: stardom }} />
  )
}
export default CardKagaStar
