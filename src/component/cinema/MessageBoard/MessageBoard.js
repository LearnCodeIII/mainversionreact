import React from 'react'
const memberId = sessionStorage.getItem('memberId')
const cinemaId = sessionStorage.getItem('cinemaId')

class MessageBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // 製作要顯示的已發布時間
    const nowTime = +new Date()
    const messageTime = this.props.listData.time
    let time = nowTime - messageTime
    let secondnumber = time / 1000
    let minutenumber = time / 60000
    // 秒
    let second = Math.floor(secondnumber % 60)
    // 小時
    let hour = minutenumber / 60 >= 1 ? Math.floor(minutenumber / 60) : ''
    // 分鐘
    let minute = minutenumber % 60 >= 1 ? Math.floor(minutenumber % 60) : ''
    // 天
    let day = hour / 24 >= 1 ? Math.floor(hour / 24) : ''
    let showTimeText =
      day > 1
        ? day + '天'
        : hour >= 1
        ? hour + '小時'
        : minute >= 1
        ? minute + '分鐘'
        : second + '秒'
    // 已發佈時間邏輯結束
    return (
      <>
        {/* 顯示區 */}
        <ul class="list-unstyled">
          <li class="media">
            <div
              style={{
                height: '80px',
                width: '80px',
                borderRadius: '50%',
                boxShadow: '0 0 2px #000',
              }}
              className="overflow-hidden d-flex justify-content-center align-items-center"
            >
              <img
                width="100%"
                height="100%"
                src={
                  'http://localhost:3000/images/' +
                  this.props.listData.imgLocation +
                  '/' +
                  this.props.listData.img
                }
                class=""
                alt="..."
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div class="media-body text-left pl-4">
              <h5>{this.props.listData.name}</h5>
              <p style={{ fontSize: '25px' }}>{this.props.listData.message}</p>
              <div className="d-flex" style={{ fontSize: '20px' }}>
                <p>{showTimeText + '前'}</p>
              </div>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default MessageBoard
