import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputText_Su from '../inputs/InputText_Su'
import Captcha from 'captcha-mini'
//代的Input是純ICON、無Label的
class InputCardContent_CinemaLogin extends React.Component {
  constructor() {
    super()
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [
        {
          id: 'cinemaAccount',
          w: '100%',
          h: '48px',
          iconL: 'fas fa-envelope',
          iconLS: '28px',
          placeholder: '請輸入您的帳號',
          iconR: '',
          iconRS: '',
        },
        {
          id: 'cinemaPassword',
          w: '',
          h: '48px',
          iconL: 'fas fa-key',
          iconLS: '28px',
          placeholder: '請輸入您的密碼',
          iconR: '',
          iconRS: '',
          type: 'password',
        },
      ],
      usertext: [
        //儲存使用者輸入的文字
        {
          cinemaAccount: '',
          cinemaPassword: '',
          captcha: '',
          captchatext: '',
        },
      ],
    }
  }
  //頁面生成完，產生驗證碼
  componentDidMount() {
    let captcha3 = new Captcha({
      //設定驗證碼樣式，如果不設定則帶入預設值)
      lineWidth: 1, //線條寬度
      lineNum: 3, //線條數量
      dotR: 2, //點的半徑
      dotNum: 20, //點的數量
      preGroundColor: [255, 255], //前景色區間
      backGroundColor: [0, 120], //背景色區間
      fontSize: 24, //字體大小
      fontFamily: ['Noto Sans TC', 'Arial'], //字體類型
      fontStyle: 'stroke', //字體繪製方法，有fill和stroke
      length: 4, //驗證碼長度
    })
    //把生成的驗證碼丟到canvas容器中，然後callback把它(參數自訂為r)設定給state
    captcha3.draw(document.querySelector('#captcha3'), r => {
      let newstate = [...this.state.usertext]
      newstate[0].captcha = r
      console.log(r, '驗證碼')
    })
  }

  //輸入框onchange事件
  handleInputTextChange = event => {
    let value = event.target.value //拿到value
    let name = event.target.name //拿到input的name
    console.log(event.target.name)
    let newtext = [...this.state.usertext] //先複製出要改變的state
    console.log(newtext)

    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回去
    if (
      name === 'cinemaAccount' ||
      name === 'cinemaPassword' ||
      name === 'captchatext'
    ) {
      newtext[0][name] = value
      this.setState({ usertext: newtext }, () =>
        console.log(this.state.usertext)
      )
    }
  }
  render() {
    return (
      <>
        <Card
          className="card-box text-center signcard"
          style={{
            width: '600px',
            // background: 'rgba(0,0,0,0)',
          }}
        >
          <Card.Body className="p-5 signcard">
            {this.state.inputmsg.map(item => (
              <Row className="my-4">
                <Col // 這裡是input的col
                  className="p-0 rounded d-flex flex-nowrap align-items-center"
                  style={{ width: `${item.w}` }}
                >
                  <InputText_Su
                    key={item.id}
                    id={item.id}
                    inputWidth={item.w}
                    inputHeight={this.state.inputH}
                    // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                    iconLeft={item.iconL}
                    iconLeftSize={item.iconLS}
                    placeholder={item.placeholder}
                    iconRight={item.iconR}
                    iconRightSize={item.iconRS}
                    onChange={this.handleInputTextChange}
                    type={item.type}
                  />
                </Col>
              </Row>
            ))}
            {/* 這裡是驗證碼的Row */}
            <Row className="my-4 d-flex justify-content-between">
              <input
                className="border border-warning rounded"
                style={{
                  background: '#1f242a',
                  color: '#FFA510',
                  textAlign: 'center',
                  // borderWidth: '2px',
                }}
                name="captchatext"
                type="text"
                placeholder="請輸入右方的驗證碼"
                onChange={this.handleInputTextChange}
              />
              <canvas width="200" height="48" id="captcha3" />
            </Row>
            <Button
              className="bg-warning border-0 px-5"
              onClick={this.props.handleCinemaLoginClick(this.state.usertext)}
            >
              登入
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default InputCardContent_CinemaLogin
