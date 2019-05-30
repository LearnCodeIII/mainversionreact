import React from 'react'
import InputWithLabelForEdit_Su from '../inputs/InputWithLabelForEdit_Su'
import CheckboxMultiSu from '../inputs/CheckboxMultiSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'
import { Row } from 'react-bootstrap'
import AvatarTwo from '../cinema/AvatarTypeTwo/AvatarTwo'

class MemberEditInfo extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      favTypeOptions: [],
      originData: {},
      thisData: 0,
      thisfavType: [],
      hasNewAvatar: false,
      avatarUploadFailed: false,
      checkok: {
        name: true,
        nickname: true,
        birth: true,
        address: true,
      },
    }
  }

  async componentDidMount() {
    //若不設定，切換頁面再回來會無資料
    const data = await this.props.thisData
    await this.setState({ thisData: data })
    await this.setState({ thisfavType: data['fav_type'] })
    try {
      //取得喜愛電影類型項目
      const response = await fetch(
        'http://localhost:5555/memberFavTypeOptions',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ favTypeOptions: data })
    } catch (e) {
      console.log(e)
    }
  }
  componentWillReceiveProps() {
    //若不設定，當頁刷新會無資料
    // console.log(this.state.thisData == 0)
    if (this.state.thisData == 0) {
      //如果state中的資料為空(設定""或{}無效，必須是0)，則將props資料設定給state
      this.setState({ thisData: this.props.thisData })
      this.setState({ thisfavType: this.props.thisData['fav_type'] })
    }
    // 另外儲存一份原始資料...比對暱稱時要用來過濾掉自己原本的名稱
    this.setState({ originData: this.props.thisData })
  }

  //儲存按鈕onclick
  // handleSaveInfo = () => {
  //   let memberid = this.state.thisData.id
  //   let isAllChecked = true
  //   let checkArray = Object.values(this.state.checkok)
  //   isAllChecked = checkArray.reduce((a, b) => a && b)
  //   console.log('isAllChecked: ' + isAllChecked)
  //   if (isAllChecked) {
  //     try {
  //       fetch('http://localhost:5555/member/' + memberid, {
  //         method: 'PUT',
  //         body: JSON.stringify(this.state.thisData),
  //         headers: new Headers({
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(jsonObject => {
  //           this.setState({ thisData: jsonObject }, () => {
  //             alert('資料儲存成功')
  //             window.location.reload()
  //           })
  //         })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   } else {
  //     alert('資料填寫有誤，請再次確認您的資料！')
  //   }
  // }

  //輸入框change事件
  handleInputTextChange = event => {
    console.log(event.target)
    // console.log(this.state.thisData)
    console.log(event.target.value)
    console.log(event.target.name)
    let id = event.target.id
    let value = event.target.value
    let eventName = event.target.name
    let copyData = { ...this.state.thisData }
    let newcheckstate = { ...this.state.checkok }
    // console.log(copyData)

    //姓名驗證:格式、是否已被使用
    if (eventName === 'name') {
      newcheckstate.name = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          console.log(value)
          newcheckstate.name = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + eventName + 'help').innerHTML = ''
        }
      } else {
        newcheckstate.name = true
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //暱稱驗證:格式、是否已被使用
    if (eventName === 'nickname') {
      newcheckstate.nickname = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          //判斷暱稱是否重複使用，先從所有資料中篩選出除了該筆會員的資料，再來進行比對
          let memberexisted = this.props.allMemberData
            .filter(item => item !== this.state.originData)
            .find(item => item.nickname === value)
          if (memberexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '暱稱已被使用'
          } else {
            console.log(value)
            newcheckstate.nickname = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML =
          '暱稱不能為空白'
      }
      console.log(newcheckstate)
    }
    //生日驗證
    if (eventName === 'birth') {
      newcheckstate.birth = false //先將check狀態回復到false
      let birthday_pattern = /^\d{4}\-\d{2}\-\d{2}$/
      if (value) {
        let check = birthday_pattern.test(value)
        if (!check) {
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的生日格式'
        } else {
          newcheckstate.birth = true
          document.querySelector('#' + eventName + 'help').innerHTML = ''
        }
      } else {
        newcheckstate.birth = true
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //地址驗證:格式、是否與所在縣市相同
    if (eventName === 'address') {
      newcheckstate.address = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 11) {
          //判斷是否字元數 < 11 (至少=縣市:3、行政區:3、路名:3、號碼:2)
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的地址'
        } else {
          //判斷地址與所在縣市是否相同
          // console.log(value)
          let city = this.state.thisData.city
          if (city !== '尚未選擇縣市' && city !== '') {
            if (value.substr(0, 3) === city) {
              //相同則回傳
              newcheckstate.address = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#' + eventName + 'help').innerHTML = ''
            } else {
              //不同則跳出提示
              document.querySelector('#' + eventName + 'help').innerHTML =
                '地址與您的所在縣市不相符，請再次確認'
            }
          } else {
            newcheckstate.address = true
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }

    if (eventName === 'gender') {
      //if是性別
      copyData[eventName] = id
    } else if (eventName === 'city' || eventName === 'career') {
      //if是所在縣市
      let selectedIndex = event.target.selectedIndex
      copyData[eventName] = event.target.options[selectedIndex].text
    } else if (eventName === 'fav_type') {
      //if是喜愛類型
      let favTypeOptionAll = [...this.state.favTypeOptions] //複製所有喜愛類型
      let AlloptionName = Object.values(favTypeOptionAll.map(item => item.name)) //篩出所有類型的中文name
      let newFavType = [...this.state.thisfavType] //複製原本的喜愛類型
      //取出該選項喜愛類型的name(中文字)
      let optionName = this.state.favTypeOptions.filter(
        item => item.id === value
      )[0].name
      console.log('optionname: ' + optionName)
      console.log('checked: ' + event.target.checked)
      console.log('value: ' + event.target.value)
      if (event.target.checked == false) {
        //點選之後checked狀態會先變，故原本已勾選的選項，會判斷是false
        //將該選項從喜愛類型中過濾掉，同時設定給copyData
        if (optionName === '全選') {
          newFavType = []
          this.setState({ thisfavType: newFavType })
        } else {
          if (newFavType.find(item => item == '全選')) {
            newFavType = newFavType.filter(item => item !== '全選')
          }
          newFavType = newFavType.filter(item => item !== optionName)
          console.log('newFavType: ' + newFavType)
          this.setState({ thisfavType: newFavType })
        }
        copyData[eventName] = newFavType
      } else {
        //將該選項加入喜愛類型中，同時設定給copyData
        if (optionName === '全選') {
          //取得除了全選以外的所有喜愛項目[{},{},...]
          // let favTypeOptionWithoutAll = [...this.state.favTypeOptions].filter(item => item.id !== value)
          //=====>結果不能這樣，必須把全選也放入才能判定全選的check狀態
          //故先複製所有類型選項(包含全選)===>拉到一開始宣告
          // let favTypeOptionAll = [...this.state.favTypeOptions]
          //再從取得的陣列中，取出每一個物件item中的name的value===>拉到一開始宣告
          // let AlloptionName = Object.values(favTypeOptionAll.map(item => item.name))
          console.log(AlloptionName)
          newFavType = AlloptionName
        } else {
          newFavType.push(optionName)
          console.log('newFavType22: ' + newFavType)
          console.log(AlloptionName.filter(item => item !== '全選'))
          if (newFavType.length == AlloptionName.length - 1) {
            newFavType.push('全選')
          }
        }
        this.setState({ thisfavType: newFavType })
        copyData[eventName] = newFavType
      }
    } else if (eventName == 'avatar') {
      if (event.target.files[0]) {
        //如果有選擇檔案才執行
        console.log(event.target.files[0])
        // console.log(event.target.files[0].name)

        var file = event.target.files[0]
        var uploadFileName = event.target.files[0].name
        let formdata = new FormData()
        formdata.append('myfile', file)
        fetch('http://localhost:3001/api/member-upload-single', {
          method: 'POST',
          body: formdata,
        })
          .then(res => res.json())
          .then(obj => {
            console.log(obj)
            if (obj.success == true) {
              copyData[eventName] = obj.filename
              this.setState(
                {
                  thisData: copyData,
                  hasNewAvatar: true,
                  avatarUploadFailed: false,
                },
                () => console.log(this.state)
              )
            } else {
              this.setState({ avatarUploadFailed: true }, () =>
                console.log(this.state.hasNewAvatar)
              )
            }
          })
      }
    } else {
      //else一般text的處理
      copyData[eventName] = value
    }
    this.setState({ thisData: copyData }, () => {
      console.log(this.state.thisData)
      console.log(this.state.thisfavType)
    })
  }
  handleUploadCancel = async () => {
    let copyData = await { ...this.state.thisData }
    copyData['avatar'] = await this.state.originData.avatar
    await this.setState({ thisData: copyData, hasNewAvatar: false })
  }
  render() {
    // console.log(this.state.thisfavType)
    if (this.state.thisfavType === undefined) {
      return <></>
    }
    return (
      <>
        <Row>
          <div className="col-lg-7 mt-3 h5">
            {this.props.memberEditInputmsg.map(item => (
              <>
                <InputWithLabelForEdit_Su
                  key={item.id}
                  id={item.id}
                  inputWidth={item.w}
                  inputHeight="48px"
                  inputType={item.inputType}
                  inputLabel={item.inputLabel}
                  iconLeft={item.iconL}
                  iconLeftSize={item.iconLS}
                  placeholder={item.placeholder}
                  iconRight={item.iconR}
                  iconRightSize={item.iconRS}
                  selectOptions={item.selectOptions}
                  onChange={this.handleInputTextChange}
                  col="col-5"
                  thisData={this.state.thisData}
                />
                <small
                  id={item.id + 'help'}
                  className="form-text  text-danger text-center"
                />
              </>
            ))}
          </div>
          <div className="col-lg-5 mt-3">
            {/* 這裡放頭像(含編輯按鈕)、email、權限 */}
            <AvatarTwo
              img={'/images/member/' + this.state.thisData.avatar}
              name={this.props.avatarOne.name}
              purview={this.props.avatarOne.purview}
              SignUpDate={this.props.avatarOne.SignUpDate}
              onChange={this.handleInputTextChange}
              handleUploadCancel={this.handleUploadCancel}
              id={'avatar'}
              classShow={this.state.hasNewAvatar}
              uploadtip={this.state.avatarUploadFailed}
            />
          </div>
        </Row>
        <div className="row mt-5 mb-3">
          <div className="col-md-12 p-0">
            <ActivityTitle title={'喜愛影片類型'} className="content-title" />
          </div>
        </div>
        <Row>
          {this.state.favTypeOptions.map(item => (
            <CheckboxMultiSu
              thisData={this.state.thisData}
              inputName="fav_type"
              optionId={item.id}
              optionName={item.name}
              thisfavType={this.state.thisfavType}
              onChange={this.handleInputTextChange}
            />
          ))}
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <button
            className="btn btn-warning h5 my-3 px-5 py-2 border-0 rounded bg-orange text-darkblue"
            // onClick={this.handleSaveInfo}
            onClick={this.props.handleMemberEditSave(
              this.state.thisData,
              this.state.checkok
            )}
          >
            儲存變更
          </button>
        </Row>
      </>
    )
  }
}

export default MemberEditInfo
