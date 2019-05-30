import React from 'react'

const memberId = sessionStorage.getItem('memberId')
class MessageCinema extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      awesome: [],
      boo: [],
    }
  }

  componentDidMount() {
    this.setState({ awesome: this.props.awesome })
    this.setState({ boo: this.props.boo })
  }

  // 如果awesome清單裡面有這個人的會員id
  // 代表他按過噓了 因此點擊click就是取消噓
  // 這時要拿掉自己這層state裡面的這位會員的id
  // 然後回傳新的boo清單回去給老闆層更新到database
  aClick = () => {
    let newAwesome = []
    if (this.props.awesome.find(item => item === memberId)) {
      this.props.awesome.map(item => {
        if (item !== memberId) {
          newAwesome.push(item)
        }
        return item
      })
      this.props.awesomeClick(newAwesome)
      this.setState({ awesome: newAwesome }, () => console.log(newAwesome))
    } else {
      newAwesome = [...this.state.awesome, memberId]
      this.props.awesomeClick(newAwesome, memberId)
      this.setState({ awesome: newAwesome })
    }
  }
  // 如果boo清單裡面有這個人的會員id
  // 代表他按過噓了 因此點擊click就是取消噓
  // 這時要拿掉自己這層state裡面的這位會員的id
  // 然後回傳新的boo清單回去給老闆層更新到database
  bClick = () => {
    let newBoo = []
    if (this.props.boo.find(item => item === memberId)) {
      this.props.boo.map(item => {
        if (item !== memberId) {
          newBoo.push(item)
        }
        return item
      })
      this.props.awesomeClick(newBoo)
      this.setState({ boo: newBoo })
    } else {
      newBoo = [...this.state.awesome, memberId]
      this.props.awesomeClick(newBoo, memberId)
      this.setState({ boo: newBoo })
    }
  }
  render() {
    // 製作要顯示的已發布時間
    const nowTime = +new Date()
    const messageTime = this.props.time
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
      day >= 1
        ? day + '天'
        : hour >= 1
        ? hour + '小時'
        : minute >= 1
        ? minute + '分鐘'
        : second + '秒'
    // 已發佈時間邏輯結束

    return (
      <>
        {/* 左邊圖片 */}
        <div
          className="d-flex bg-dark mb-3"
          style={{ width: '48%', margin: '0 1%' }}
        >
          <div className="col-3 justify-content-end align-items-center d-flex py-2">
            <div
              style={{
                height: '110px',
                width: '110px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                src={this.props.img}
                height="100%"
                width="100%"
                alt=""
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          {/* 右邊內容 */}
          <div className="col-9 flex-column align-items-between p-0">
            {/* 上面姓名和留言 */}
            <div className="text-white pt-3" style={{ height: '120px' }}>
              <h5 className="">{this.props.name}</h5>
              <h6 className="mt-1">{this.props.message}</h6>
            </div>
            {/* 下面資訊 */}
            <div className="d-flex text-white col p-0">
              {/* <div onClick={this.aClick} className="d-flex col-4 ">
                <i className="fas fa-thumbs-up  mr-2" />
                <h6>
                  {+this.state.awesome.length < 999
                    ? this.state.awesome.length
                    : '999+'}
                </h6>
              </div>
              <div onClick={this.bClick} className="d-flex col-4">
                <i className="fas fa-thumbs-down mt-1 mr-2" />
                <h6>
                  {+this.state.boo.length < 999
                    ? this.state.boo.length
                    : '999+'}
                </h6>
              </div> */}
              <h6 className="col-4">{showTimeText + '前'}</h6>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default MessageCinema
