import React from 'react'
import CardKagaStaAnimation from '../../CardKaga/v3/CardKagaStaAnimation'
import CardKagaStar from '../../CardKaga/v3/CardKagaStar'
//Import SweetAlert2
import Swal from 'sweetalert2'
const memberId = sessionStorage.getItem('memberId')
const cinemaId = sessionStorage.getItem('cinemaId')

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 1500,
})

class CardLargeKaga extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      awesome: [], //array
      awesomeLength: '', //number
      pageviews: props.pageviews, //number
      collection: [], //array
      collectionLength: '', //number
      id: props.id,
      show: false,
      firstStar: '',
      nowStar: props.star,
      viewStar: props.star,
      updateStar: '',
      markText: '',
      awesomeColor: false,
      collectionColor: false,
    }
  }
  componentDidMount() {
    this.setState({
      awesome: this.props.awesome,
      awesomeLength: this.props.awesomeLength,
      collection: this.props.collection,
      collectionLength: this.props.collectionLength,
      collectionColor: this.props.collectionColor,
      awesomeColor: this.props.awesomeColor,
    })
  }

  // 按讚功能回傳並改變渲染----完成
  awesomeCardClick = () => {
    // 如果有登錄的話
    if (memberId) {
      let newAwesome = []
      let awesomeLength = +this.state.awesomeLength
      // 如果awesome裡面有會員id的話
      if (this.props.awesome.find(item => item === memberId)) {
        // 就把不是這個id的資料丟進newAwesome裡面
        this.props.awesome.map(item => {
          if (item !== memberId) {
            newAwesome.push(item)
          }
          return item
        })
        // 然後把長度-1
        awesomeLength--
        // 把兩個更新後的值丟回去父層
        this.props.awesomeClick(newAwesome, awesomeLength)
        // 然後同時改變自己這層的state
        this.setState({
          awesomeColor: false,
          awesome: newAwesome,
          awesomeLength: awesomeLength,
        })
      } else {
        // 如果沒有的話
        // 把會員id新增到陣列裡面
        newAwesome = [...this.props.awesome, memberId]
        // 然後把長度+1
        awesomeLength++
        // 把兩個更新後的值丟回去父層
        this.props.awesomeClick(newAwesome, awesomeLength)
        // 然後同時改變自己這層的state
        this.setState({
          awesomeColor: true,
          awesome: newAwesome,
          awesomeLength: awesomeLength,
        })
      }
      // 如果沒登錄的話
    } else if (cinemaId) {
      // alert('戲院會員不可以按讚喔～')
      Toast.fire({
        type: 'error',
        title: '戲院會員不可以按讚喔～',
      })
    } else {
      // alert('請先登錄會員喔～')
      Swal.fire({
        title: '<span style="color:#d4d1cc">請先登入會員</span>',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      }).then(result => {
        if (result.value) {
          window.location.href = '/LoginSign'
        }
      })
    }
  }

  // 收藏功能回傳並改變渲染----完成
  collectionCardClick = () => {
    console.log(this.props.collection)
    // 如果有登錄的話
    if (memberId) {
      let newCollection = []
      let collectionLength = +this.state.collectionLength
      // 如果awesome裡面有會員id的話
      if (this.props.collection.find(item => item === this.props.id)) {
        // 就把不是這個id的資料丟進newAwesome裡面
        this.props.collection.map(item => {
          if (item !== this.props.id) {
            newCollection.push(item)
          }
          return item
        })
        // 然後把長度-1
        collectionLength--
        // 把兩個更新後的值丟回去父層
        this.props.collectionClick(newCollection, collectionLength)
        // 然後同時改變自己這層的state
        this.setState(
          {
            collectionColor: false,
            collection: newCollection,
            collectionLength: collectionLength,
          },
          () => {
            console.log('click + state')
            console.log(this.state.collectionLength)
          }
        )
      } else {
        // 如果沒有的話
        // 把會員id新增到陣列裡面
        newCollection = [...this.props.collection, this.props.id]
        // 然後把長度+1
        collectionLength++
        // 把兩個更新後的值丟回去父層
        this.props.collectionClick(newCollection, collectionLength)
        // 然後同時改變自己這層的state
        this.setState({
          collectionColor: true,
          collection: newCollection,
          collectionLength: collectionLength,
        })
      }
      // 如果沒登錄的話
    } else if (cinemaId) {
      // alert('戲院會員不可以收藏喔～')
      Toast.fire({
        type: 'error',
        title: '戲院會員不可以收藏喔～',
      })
    } else {
      // alert('請先登錄會員喔～')
      Swal.fire({
        title: '<span style="color:#d4d1cc">請先登入會員</span>',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      }).then(result => {
        if (result.value) {
          window.location.href = '/LoginSign'
        }
      })
    }
  }

  //mouseOver
  mouseOver1 = () => {
    this.setState({ viewStar: 1 })
  }
  mouseOver2 = () => {
    this.setState({ viewStar: 2 })
  }
  mouseOver3 = () => {
    this.setState({ viewStar: 3 })
  }
  mouseOver4 = () => {
    this.setState({ viewStar: 4 })
  }
  mouseOver5 = () => {
    this.setState({ viewStar: 5 })
  }
  // Click
  // 按下星星就設定nowStar固定星星 以及上傳星星讓到時候按下儲存可以吃到最新的星星數
  Click1 = () => {
    this.setState({ nowStar: 1, viewStar: 1, updateStar: 1 })
    this.props.StarChange(memberId, 1)
  }
  Click2 = () => {
    this.setState({ nowStar: 2, viewStar: 2, updateStar: 2 })
    this.props.StarChange(memberId, 2)
  }
  Click3 = () => {
    this.setState({ nowStar: 3, viewStar: 3, updateStar: 3 })
    this.props.StarChange(memberId, 3)
  }
  Click4 = () => {
    this.setState({ nowStar: 4, viewStar: 4, updateStar: 4 })
    this.props.StarChange(memberId, 4)
  }
  Click5 = () => {
    this.setState({ nowStar: 5, viewStar: 5, updateStar: 5 })
    this.props.StarChange(memberId, 5)
  }
  //mouseOut
  mouseOut = () => {
    let now = this.state.nowStar
    this.setState({ viewStar: now })
  }
  render() {
    return (
      <>
        <div className="col-12 my-3">
          <div className="card cinemaBigCard">
            <div className="row no-gutters h-100">
              <div className="col-lg-6 col-md-12 h-100 cinemaBigCardImg">
                <img
                  src={this.props.img}
                  className="card-img h-100"
                  alt="..."
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-lg-6 col-md-12 h-md-50 d-flex flex-column h-100 cinemaBigCardText">
                {/* 上方區塊 */}
                <div className="d-flex h-100 my-2">
                  <div className="col-3 d-flex flex-column justify-content-around ml-lg-4 px-0">
                    <h4 className="mr-3">地址</h4>
                    <h4 className="mr-3">電話</h4>
                    <h4 className="mr-3">統一編號</h4>
                    <h4 className="mr-3">官方網站</h4>
                    <h4 className="mr-3">電子信箱</h4>
                  </div>
                  <div className="col-9 d-flex flex-column justify-content-around pl-0">
                    {this.props.address ? (
                      <h5>{this.props.address}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.phone ? (
                      <h5>{this.props.phone}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.taxid ? (
                      <h5>{this.props.taxid}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.web ? (
                      <a href={this.props.web} target="_blank">
                        <i
                          className="fas fa-external-link-square-alt mb-2"
                          style={{ fontSize: '25px' }}
                        />
                      </a>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.email ? (
                      <h5>{this.props.email}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                  </div>
                </div>
                {this.props.wantStar ? (
                  <div className="col mb-lg-4 d-flex pl-lg-3 align-items-center">
                    <h4 className="ml-2 mr-5">喜好程度</h4>
                    <div className="ml-4 mb-2">
                      <CardKagaStaAnimation
                        view={this.state.viewStar}
                        mouseOver1={this.mouseOver1}
                        mouseOver2={this.mouseOver2}
                        mouseOver3={this.mouseOver3}
                        mouseOver4={this.mouseOver4}
                        mouseOver5={this.mouseOver5}
                        Click1={this.Click1}
                        Click2={this.Click2}
                        Click3={this.Click3}
                        Click4={this.Click4}
                        Click5={this.Click5}
                        mouseOut={this.mouseOut}
                      />
                    </div>
                    <h6 className="ml-3 mb-1">
                      / 共{this.props.starLength}人給分
                    </h6>
                  </div>
                ) : this.props.justStar ? (
                  <div className="col mb-4 d-flex pl-3 align-items-center">
                    <h4 className="ml-2 mr-5">平均給分</h4>
                    <div className="ml-4 mb-2">
                      <CardKagaStar star={this.props.star} />
                    </div>
                    <h6 className="ml-3 mb-1">
                      / 共{this.props.starLength}人給分
                    </h6>
                  </div>
                ) : (
                  ''
                )}
                {/* 下方區塊 */}
                <div className="d-flex mb-4 mt-3" style={{ fontSize: '25px' }}>
                  {/* 按讚數 */}
                  {this.state.awesomeColor === false ? (
                    <div
                      className="mx-4"
                      onClick={this.awesomeCardClick}
                      style={{ cursor: 'pointer', color: '#ccc' }}
                    >
                      <i className="fas fa-thumbs-up mr-2" />
                      {this.state.awesomeLength}
                    </div>
                  ) : (
                    <div
                      className="mx-4"
                      onClick={this.awesomeCardClick}
                      style={{ cursor: 'pointer', color: 'rgb(253,149,17)' }}
                    >
                      <i className="fas fa-thumbs-up mr-2" />
                      {this.state.awesomeLength}
                    </div>
                  )}

                  {/* 瀏覽數 */}
                  <div className="mx-5">
                    <i className="fas fa-eye mr-2" />
                    {this.props.pageviews}
                  </div>

                  {/* 訂閱數 */}
                  {this.state.collectionColor === false ? (
                    <div
                      className="ml-4"
                      onClick={this.collectionCardClick}
                      style={{ cursor: 'pointer', color: '#ccc' }}
                    >
                      <i className="fas fa-bookmark mr-2" />
                      {this.state.collectionLength}
                    </div>
                  ) : (
                    <div
                      id="collecIconArea"
                      className="ml-4"
                      onClick={this.collectionCardClick}
                      style={{ cursor: 'pointer', color: 'rgb(253,149,17)' }}
                    >
                      <i className="fas fa-bookmark mr-2" />
                      {this.state.collectionLength}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default CardLargeKaga
