import React from 'react'
import InputWithLabelForEdit_Su from '../inputs/InputWithLabelForEdit_Su'
import CheckboxMultiSu from '../inputs/CheckboxMultiSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'
import { Row } from 'react-bootstrap'
import AvatarTwo from '../cinema/AvatarTypeTwo/AvatarTwo'

class CinemaEditInfo extends React.Component {
  constructor(props) {
    super(props)
    console.log('childconstructor')
    this.state = {
      originData: {},
      thisData: 0,
      hasNewAvatar: false,
      avatarUploadFailed: false,
      successFileNum: 0,
      failedFileNum: 0,
      checkok: {
        cinemaTaxid: true,
        cinemaName: true,
        cinemaArea: true,
        cinemaAddress: true,
        cinemaPhone: true,
        cinemaBackupEmail: true,
      },
    }
  }
  componentWillMount() {
    console.log('childWillMount')
    //   console.log(this.props.thisData)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('childDerived')
    // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法

    let stateToBeReturned = null
    if (prevState.thisData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        originData: nextProps.thisData,
      }
    }

    console.log(nextProps)
    console.log(prevState)
    console.log(stateToBeReturned)
    return stateToBeReturned
  }

  //輸入框change事件
  handleInputTextChange = event => {
    console.log(event.target)
    // console.log(this.state.thisData)
    console.log(event.target.value)
    console.log(event.target.name)
    console.log('text: ' + event.target.text)
    let id = event.target.id
    let value = event.target.value
    let eventName = event.target.name
    let copyData = { ...this.state.thisData }
    let AllCinemaExpectThis = this.props.allCinemaData.filter(
      item => item !== this.state.originData
    )
    let newcheckstate = { ...this.state.checkok }
    let taxid_pattern = /^\d{8}$/
    let phone_pattern = /^0\d{1,2}\-\d{3,4}\-\d{4}$/
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    let url_pattern = /[a-zA-z]+:\/\/[^s]*/

    //戲院名稱驗證:格式、是否已被使用
    if (eventName === 'cinemaName') {
      newcheckstate.cinemaName = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          //判斷暱稱是否重複使用，先從所有資料中篩選出除了該筆會員的資料，再來進行比對
          let cinemaexisted = AllCinemaExpectThis.find(
            item => item.cinemaName === value
          )
          if (cinemaexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '名稱已被使用'
          } else {
            console.log(value)
            newcheckstate.cinemaName = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML =
          '名稱不能為空白'
      }
      console.log(newcheckstate)
    }
    //統編驗證:格式、是否存在
    if (eventName === 'cinemaTaxid') {
      newcheckstate.cinemaTaxid = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(taxid_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = taxid_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的統一編號'
        } else {
          //格式正確，再比對是否已存在
          let taxidexisted = AllCinemaExpectThis.find(
            item => item.cinemaTaxid === value
          )

          if (taxidexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '統一編號已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaTaxid = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //電話驗證:格式、是否存在
    if (eventName === 'cinemaPhone') {
      newcheckstate.cinemaPhone = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(phone_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = phone_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的電話號碼'
        } else {
          //格式正確，再比對是否已存在
          let phoneexisted = AllCinemaExpectThis.find(
            item => item.cinemaTaxid === value
          )
          if (phoneexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '電話已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaPhone = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //地址驗證:格式、是否與所在縣市相同
    if (eventName === 'cinemaAddress') {
      newcheckstate.cinemaAddress = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 10) {
          //判斷是否字元數 < 10 (至少=縣市:3、行政區:2、路名:3、號碼:2)
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的地址'
        } else {
          //判斷地址與所在縣市是否相同
          // console.log(value)
          let city = this.state.thisData.cinemaCity
          if (city !== '尚未選擇縣市' && city !== '') {
            if (value.substr(0, 3) === city) {
              //相同則回傳
              newcheckstate.cinemaAddress = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#' + eventName + 'help').innerHTML = ''
            } else {
              //不同則跳出提示
              document.querySelector('#' + eventName + 'help').innerHTML =
                '地址與您的所在縣市不相符，請再次確認'
            }
          } else {
            newcheckstate.cinemaAddress = true
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //戲院行政區驗證:格式
    if (eventName === 'cinemaArea') {
      newcheckstate.cinemaArea = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷是否字元數 < 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的行政區域'
        } else {
          newcheckstate.cinemaArea = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + eventName + 'help').innerHTML = ''
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //email驗證:格式、是否存在
    if (eventName === 'cinemaBackupEmail') {
      newcheckstate.cinemaBackupEmail = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(email_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = email_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的Email'
        } else {
          //格式正確，再比對是否已存在
          let emailexisted =
            this.props.allCinemaData.find(item => item.cinemaEmail === value) ||
            this.props.allCinemaData.find(
              item => item.cinemaBackupEmail === value
            )
          if (emailexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              'Email已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaBackupEmail = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //官方網站url驗證:格式、是否存在
    if (eventName === 'cinemaWeb') {
      newcheckstate.cinemaWeb = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(url_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = url_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的網址'
        } else {
          //格式正確，再比對是否已存在
          let urlexisted = AllCinemaExpectThis.find(
            item => item.cinemaWeb === value
          )
          if (urlexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '網址重複使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaWeb = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }

    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回
    if (
      eventName === 'cinemaName' ||
      eventName === 'cinemaTaxid' ||
      eventName === 'cinemaArea' ||
      eventName === 'cinemaAddress' ||
      eventName === 'cinemaPhone' ||
      eventName === 'cinemaBackupEmail' ||
      eventName === 'cinemaWeb' ||
      eventName === 'cinemaIntro'
      // name === 'cinemaHeroImg' ||
    ) {
      copyData[eventName] = value
      this.setState({ thisData: copyData }, () => {
        console.log(this.state.thisData)
      })
    } else if (eventName === 'cinemaType') {
      copyData[eventName] = event.target.id
      this.setState({ thisData: copyData }, () =>
        console.log(this.state.thisData)
      )
    } else if (eventName === 'cinemaCity') {
      console.log(event.target.selectedIndex) //被選取的option的index
      let selectedIndex = event.target.selectedIndex
      copyData[eventName] = event.target.options[selectedIndex].text //被選取的option的文字內容
      this.setState({ thisData: copyData }, () =>
        console.log(this.state.thisData)
      )
    } else if (eventName == 'cinemaHeroImg') {
      console.log(event.target.files[0])
      console.log(event.target.files[0].name)

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
          console.log(obj)
          if (obj.success == true) {
            copyData[eventName] = obj.filename
            this.setState({ thisData: copyData }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector(
              '#' + eventName + 'filename'
            ).innerHTML = uploadFileName
          } else {
            copyData[eventName] = ''
            this.setState({ thisData: copyData }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector('#' + eventName + 'filename').innerHTML =
              obj.info
          }
        })
    } else if (eventName == 'cinemaImg') {
      // console.log(event.target.files)
      // console.log(event.target.files[0].name)

      var files = event.target.files
      let successFileNum = this.state.successFileNum
      var failedFileNum = this.state.failedFileNum
      for (let i = 0; i < files.length; i++) {
        let thisfile = files[i]
        console.log(thisfile)
        let formdata = new FormData()
        formdata.append('myfile', thisfile)
        fetch('http://localhost:3001/api/cinema-upload-single', {
          method: 'POST',
          body: formdata,
        })
          .then(res => res.json())
          .then(obj => {
            if (obj.success == true) {
              successFileNum++
              copyData[eventName].push(obj.filename)
            } else {
              failedFileNum++
              // copyData[eventName] = []
            }
            document.querySelector('#' + eventName + 'filename').innerHTML =
              '附加檔案成功 ' +
              successFileNum +
              ' 筆，失敗 ' +
              failedFileNum +
              ' 筆'
            this.setState({
              successFileNum: successFileNum,
              failedFileNum: failedFileNum,
            })
            var imgBox = document.createElement('div')
            var eleImg = document.createElement('img')
            var delBtn = document.createElement('button')
            var btnIcon = document.createElement('i')
            btnIcon.setAttribute('style', 'font-size:30px; margin:-4px 0 0 0')
            btnIcon.setAttribute('class', 'fas fa-ban')
            // delBtn.innerHTML = `<i name="btnIcon" class="fas fa-ban" style="font-size:30px; margin:-4px 0 0 0"></i>`
            delBtn.appendChild(btnIcon)
            delBtn.setAttribute(
              'class',
              'position-absolute btn btn-outline-danger border-0 d-flex justify-content-center align-items-center'
            )
            delBtn.setAttribute(
              'style',
              'width:40px ; height:40px; color: danger '
            )

            //刪除圖片的BTN的ICON的click事件
            btnIcon.addEventListener('click', event => {
              event.stopPropagation()
              copyData['cinemaImg'] = copyData['cinemaImg'].filter(
                item => item !== obj.filename
              )
              document
                .querySelector('#cinemaImgPreview')
                .removeChild(event.target.parentNode.parentNode)
              let successFileNum = this.state.successFileNum
              successFileNum--

              this.setState(
                { thisData: copyData, successFileNum: successFileNum },
                () => console.log(this.state.thisData)
              )
              document.querySelector('#' + eventName + 'filename').innerHTML =
                '附加檔案成功 ' +
                successFileNum +
                ' 筆，失敗 ' +
                failedFileNum +
                ' 筆'
            })
            //刪除圖片的BTN的click事件
            delBtn.addEventListener('click', event => {
              // alert(obj.filename)
              // console.log(event.target)
              event.stopPropagation()
              copyData['cinemaImg'] = copyData['cinemaImg'].filter(
                item => item !== obj.filename
              )
              document
                .querySelector('#cinemaImgPreview')
                .removeChild(event.target.parentNode)
              let successFileNum = this.state.successFileNum
              successFileNum--
              this.setState(
                { thisData: copyData, successFileNum: successFileNum },
                () => console.log(this.state.thisData)
              )
              document.querySelector('#' + eventName + 'filename').innerHTML =
                '附加檔案成功 ' +
                successFileNum +
                ' 筆，失敗 ' +
                failedFileNum +
                ' 筆'
            })
            eleImg.setAttribute('src', '/images/cinemaImg/' + obj.filename)
            eleImg.setAttribute(
              'style',
              'width: 100%; box-shadow:#000 2px 2px 2px; objectFit:cover'
            )
            eleImg.classList.add('thumb')
            imgBox.setAttribute(
              'style',
              'width: 300px; height:200px; overflow:hidden'
            )
            imgBox.appendChild(delBtn)
            imgBox.appendChild(eleImg)
            document.querySelector('#cinemaImgPreview').appendChild(imgBox)
            this.setState({ thisData: copyData }, () =>
              console.log(this.state.thisData)
            )
          })

        // uploadFileName.push(event.target.files[i].name)
      }
    } else if (eventName == 'cinemaLogoImg') {
      if (event.target.files[0]) {
        //如果有選擇檔案才執行
        console.log(event.target.files[0])
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
    }
  }
  handleUploadCancel = async () => {
    let copyData = await { ...this.state.thisData }
    copyData['cinemaLogoImg'] = await this.state.originData.cinemaLogoImg
    await this.setState({ thisData: copyData, hasNewAvatar: false })
  }
  render() {
    console.log('childrender')
    // console.log(this.props.thisData)
    return (
      <>
        <Row>
          <div className="col-lg-7 mt-3 h5">
            {this.props.cinemaEditInputmsg.map(item => (
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
                  col="col-2"
                  thisData={this.state.thisData}
                  multiple={item.multiple ? true : false}
                />
                <small
                  id={item.id + 'help'}
                  className="form-text  text-danger text-center"
                />
              </>
            ))}
            <Row>
              <div
                id="cinemaImgPreview"
                className="d-flex flex-wrap"
                style={{ width: '100%' }}
              />
            </Row>
          </div>
          <div className="col-lg-5 mt-3 mb-5">
            {/* 這裡放頭像(含編輯按鈕)、email、權限 */}
            <AvatarTwo
              img={'/images/cinemaImg/' + this.state.thisData.cinemaLogoImg}
              name={this.state.thisData.cinemaName}
              purview={this.state.thisData.purview}
              SignUpDate={this.state.thisData.cinemaSignUpDate}
              onChange={this.handleInputTextChange}
              handleUploadCancel={this.handleUploadCancel}
              id={'cinemaLogoImg'}
              classShow={this.state.hasNewAvatar}
              uploadtip={this.state.avatarUploadFailed}
            />
            <p className="h5 mt-5 mb-4">戲院簡介</p>
            <textarea
              name="cinemaIntro"
              className="border border-warning bg-back-input rounded text-orange"
              placeholder="請輸入介紹內容..."
              style={{
                width: '100%',
                height: '350px',
              }}
              onChange={this.handleInputTextChange}
              value={this.state.thisData.cinemaIntro}
              // cols="50"
              // rows="5"
            />
          </div>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <button
            className="btn btn-warning h5 my-3 px-5 py-2 border-0 rounded bg-orange text-darkblue"
            onClick={this.props.handleCinemaEditSave(
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

export default CinemaEditInfo
