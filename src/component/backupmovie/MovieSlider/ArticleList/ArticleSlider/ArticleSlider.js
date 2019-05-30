import React from 'react'

import Slider from 'react-slick'
import '../../../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../../../node_modules/slick-carousel/slick/slick-theme.css'
// import '../../../../../node_modules/slick-carousel/slick/slick.css'
// import '../../../../../node_modules/slick-carousel/slick/slick-theme.css'
import SliderItem from './SliderItem'

class ArticleSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const settings = {
      className: 'center', //模式
      centerMode: true,
      infinite: true, //無限撥放
      centerPadding: '16px', // 中間圖到最旁邊的間格
      slidesToShow: 3, //顯示數量
      speed: 500,
      arrows: true, //找不到
      autoplay: true,
      autoplayspeed: 200, //自動撥放速度
      pauseOnFocus: true, //hover停止
    }
    return (
      <>
        <div>
          {/* 這裡面的元件一定要用包的 大腸包小腸 */}
          <Slider {...settings} className="">
            {this.props.SliderData.map(item => (
              <div>
                {/* 一定要再包↓一層 */}
                <SliderItem
                  className="p-5"
                  key={item.id}
                  sid={item.id}
                  title={item.title}
                  img={'/images/article/' + item.image}
                  content={item.content}
                  date={item.date}
                />
              </div>
            ))}
          </Slider>
        </div>
      </>
    )
  }
}
export default ArticleSlider

{
  /* <Slider {...settings} SliderData={this.props.SliderData}>
          <div>
            {this.props.SliderData.map((element, index) => (
              <>
                <div>
                  <h3>{element.id}</h3>
                </div>
              </>
            ))}
          </div>
        </Slider> */
}
