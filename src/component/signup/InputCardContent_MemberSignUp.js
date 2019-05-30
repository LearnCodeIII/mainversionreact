import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputText_Su from '../inputs/InputText_Su'
import Checkbox_Su from '../inputs/Checkbox_Su'
import Captcha from 'captcha-mini' //驗證碼套件
class InputCardContent_MemberSignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [
        //input的欄位內容
        {
          id: 'email',
          w: '',
          h: '48px',
          iconL: 'fas fa-envelope',
          iconLS: '28px',
          placeholder: '請輸入您的E-mail信箱',
          iconR: '',
          iconRS: '',
          type: 'text',
        },
        {
          id: 'nickname',
          w: '',
          h: '48px',
          iconL: 'fas fa-user',
          iconLS: '28px',
          placeholder: '請輸入您的暱稱',
          iconR: '',
          iconRS: '',
          type: 'text',
        },
        {
          id: 'pwd',
          w: '',
          h: '48px',
          iconL: 'fas fa-key',
          iconLS: '28px',
          placeholder: '請輸入您的密碼',
          iconR: '',
          iconRS: '',
          type: 'password',
        },
        {
          id: 'repwd',
          w: '',
          h: '28px',
          iconL: 'fas fa-key',
          iconLS: '30px',
          placeholder: '再次確認您的密碼',
          iconR: '',
          iconRS: '',
          type: 'password',
        },
      ],
      usertext: [
        //儲存使用者輸入的文字
        {
          email: '',
          nickname: '',
          pwd: '',
          repwd: '',
          captcha: '',
          captchatext: '',
          isagreed: false,
        },
      ],
      checkok: {
        //儲存格式驗證是否通過
        email: false,
        nickname: false,
        pwd: false,
        repwd: false,
      },
    }
  }
  //頁面生成完，產生驗證碼
  componentDidMount() {
    let captcha2 = new Captcha({
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
    captcha2.draw(document.querySelector('#captcha2'), r => {
      let newstate = [...this.state.usertext]
      newstate[0].captcha = r
      console.log(r, '驗證碼')
    })
  }
  //輸入框onchange事件
  handleInputTextChange = event => {
    let value = event.target.value //拿到value
    let name = event.target.name //拿到input的name
    let newtext = [...this.state.usertext] //先複製出要改變的state
    let newcheckstate = { ...this.state.checkok } //先複製出要改變的state

    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    // let mobile_pattern = /^09\d{2}\-?\d{3}\-?\d{3}$/
    // let birthday_pattern = /^\d{4}\-?\d{2}\-?\d{2}$/

    //email驗證:格式、是否存在
    if (name === 'email') {
      newcheckstate.email = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      // console.log(email_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = email_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的Email'
        } else {
          //格式正確，再比對是否已存在
          let emailexisted = this.props.memberdata.find(
            item => item.email === value
          )
          if (emailexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              'Email已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.email = true
            this.setState(
              { checkok: newcheckstate },
              () => (document.querySelector('#' + name + 'help').innerHTML = '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //暱稱驗證:格式、是否已被使用
    if (name === 'nickname') {
      newcheckstate.nickname = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          let memberexisted = this.props.memberdata.find(
            item => item.nickname === value
          )
          if (memberexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '暱稱已被使用'
          } else {
            console.log(value)
            newcheckstate.nickname = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + name + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //密碼驗證:長度、及比對再次確認的密碼是否相符，並變更再次確認密碼的提示狀態
    if (name === 'pwd') {
      newcheckstate.pwd = false
      newcheckstate.repwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        if (value.length < 6) {
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入至少6個字元'
          if (this.state.usertext[0].repwd) {
            if (this.state.usertext[0].repwd === value) {
              newcheckstate.repwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#repwdhelp').innerHTML = ''
            } else {
              newcheckstate.repwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#repwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        } else {
          newcheckstate.pwd = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + name + 'help').innerHTML = ''
          if (this.state.usertext[0].repwd) {
            if (this.state.usertext[0].repwd === value) {
              newcheckstate.repwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#repwdhelp').innerHTML = ''
            } else {
              newcheckstate.repwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#repwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        }
      } else {
        newtext[0].pwd = ''
        document.querySelector('#' + name + 'help').innerHTML = ''
        this.setState({ usertext: newtext })
        if (this.state.usertext[0].repwd !== '') {
          document.querySelector('#repwdhelp').innerHTML = '請先設定您的密碼'
        } else {
          document.querySelector('#repwdhelp').innerHTML = ''
        }
      }
      console.log(newcheckstate)
    }

    //再次確認密碼驗證:判斷是否與密碼相符
    if (name === 'repwd') {
      console.log(this.state.usertext[0].pwd)
      newcheckstate.repwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //如果有值
        let pwd = this.state.usertext[0].pwd
        if (pwd === '') {
          //判斷密碼欄位是否也有值，如果是空的
          document.querySelector('#' + name + 'help').innerHTML =
            '請先設定您的密碼'
        } else {
          //密碼不是空的，判斷再次確認的密碼是否與密碼相同，如果不相同
          if (value !== pwd) {
            document.querySelector('#' + name + 'help').innerHTML =
              '請正確輸入您設定的密碼'
          } else {
            //相同
            newcheckstate.repwd = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + name + 'help').innerHTML = ''
          }
        }
      } else {
        //此欄若沒有值，則清除提示
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //同意條款勾選狀態設定
    if (name === 'agree-member-rules') {
      newtext[0].isagreed = !newtext[0].isagreed
      this.setState({ usertext: newtext })
      // console.log(newtext)
    }
    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回去
    if (
      name === 'email' ||
      name === 'nickname' ||
      name === 'pwd' ||
      name === 'repwd' ||
      name === 'captcha' ||
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
          style={{ width: '600px' }}
        >
          <Card.Body className="p-5 signcard">
            {this.state.inputmsg.map(item => (
              <>
                {/* {console.log(item)} */}
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
                <small id={item.id + 'help'} class="form-text  text-danger" />
              </>
            ))}
            {/* 這裡是驗證碼的Row -- input + canvas */}
            <Row className="my-4 d-flex justify-content-between">
              <input
                className="border border-warning rounded"
                style={{
                  background: '#1f242a',
                  color: '#FFA510',
                  textAlign: 'center',
                }}
                name="captchatext"
                type="text"
                placeholder="請輸入右方的驗證碼"
                onChange={this.handleInputTextChange}
              />
              <canvas width="200" height="48" id="captcha2" />
            </Row>
            <Checkbox_Su
              id="agree-member-rules"
              name="agree-member-rules"
              text="我已了解並同意.Movieee使用者服務條款"
              // checkRemind="請確認同意服務條款"
              onChange={this.handleInputTextChange}
            />

            <Button
              className="bg-warning border-0 px-5"
              onClick={this.props.handleMemberSignup(
                this.state.usertext,
                this.state.checkok
              )}
            >
              確認送出
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default InputCardContent_MemberSignUp
