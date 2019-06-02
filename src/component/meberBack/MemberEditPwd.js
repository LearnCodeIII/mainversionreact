import React from 'react'
import InputWithLabelForEdit_Su from '../inputs/InputWithLabelForEdit_Su'
import InputWithLabel_Su from '../inputs/InputWithLabel_Su'
import CheckboxMultiSu from '../inputs/CheckboxMultiSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'
import { Row } from 'react-bootstrap'
//Import SweetAlert2
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
})
class MemberEditInfo extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      thisData: 0,
      usertext: { originPwd: '', newPwd: '', reNewPwd: '' },
      checkok: {
        originPwd: false,
        newPwd: false,
        reNewPwd: false,
      },
    }
  }

  async componentDidMount() {
    //若不設定，切換頁面再回來會無資料
    const data = await this.props.thisData
    await this.setState({ thisData: data })
  }

  componentWillReceiveProps() {
    //若不設定，當頁刷新會無資料
    // console.log(this.state.thisData == 0)
    if (this.state.thisData == 0) {
      //如果state中的資料為空(設定""或{}無效，必須是0)，則將props資料設定給state
      this.setState({ thisData: this.props.thisData })
    }
  }

  //儲存按鈕onclick
  handleSaveInfo = () => {
    let memberid = this.state.thisData.id
    let isAllChecked = true
    let checkArray = Object.values(this.state.checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      let copyData = { ...this.state.thisData }
      let savePwd = this.state.usertext.newPwd
      copyData.pwd = savePwd
      try {
        fetch('http://localhost:5555/member/' + memberid, {
          method: 'PUT',
          body: JSON.stringify(copyData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            this.setState({ thisData: jsonObject }, () => {
              Toast.fire({
                type: 'success',
                title: '密碼更改完成！',
              })
              setTimeout(() => window.location.reload(), 1500)
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      Toast.fire({
        type: 'error',
        title: '資料填寫有誤，請再次確認您的資料！',
      })
    }
  }

  //輸入框change事件
  handleInputTextChange = event => {
    console.log(event.target)
    // console.log(this.state.thisData)
    console.log(event.target.value)
    console.log(event.target.name)
    let id = event.target.id
    let value = event.target.value
    let name = event.target.name
    let newtext = { ...this.state.usertext } //先複製出要改變的state
    let copyData = { ...this.state.thisData }
    let newcheckstate = { ...this.state.checkok }

    //原始密碼驗證
    if (name === 'originPwd') {
      if (value) {
        if (value === this.state.thisData.pwd) {
          newcheckstate.originPwd = true
        } else {
          newcheckstate.originPwd = false
        }
      }
      this.setState({ checkok: newcheckstate }, () => {
        console.log(this.state.checkok)
      })
    }

    //新密碼驗證:長度、及比對再次確認的密碼是否相符，並變更再次確認密碼的提示狀態
    if (name === 'newPwd') {
      newcheckstate.newPwd = false
      newcheckstate.reNewPwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        if (value.length < 6) {
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入至少6個字元'
          if (this.state.usertext.reNewPwd) {
            if (this.state.usertext.reNewPwd === value) {
              newcheckstate.reNewPwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#reNewPwdhelp').innerHTML = ''
            } else {
              newcheckstate.reNewPwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#reNewPwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        } else {
          newcheckstate.newPwd = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + name + 'help').innerHTML = ''
          if (this.state.usertext.reNewPwd) {
            if (this.state.usertext.reNewPwd === value) {
              newcheckstate.reNewPwd = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#reNewPwdhelp').innerHTML = ''
            } else {
              newcheckstate.reNewPwd = false
              this.setState({ checkok: newcheckstate })
              document.querySelector('#reNewPwdhelp').innerHTML =
                '請正確輸入您設定的密碼'
            }
          }
        }
      } else {
        newtext.newPwd = ''
        document.querySelector('#' + name + 'help').innerHTML = ''
        this.setState({ usertext: newtext })
        if (this.state.usertext.reNewPwd !== '') {
          document.querySelector('#reNewPwdhelp').innerHTML = '請先設定您的密碼'
        } else {
          document.querySelector('#reNewPwdhelp').innerHTML = ''
        }
      }
      console.log(newcheckstate)
    }

    //再次確認密碼驗證:判斷是否與密碼相符
    if (name === 'reNewPwd') {
      newcheckstate.reNewPwd = false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //如果有值
        let pwd = this.state.usertext.newPwd
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
            newcheckstate.reNewPwd = true
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

    newtext[name] = value
    this.setState({ usertext: newtext }, () => {
      console.log(this.state.usertext)
    })
  }

  render() {
    if (this.state.thisData === 0) {
      return <></>
    }
    return (
      <>
        <Row className="d-flex justify-content-center">
          <div className="col-lg-6 h5">
            <>
              <InputWithLabel_Su
                id="originPwd"
                name="originPwd"
                inputWidth=""
                inputHeight="48px"
                inputType="password"
                inputLabel="原始密碼"
                placeholder="請輸入您的原始密碼"
                onChange={this.handleInputTextChange}
                col="col-5"
              />
              <small
                id="originPwdhelp"
                className="form-text  text-danger text-center"
              />
            </>
          </div>
        </Row>
        <Row className="d-flex justify-content-center">
          <div className="col-lg-6  h5">
            <>
              <InputWithLabel_Su
                id="newPwd"
                name="newPwd"
                inputWidth=""
                inputHeight="48px"
                inputType="password"
                inputLabel="新密碼"
                placeholder="請設定您的新密碼"
                onChange={this.handleInputTextChange}
                col="col-5"
              />
              <small
                id="newPwdhelp"
                className="form-text  text-danger text-center"
              />
            </>
          </div>
        </Row>
        <Row className="d-flex justify-content-center">
          <div className="col-lg-6 h5">
            <>
              <InputWithLabel_Su
                id="reNewPwd"
                name="reNewPwd"
                inputWidth=""
                inputHeight="48px"
                inputType="password"
                inputLabel="確認密碼"
                placeholder="請重新輸入您設定的新密碼"
                onChange={this.handleInputTextChange}
                col="col-5"
              />
              <small
                id="reNewPwdhelp"
                className="form-text  text-danger text-center"
              />
            </>
          </div>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <button
            className="btn btn-warning h5 my-3 px-5 py-2 border-0 rounded bg-orange text-darkblue"
            // style=
            onClick={this.handleSaveInfo}
          >
            儲存變更
          </button>
        </Row>
      </>
    )
  }
}

export default MemberEditInfo
