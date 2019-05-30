import React from 'react'
import CardKagaStar from './CardKagaStar'
import CardKagaEditToAreaButton from './CardKagaEditToAreaButton'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
const memberId = sessionStorage.getItem('memberId')
class CardKagaBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markText: '',
      star: '',
      AVStar: 0,
    }
  }
  componentDidMount() {
    // 初始狀態設定
    // 從多筆mark資料中找到自己的
    if (this.props.mark) {
      const markProps = this.props.mark
      let markData = { markId: '', markcontent: '' }
      markProps.map(item => {
        if (item.markId === this.props.id) {
          markData.markId = item.markId
          markData.markcontent = item.markcontent
        }
        return item
      })
      this.setState({ markText: markData.markcontent })
    }
    if (this.props.star) {
      //從多筆星星資料中找到自己的
      let propsData = this.props.star
      let dataStar = { starId: '', star: '' }
      propsData.map(item => {
        if (item.starId === memberId) {
          dataStar.starId = item.starId
          dataStar.star = item.star
        }
        return item
      })
      this.setState({
        star: dataStar.star,
      })
      // 若下AVStar參數就跑這邊
      // 算平均星星數
      // 如果有下這個參數顯示的就會是輸入進來資料的平均星星數
      const AVstar = () => {
        let starProp = this.props.star
        let starTotal = 0
        starProp.map(item => (starTotal += +item.star))
        let final = Math.round(starTotal / this.props.star.length)
        return final
      }
      const star = this.props.AVStar ? AVstar() : this.props.star
      const link = this.props.link ? this.props.link : '#'
      this.setState({ AVStar: star })
    }
  }

  mouseOver = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    //
    let elseCard = [...document.getElementsByName('TopOpenClose')]
    elseCard.map(item => {
      return (item.className = 'cardTopMaskKaga')
    })
    cardTopMaskKaga.className = 'cardTopMaskKagaZero'
  }

  mouseOut = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    cardTopMaskKaga.className = 'cardTopMaskKaga'
  }

  saveMiddleStar = val => {
    console.log(val)
    this.setState({ markText: val.mark.markcontent, star: val.star.star })
  }

  del = () => {
    this.props.del(this.props.id)
    // 去把會員的collectFilm裡面的這個id刪掉
    // 所以傳id回去就好
  }
  render() {
    return (
      <>
        <span
          onMouseOver={this.mouseOver('a' + this.props.id)}
          onMouseOut={this.mouseOut('a' + this.props.id)}
          key={this.props.id}
          className="col-3 flex-column aCardText position-relative"
        >
          {/* 外框＋底圖 */}
          <div
            className="text-center flex-column border-0 cardAreaBgKaga"
            style={{
              backgroundImage: `url(${this.props.img})`,
            }}
          >
            {/* 上方淺色遮罩 */}
            <div
              id={'a' + this.props.id}
              name="TopOpenClose"
              className="pr-1 cardTopMaskKaga"
            />

            {/* 下方深色遮罩 */}
            <Link to={this.props.link} className="mb-0">
              <div className="h-30 d-flex flex-column justify-content-center cardBottomMaskKaga">
                <h6 className="card-title mb-1">{this.props.subtitle}</h6>
                <h4 className="card-title m-0">{this.props.title}</h4>
              </div>
            </Link>

            {/* 滑鼠滑入後彈出區塊 */}
            <div className="align-items-center p-0 pt-3 text-center cardPopupMaskKaga h-100">
              {this.props.member ? (
                <>
                  <div>
                    <h4 className="mb-2">我的評分</h4>
                  </div>
                  <CardKagaStar star={this.state.star} />
                  <h4 className="card-title mt-3">註記</h4>
                  {/* 文字標籤,給他一個寬度,超過就會變成點點點 */}
                  <span
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '200px',
                    }}
                  >
                    {this.state.markText !== ''
                      ? this.state.markText
                      : '尚無備註'}
                  </span>
                  <div className="row d-flex justify-content-center mt-4">
                    {/* 編輯按鈕, 觸發editArea元件 */}
                    <CardKagaEditToAreaButton
                      id={this.props.id}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      star={this.props.star}
                      mark={this.props.mark}
                      newStarAndMark={this.props.newStarAndMark}
                      starAmimation={this.props.starAmimation}
                      saveMiddleStar={this.saveMiddleStar}
                    />

                    {/* 刪除按鈕 */}
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={this.del}
                    >
                      刪除
                    </button>
                  </div>
                </>
              ) : this.props.time ? (
                <>
                  <div>
                    <h4 className="mb-2">平均評分</h4>
                  </div>
                  <CardKagaStar star={this.state.AVStar} />
                  <h4 className="card-title mt-2">檔期</h4>
                  <h6>{this.props.time}</h6>
                  <div className="row d-flex justify-content-center mt-4">
                    <Button
                      style={{ width: '80px' }}
                      type="button"
                      variant="warning"
                      href={'CinemaBackMainpage/cinema-film-info'}
                    >
                      管理
                    </Button>
                    <Button
                      style={{ width: '80px' }}
                      type="button"
                      variant="warning"
                      href={'/movie/' + this.props.id}
                    >
                      頁面
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* <h4 className="card-title mt-3">檔期</h4> */}
                  <Button
                    style={{ width: '80px' }}
                    type="button"
                    variant="warning"
                    href={'CinemaBackMainpage/cinema-manage-activity'}
                  >
                    管理
                  </Button>
                  <Button
                    style={{ width: '80px' }}
                    type="button"
                    variant="warning"
                    href={'/activity/' + this.props.id}
                  >
                    頁面
                  </Button>
                </>
              )}
            </div>
          </div>
        </span>
      </>
    )
  }
}
export default CardKagaBox
