import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputWithLabel_Su from '../inputs/InputWithLabel_Su'
import Checkbox_Su from '../inputs/Checkbox_Su'
import Captcha from 'captcha-mini' //驗證碼套件
class InputCardContent_CinemaSignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [],
      chooseInputmsg: [],
      usertext: [
        {
          cinemaName: '',
          cinemaTaxid: '',
          cinemaCity: '台北市',
          cinemaArea: '',
          cinemaAddress: '',
          cinemaPhone: '',
          cinemaEmail: '',
          cinemaType: '',
          cinemaAccount: '',
          cinemaPassword: '',
          cinemaWeb: '',
          cinemaLogoImg: '',
          cinemaHeroImg: '',
          cinemaImg: [],
          cinemaRepwd: '',
          captcha: '',
          captchatext: '',
          isagreed: false,
        },
      ],
      checkok: {
        //儲存格式驗證是否通過
        cinemaEmail: false,
        cinemaTaxid: false,
        cinemaName: false,
        cinemaArea: false,
        cinemaAddress: false,
        cinemaPhone: false,
        cinemaType: false,
        cinemaAccount: false,
        cinemaPassword: false,
        cinemaRepwd: false,
      },
    }
  }
  async componentDidMount() {
    try {
      //取得欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinema-sign-inputmsg',
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
      // console.log('/' + jsonObject[6].selectOptions.map(item => item.name))
      const data = await jsonObject
      await this.setState({ inputmsg: data })
      // await console.log(data)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
    try {
      //取得選填欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinema-sign-choose-inputmsg',
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
      const choosedata = await jsonObject
      await this.setState({ chooseInputmsg: choosedata })
      // await console.log(choosedata)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }

    //產生驗證碼
    let captcha4 = new Captcha({
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
    captcha4.draw(document.querySelector('#captcha4'), r => {
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
    let taxid_pattern = /^\d{8}$/
    let phone_pattern = /^0\d{1,2}\-\d{3,4}\-\d{4}$/
    let account_pattern = /^[a-zA-Z][a-zA-Z0-9_]{5,}$/ //英文開頭
    // let account_pattern = /[\w\d]{6,}/  //英數組合6字以上
    let url_pattern = /[a-zA-z]+:\/\/[^s]*/
    // let birthday_pattern = /^\d{4}\-?\d{2}\-?\d{2}$/

    //email驗證:格式、是否存在
    if (name === 'cinemaEmail') {
      newcheckstate.cinemaEmail = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(email_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = email_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的Email'
        } else {
          //格式正確，再比對是否已存在
          let emailexisted = this.props.cinemadata.find(
            item => item.cinemaEmail === value
          )
          if (emailexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              'Email已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaEmail = true
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
    //官方網站url驗證:格式、是否存在
    if (name === 'cinemaWeb') {
      newcheckstate.cinemaWeb = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(url_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = url_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的網址'
        } else {
          //格式正確，再比對是否已存在
          let urlexisted = this.props.cinemadata.find(
            item => item.cinemaWeb === value
          )
          if (urlexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '網址重複使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaWeb = true
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
    //account驗證:格式、是否存在
    if (name === 'cinemaAccount') {
      newcheckstate.cinemaAccount = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(account_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = account_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入開頭為英文，且總共至少6個字元的英數組合'
        } else {
          //格式正確，再比對是否已存在
          let accountexisted = this.props.cinemadata.find(
            item => item.cinemaAccount === value
          )
          if (accountexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '此帳號已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaAccount = true
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
    //統編驗證:格式、是否存在
    if (name === 'cinemaTaxid') {
      newcheckstate.cinemaTaxid = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(taxid_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = taxid_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的統一編號'
        } else {
          //格式正確，再比對是否已存在
          let taxidexisted = this.props.cinemadata.find(
            item => item.cinemaTaxid === value
          )
          if (taxidexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '統一編號已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaTaxid = true
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
    //電話驗證:格式、是否存在
    if (name === 'cinemaPhone') {
      newcheckstate.cinemaPhone = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(phone_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = phone_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的電話號碼'
        } else {
          //格式正確，再比對是否已存在
          let phoneexisted = this.props.cinemadata.find(
            item => item.cinemaTaxid === value
          )
          if (phoneexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '電話已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaPhone = true
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
    //戲院名稱驗證:格式、是否已被使用
    if (name === 'cinemaName') {
      newcheckstate.cinemaName = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          let cinemaexisted = this.props.cinemadata.find(
            item => item.cinemaName === value
          )
          if (cinemaexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '名稱已被使用'
          } else {
            // console.log(value)
            newcheckstate.cinemaName = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + name + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(newcheckstate)
    }
    //戲院行政區驗證:格式
    if (name === 'cinemaArea') {
      newcheckstate.cinemaArea = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷是否字元數 < 2
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的行政區域'
        } else {
          newcheckstate.cinemaArea = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + name + 'help').innerHTML = ''
        }
      } else {
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(newcheckstate)
    }
    //戲院地址驗證:格式、是否已被使用
    if (name === 'cinemaAddress') {
      newcheckstate.cinemaAddress = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 11) {
          //判斷是否字元數 < 10 (至少=縣市:3、行政區:2、路名:3、號碼:2)
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入正確的地址'
        } else {
          //若>9，檢查該地址是否已存在
          let cinemaAddressexisted = this.props.cinemadata.find(
            item => item.cinemaAddress === value
          )
          if (cinemaAddressexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '地址已被使用，請確認您的地址'
          } else {
            //若地址沒有重複，檢查開頭前三個字是否與所在縣市欄位的值相同
            // console.log(value)
            let city = this.state.usertext[0].cinemaCity
            if (value.substr(0, 3) === city) {
              //相同則回傳
              newcheckstate.cinemaAddress = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#' + name + 'help').innerHTML = ''
            } else {
              //不同則跳出提示
              document.querySelector('#' + name + 'help').innerHTML =
                '地址與您的所在縣市不相符，請再次確認'
            }
          }
        }
      } else {
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(newcheckstate)
    }
    //戲院類型驗證:格式、是否已被使用
    if (name === 'cinemaType') {
      newcheckstate.cinemaType = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (!value) {
        //如果沒有值
        document.querySelector('#' + name + 'help').innerHTML = '選擇場所類型'
      } else {
        newcheckstate.cinemaType = true //先將check狀態回復到false
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(value)
      // console.log(newcheckstate)
    }

    //密碼驗證:長度、及比對再次確認的密碼是否相符，並變更再次確認密碼的提示狀態
    if (name === 'cinemaPassword') {
      newcheckstate.cinemaPassword = false
      newcheckstate.cinemaRepwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        if (value.length < 6) {
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入至少6個字元'
          if (this.state.usertext[0].cinemaRepwd) {
            if (this.state.usertext[0].cinemaRepwd === value) {
              newcheckstate.cinemaRepwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#cinemaRepwdhelp').innerHTML = ''
            } else {
              newcheckstate.cinemaRepwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#cinemaRepwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        } else {
          newcheckstate.cinemaPassword = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + name + 'help').innerHTML = ''
          if (this.state.usertext[0].cinemaRepwd) {
            if (this.state.usertext[0].cinemaRepwd === value) {
              newcheckstate.cinemaRepwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#cinemaRepwdhelp').innerHTML = ''
            } else {
              newcheckstate.cinemaRepwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#cinemaRepwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        }
      } else {
        newtext[0].cinemaPassword = ''
        document.querySelector('#' + name + 'help').innerHTML = ''
        this.setState({ usertext: newtext })
        if (this.state.usertext[0].cinemaRepwd !== '') {
          document.querySelector('#cinemaRepwdhelp').innerHTML =
            '請先設定您的密碼'
        } else {
          document.querySelector('#cinemaRepwdhelp').innerHTML = ''
        }
      }
      // console.log(newcheckstate)
    }

    //再次確認密碼驗證:判斷是否與密碼相符
    if (name === 'cinemaRepwd') {
      // console.log(1237657545)
      newcheckstate.cinemaRepwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //如果有值
        let pwd = this.state.usertext[0].cinemaPassword
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
            newcheckstate.cinemaRepwd = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + name + 'help').innerHTML = ''
          }
        }
      } else {
        //此欄若沒有值，則清除提示
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(newcheckstate)
    }
    //同意條款勾選狀態設定
    if (name === 'agree-cinema-rules') {
      newtext[0].isagreed = !newtext[0].isagreed
      this.setState({ usertext: newtext })
      // console.log(newtext)
    }
    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回去
    if (
      name === 'cinemaName' ||
      name === 'cinemaTaxid' ||
      // name === 'cinemaCity' ||
      name === 'cinemaArea' ||
      name === 'cinemaAddress' ||
      name === 'cinemaPhone' ||
      name === 'cinemaEmail' ||
      name === 'cinemaAccount' ||
      name === 'cinemaPassword' ||
      name === 'cinemaWeb' ||
      // name === 'cinemaLogoImg' ||
      // name === 'cinemaHeroImg' ||
      name === 'cinemaRepwd' ||
      name === 'captcha' ||
      name === 'captchatext'
    ) {
      newtext[0][name] = value
      this.setState({ usertext: newtext })
    } else if (name === 'cinemaType') {
      newtext[0][name] = event.target.id
      this.setState({ usertext: newtext }, () =>
        console.log(this.state.usertext)
      )
    } else if (name === 'cinemaCity') {
      // console.log(event.target.selectedIndex) //被選取的option的index
      let selectedIndex = event.target.selectedIndex
      newtext[0][name] = event.target.options[selectedIndex].text //被選取的option的文字內容
      this.setState({ usertext: newtext }, () =>
        console.log(this.state.usertext)
      )
    } else if (name === 'cinemaLogoImg' || name === 'cinemaHeroImg') {
      // console.log(event.target.files[0])
      // console.log(event.target.files[0].name)

      var file = event.target.files[0]
      var uploadFileName = event.target.files[0].name
      let formdata = new FormData()
      formdata.append('myfile', file)
      fetch('http://localhost:3001/api/cinema-upload-single', {
        method: 'POST',
        body: formdata,
      })
        .then(res => res.json())
        .then(obj => {
          // console.log(obj)
          if (obj.success == true) {
            newtext[0][name] = obj.filename
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector(
              '#' + name + 'filename'
            ).innerHTML = uploadFileName
          } else {
            newtext[0][name] = ''
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector('#' + name + 'filename').innerHTML = obj.info
          }
        })
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
                <InputWithLabel_Su
                  key={item.id}
                  id={item.id}
                  inputWidth={item.w}
                  inputHeight={this.state.inputH}
                  // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                  inputType={item.inputType}
                  inputLabel={item.inputLabel}
                  iconLeft={item.iconL}
                  iconLeftSize={item.iconLS}
                  placeholder={item.placeholder}
                  iconRight={item.iconR}
                  iconRightSize={item.iconRS}
                  selectOptions={item.selectOptions}
                  onChange={this.handleInputTextChange}
                />
                <small id={item.id + 'help'} class="form-text text-danger " />
              </>
            ))}
            <Row className="my-4">
              <Col>
                <hr style={{ backgroundColor: '#D4D1CC' }} />
              </Col>
              <Col>以下為選填項目</Col>
              <Col>
                <hr style={{ backgroundColor: '#D4D1CC' }} />
              </Col>
            </Row>
            {this.state.chooseInputmsg.map(item => (
              <>
                <InputWithLabel_Su
                  key={item.id}
                  id={item.id}
                  inputWidth={item.w}
                  inputHeight={this.state.inputH}
                  // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                  inputType={item.inputType}
                  inputLabel={item.inputLabel}
                  iconLeft={item.iconL}
                  iconLeftSize={item.iconLS}
                  placeholder={item.placeholder}
                  iconRight={item.iconR}
                  iconRightSize={item.iconRS}
                  selectOptions={item.selectOptions}
                  onChange={this.handleInputTextChange}
                />
                <small id={item.id + 'help'} class="form-text  text-danger" />
              </>
            ))}
            {/* 這裡是驗證碼的Row -- input + canvas */}
            <Row className="mx-4 my-4 d-flex justify-content-between">
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
              <canvas width="200" height="48" id="captcha4" />
            </Row>
            <Checkbox_Su
              id="agree-cinema-rules"
              text="我已了解並同意.Movieee戲院服務條款"
              checkRemind="請確認同意服務條款"
              onChange={this.handleInputTextChange}
            />
            <Button
              className="bg-warning border-0 px-5"
              onClick={this.props.handleCinemaSignup(
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

export default InputCardContent_CinemaSignUp
