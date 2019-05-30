import React from 'react'
import { Row, Accordion } from 'react-bootstrap'
import SidenavMenu_Su from './SidenavMenu_Su'

class MemberBackSidenav extends React.Component {
  constructor() {
    super()
    const path = window.location.pathname.slice(1)
    console.log(path)
    this.state = {
      sidenavItems: [],
    }
  }

  async componentDidMount() {
    try {
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/member-back-sidenav',
        {
          method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ sidenavItems: data })
      //   await console.log(data)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
  }
  handleLogout = () => {
    //點擊登出，清除session並導回主頁
    // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
    sessionStorage.clear()
    window.location.href = '/mainpage'
  }
  render() {
    if (
      !(
        sessionStorage.getItem('memberId') || sessionStorage.getItem('cinemaId')
      )
    ) {
      // alert('回到登入頁')
      window.location.href = '/LoginSign'
    } else {
      return (
        <>
          <Row>
            <div //左邊sidenave框
              className="col-lg-2 p-0 bg-darkblue"
              style={{
                height: '100vh',
                //   background: '#242B34',
              }}
            >
              <div
                style={{
                  height: '194px',
                }}
              />
              <h3 className="text-center mb-4">會員中心</h3>
              <Accordion defaultActiveKey="0">
                {this.state.sidenavItems.map(item => (
                  <SidenavMenu_Su
                    id={item.id}
                    title={item.title}
                    options={item.options}
                    isClicked={item.isclicked}
                  />
                ))}
              </Accordion>
              <button
                className="btn-warning border-0"
                onClick={this.handleLogout}
              >
                登出
              </button>
            </div>
            <div //右邊內容框
              className="col container-fluid bg-second-darkblue"
              style={{ background: '' }}
            >
              <div style={{ height: '194px' }} />
              我是右側內容
            </div>
          </Row>
        </>
      )
    }
  }
}

export default MemberBackSidenav
