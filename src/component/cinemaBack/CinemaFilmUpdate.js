import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputWithLabel_Su from '../inputs/InputWithLabel_Su'
import CheckboxMultiForCinemaTypeSu from '../inputs/CheckboxMultiForCinemaTypeSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'

class CinemaFilmUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [],
      typeOptions: [],
      thisType: [],
      thisData: 0,
      scheduleCount: [],
      usertext: {
        id: '',
        title: '',
        titleEn: '',
        movie_rating: '普遍級 0+',
        imgSrc: '',
        type: '',
        director: '',
        language: '華語',
        intro: '',
        fullIntro: '',
        filmTime: '',
        updateDate: '',
        inTheaterDate: '',
        outTheaterDate: '',
        schedule: [],
        filmStar: [],
      },

      checkok: {
        //儲存格式驗證是否通過
        title: false,
        type: false,
      },
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps)
    // console.log(prevState)
    let stateToBeReturned = null
    if (prevState.thisData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
      }
      console.log(stateToBeReturned)
    }
    return stateToBeReturned
  }
  async componentDidMount() {
    try {
      //取得欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinemaFilmEditInputMsg',
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
      await this.setState({ typeOptions: data })
    } catch (e) {
      console.log(e)
    }
  }
  //輸入框onchange事件
  handleInputTextChange = event => {
    let value = event.target.value //拿到value
    let name = event.target.name //拿到input的name
    let newtext = { ...this.state.usertext } //先複製出要改變的state
    let newcheckstate = { ...this.state.checkok } //先複製出要改變的state

    //title驗證:格式、是否存在
    if (name === 'title') {
      newcheckstate.title = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        if (value.length < 1) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入至少一個字'
        } else {
          //格式正確，再比對是否已存在
          let titleexisted = this.state.thisData.cinemaFilm.find(
            item => item.title === value
          )
          if (titleexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '該影片已經存在'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.title = true
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

    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回去
    if (
      name === 'title' ||
      name === 'titleEn' ||
      name === 'director' ||
      name === 'intro' ||
      name === 'fullIntro' ||
      name === 'filmTime' ||
      name === 'inTheaterDate' ||
      name === 'outTheaterDate'
    ) {
      newtext[name] = value
      this.setState({ usertext: newtext })
    } else if (name === 'movie_rating' || name === 'language') {
      //if是所在縣市
      let selectedIndex = event.target.selectedIndex
      newtext[name] = event.target.options[selectedIndex].text
      this.setState({ usertext: newtext }, () => {
        console.log(this.state.usertext)
      })
    } else if (name === 'imgSrc') {
      // console.log(event.target.files[0])
      // console.log(event.target.files[0].name)

      var file = event.target.files[0]
      var uploadFileName = event.target.files[0].name
      let formdata = new FormData()
      formdata.append('myfile', file)
      fetch('http://localhost:3001/api/cinemaFilm-upload-single', {
        method: 'POST',
        body: formdata,
      })
        .then(res => res.json())
        .then(obj => {
          // console.log(obj)
          if (obj.success == true) {
            newtext[name] = obj.filename
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector(
              '#' + name + 'filename'
            ).innerHTML = uploadFileName
          } else {
            newtext[name] = ''
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector('#' + name + 'filename').innerHTML = obj.info
          }
        })
    } else if (name === 'type') {
      //if是喜愛類型
      let typeOptionAll = [...this.state.typeOptions] //複製所有喜愛類型
      let AlloptionName = Object.values(typeOptionAll.map(item => item.name)) //篩出所有類型的中文name
      let newType = [...this.state.thisType] //複製原本的喜愛類型
      let copyCheckok = { ...this.state.checkok }
      //取出該選項喜愛類型的name(中文字)
      let optionName = this.state.typeOptions.filter(
        item => item.id === value
      )[0].name
      console.log('optionname: ' + optionName)
      console.log('checked: ' + event.target.checked)
      console.log('value: ' + event.target.value)
      if (event.target.checked == false) {
        //點選之後checked狀態會先變，故原本已勾選的選項，會判斷是false
        //將該選項從喜愛類型中過濾掉，同時設定給copyData
        if (optionName === '全選') {
          newType = []
          copyCheckok.type = false
          this.setState({ thisType: newType, checkok: copyCheckok })
        } else {
          if (newType.find(item => item == '全選')) {
            newType = newType.filter(item => item !== '全選')
          }
          newType = newType.filter(item => item !== optionName)
          console.log('newType: ' + newType)
          if (newType.length == 0) {
            copyCheckok.type = false
          }
          this.setState({ thisType: newType, checkok: copyCheckok })
        }
        newtext[name] = newType
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
          newType = AlloptionName
          copyCheckok.type = true
        } else {
          newType.push(optionName)
          console.log('newType22: ' + newType)
          // console.log(AlloptionName.filter(item => item !== '全選'))
          if (newType.length == AlloptionName.length - 1) {
            newType.push('全選')
          }
          copyCheckok.type = true
        }
        this.setState({ thisType: newType })
        newtext[name] = newType
        this.setState({ usertext: newtext, checkok: copyCheckok })
      }
    }
  }
  handleScheduleTime = id => e => {
    let date = document.querySelector('#' + id + 'Date')
    let time = document.querySelector('#' + id + 'Time')
    const newtext = { ...this.state.usertext }
    let newSchedule = []
    let nowscheduleCount = document.getElementsByName('schedule').length
    document.querySelector('#' + id).innerHTML = date.value + ' ' + time.value
    console.log(document.getElementsByName('schedule'))
    for (let i = 0; i < nowscheduleCount; i++) {
      newSchedule.push(document.getElementsByName('schedule')[i].innerHTML)
    }
    newtext.schedule = newSchedule
    this.setState({ usertext: newtext })
  }
  handleAddSchedule = () => {
    const originScheduleCount = this.state.scheduleCount.length
    const copyScheduleCount = [...this.state.scheduleCount]
    copyScheduleCount.push(originScheduleCount + 1)
    this.setState({ scheduleCount: copyScheduleCount })
  }
  handleDelSchedule = () => {
    // const originScheduleCount = this.state.scheduleCount.length
    const newtext = { ...this.state.usertext }
    const copyScheduleCount = [...this.state.scheduleCount]
    newtext.schedule.pop()
    copyScheduleCount.pop()
    this.setState({ usertext: newtext, scheduleCount: copyScheduleCount })
  }

  render() {
    return (
      <>
        <div
          className="d-flex justify-content-center"
          style={{ overflow: 'hidden' }}
        >
          {this.state.usertext.imgSrc !== '' &&
          this.state.usertext.imgSrc !== undefined ? (
            <img
              src={
                this.state.usertext.imgSrc.indexOf('http') == 0
                  ? this.state.usertext.imgSrc
                  : '/images/movieImg/' + this.state.usertext.imgSrc
              }
              style={{ width: '250px', height: '355px', objectFit: 'cover' }}
            />
          ) : (
            ''
          )}
        </div>
        <Row>
          <div className="col-lg-6 mt-3 h5">
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
                <small
                  id={item.id + 'help'}
                  className="form-text text-danger text-center"
                />
              </>
            ))}
          </div>
          <div className="col-lg-6 my-4 h5">
            <p className="h5 my-4">影片摘要</p>
            <textarea
              name="intro"
              className="border border-warning bg-back-input rounded text-orange"
              placeholder="請輸入影片簡介..."
              style={{
                width: '100%',
                height: '135px',
              }}
              onChange={this.handleInputTextChange}
            />
            <p className="h5 my-4">影片介紹</p>
            <textarea
              name="fullIntro"
              className="border border-warning bg-back-input rounded text-orange"
              placeholder="請輸入影片完整內容介紹..."
              style={{
                width: '100%',
                height: '355px',
              }}
              onChange={this.handleInputTextChange}
              // cols="50"
              // rows="5"
            />
          </div>
        </Row>
        <div className="row mt-5 mb-3 d-flex">
          <div className="col-md-12 p-0">
            <ActivityTitle title={'時刻表'} className="content-title" />
            <button
              className="btn btn-warning ml-4 rounded-circle addFilmSchedule mytransition5"
              onClick={this.handleAddSchedule}
            >
              <i className="fas fa-plus text-darkblue" />
            </button>
            <button
              className="btn btn-danger ml-4 rounded-circle addFilmSchedule mytransition5"
              onClick={this.handleDelSchedule}
            >
              <i className="fas fa-minus text-darkblue" />
            </button>
          </div>
        </div>
        <Row>
          {this.state.scheduleCount.map(item => (
            <>
              <div className="col-lg-6 d-flex align-items-center">
                <p
                  className="h5 d-flex align-items-center mx-3"
                  style={{ height: '40px' }}
                >
                  {item}.
                </p>
                <input
                  type="date"
                  id={'schedule' + item + 'Date'}
                  className="h5 my-4 border border-warning bg-back-input rounded text-orange text-center"
                  style={{
                    width: '40%',
                    height: '40px',
                  }}
                  onChange={this.handleScheduleTime('schedule' + item)}
                />
                <input
                  type="time"
                  id={'schedule' + item + 'Time'}
                  className="h5 my-4 border border-warning bg-back-input rounded text-orange text-center"
                  style={{
                    width: '40%',
                    height: '40px',
                  }}
                  onChange={this.handleScheduleTime('schedule' + item)}
                />
                <p
                  id={'schedule' + item}
                  name="schedule"
                  className="h5 d-none align-items-center"
                  style={{ height: '40px' }}
                >
                  123
                </p>
              </div>
            </>
          ))}
        </Row>
        <div className="row mt-5 mb-3">
          <div className="col-md-12 p-0">
            <ActivityTitle title={'影片類型'} className="content-title" />
          </div>
        </div>
        <Row>
          {this.state.typeOptions.map(item => (
            <CheckboxMultiForCinemaTypeSu
              // thisData={this.state.thisData}
              inputName="type"
              optionId={item.id}
              optionName={item.name}
              thisType={this.state.thisType}
              onChange={this.handleInputTextChange}
            />
          ))}
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <Button
            className="btn btn-warning border-0 px-5"
            onClick={this.props.handleCinemaFilmAdd(
              this.state.usertext,
              this.state.checkok,
              this.state.thisType
            )}
          >
            確認送出
          </Button>
        </Row>
      </>
    )
  }
}

export default CinemaFilmUpdate
