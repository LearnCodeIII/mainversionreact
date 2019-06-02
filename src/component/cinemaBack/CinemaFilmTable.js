import React from 'react'
import CinemaFilmEditModal from './CinemaFilmEditModal'

class MemberCollectTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputH: '48px',
      inputmsg: [],
      typeOptions: [], //影片類型選項
      thisType: [], //正在編輯的影片的影片類型
      scheduleCount: [], //正在編輯的影片的時刻表的數量
      thisSchedule: [], //正在編輯的影片的時刻表資料
      thisData: 0, //正在編輯的影片資料
      thisFilmData: 0, //該戲院所有的影片資料
      showModal: false,
      originData: [], //正在編輯的影片的原始資料
    }
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
  static getDerivedStateFromProps(nextProps, prevState) {
    // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
    let stateToBeReturned = null
    if (prevState.thisData == 0 || prevState.thisFilmData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        thisFilmData: nextProps.thisData.cinemaFilm,
      }
    }
    console.log(nextProps)
    console.log(prevState)
    console.log(stateToBeReturned)
    return stateToBeReturned
  }
  // 處理跳出視窗的關閉
  handleModalClose = () => {
    this.setState({ showModal: false })
  }

  // 處理編輯用的跳出視窗
  handleEditModalShow = id => () => {
    //用id找到該筆資料，設定到state的對應值裡去
    const item = this.state.thisFilmData.find(item => item.id === id)
    const scheduleLength = item.schedule.length
    let scheduleCount = []
    for (let i = 0; i < scheduleLength; i++) {
      scheduleCount.push(i + 1)
    }

    // id欄位"不可以"填寫
    // 讓跳出視窗呈現
    this.setState({
      thisData: item,
      originData: item,
      thisSchedule: item.schedule,
      scheduleCount: scheduleCount,
      thisType: item.type,
      showModal: true,
    })
  }
  //輸入框onchange事件
  handleInputTextChange = event => {
    let value = event.target.value //拿到value
    let name = event.target.name //拿到input的name
    let newtext = { ...this.state.thisData } //先複製出要改變的state
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
          let titleexisted = this.state.thisFilmData
            .filter(item => item.title !== this.state.originData.title)
            .find(item => item.title === value)
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
      this.setState({ thisData: newtext })
    } else if (name === 'movie_rating' || name === 'language') {
      let selectedIndex = event.target.selectedIndex
      newtext[name] = event.target.options[selectedIndex].text
      this.setState({ thisData: newtext }, () => {
        console.log(this.state.thisData)
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
            this.setState({ thisData: newtext }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector(
              '#' + name + 'filename'
            ).innerHTML = uploadFileName
          } else {
            newtext[name] = ''
            this.setState({ thisData: newtext }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector('#' + name + 'filename').innerHTML = obj.info
          }
        })
    } else if (name === 'type') {
      //if是喜愛類型
      let typeOptionAll = [...this.state.typeOptions] //複製所有喜愛類型
      let AlloptionName = Object.values(typeOptionAll.map(item => item.name)) //篩出所有類型的中文name
      let newType = [...this.state.thisType] //複製原本的喜愛類型
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
          this.setState({ thisType: newType })
        } else {
          if (newType.find(item => item == '全選')) {
            newType = newType.filter(item => item !== '全選')
          }
          newType = newType.filter(item => item !== optionName)
          console.log('newType: ' + newType)
          this.setState({ thisType: newType })
        }
        newtext[name] = newType
        this.setState({ thisData: newtext })
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
        } else {
          newType.push(optionName)
          console.log('newType22: ' + newType)
          // console.log(AlloptionName.filter(item => item !== '全選'))
          if (newType.length == AlloptionName.length - 1) {
            newType.push('全選')
          }
        }
        this.setState({ thisType: newType })
        newtext[name] = newType
        this.setState({ thisData: newtext })
      }
    }
  }
  handleScheduleTime = id => e => {
    let date = document.querySelector('#' + id + 'Date')
    let time = document.querySelector('#' + id + 'Time')
    const newtext = { ...this.state.thisData }
    let newSchedule = []
    let nowscheduleCount = document.getElementsByName('schedule').length
    document.querySelector('#' + id).innerHTML = date.value + ' ' + time.value
    console.log(document.getElementsByName('schedule'))
    for (let i = 0; i < nowscheduleCount; i++) {
      newSchedule.push(document.getElementsByName('schedule')[i].innerHTML)
    }
    newtext.schedule = newSchedule
    this.setState({ thisData: newtext })
  }
  handleAddSchedule = () => {
    const originScheduleCount = this.state.scheduleCount.length
    const copyScheduleCount = [...this.state.scheduleCount]
    copyScheduleCount.push(originScheduleCount + 1)
    this.setState({ scheduleCount: copyScheduleCount })
  }
  handleDelSchedule = () => {
    // const originScheduleCount = this.state.scheduleCount.length
    const newtext = { ...this.state.thisData }
    const copyScheduleCount = [...this.state.scheduleCount]
    newtext.schedule.pop()
    copyScheduleCount.pop()
    this.setState({ thisData: newtext, scheduleCount: copyScheduleCount })
  }
  handleModalSave = id => () => {
    this.setState({ thisFilmData: 0 })
    this.props.handleEditSave(id, this.state.thisData)()
  }
  render() {
    if (this.props.thisData == 0) {
      return <></>
    }
    return (
      <>
        <CinemaFilmEditModal
          show={this.state.showModal}
          handleClose={this.handleModalClose}
          inputmsg={this.state.inputmsg}
          inputH={this.state.inputH}
          typeOptions={this.state.typeOptions}
          thisType={this.state.thisType}
          thisData={this.state.thisData}
          scheduleCount={this.state.scheduleCount}
          handleInputTextChange={this.handleInputTextChange}
          handleAddSchedule={this.handleAddSchedule}
          handleDelSchedule={this.handleDelSchedule}
          handleScheduleTime={this.handleScheduleTime}
          handleModalSave={this.handleModalSave(this.state.thisData.id)}
          // handleModalFormInputSave={this.handleModalFormInputSave}
          disableIdField={this.state.disableIdField}
        />
        {this.state.thisFilmData.length == 0 ? (
          <h5 className="text-center text-mywhite mx-auto">
            尚無影片紀錄，趕快進入
            <a
              href="/CinemaBackMainpage/cinema-film-post"
              style={{ color: '#ffa510' }}
            >
              影片上架
            </a>
            新增影片吧！
          </h5>
        ) : (
          <table className="table table-borderless text-center h5">
            <thead>
              <tr
                className="text-center"
                style={{ border: '2px solid #ffa510 ', color: '#ffa510' }}
              >
                <th style={{ width: '60px' }}>#</th>
                <th scope="col-lg">中文片名</th>
                <th scope="col-lg">上架日期</th>
                <th scope="col-lg">上檔日期</th>
                <th scope="col-lg">下檔日期</th>
                <th scope="col-lg">上映狀態</th>
                <th scope="col-lg-1">操作</th>
              </tr>
            </thead>
            <tbody className="bg-back-table text-mywhite">
              {this.state.thisFilmData.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '2px solid #2B333D',
                  }}
                >
                  <th scope="row">{index + 1}</th>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {/* <a href={'/article/' + item.id}>{item.title}</a> */}
                    {item.title}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {item.updateDate}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {item.inTheaterDate}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {item.outTheaterDate}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {+new Date() < +new Date(item.inTheaterDate) ? (
                      <span className="text-mywhite">未上映</span>
                    ) : +new Date() > +new Date(item.inTheaterDate) &&
                      +new Date() < +new Date(item.outTheaterDate) ? (
                      <span className="text-success">上映中</span>
                    ) : +new Date() > +new Date(item.outTheaterDate) ? (
                      <span className="text-danger">已下檔</span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                      verticalAlign: 'middle',
                    }}
                  >
                    {/* <button className="btn btn-outline-warning mx-2">
                      <i className="fas fa-eye btnTableEdit" />
                    </button> */}
                    <button
                      className="btn btn-outline-warning mx-2"
                      onClick={this.handleEditModalShow(item.id)}
                    >
                      <i className="fas fa-edit btnTableEdit" />
                    </button>
                    <button
                      className="btn btn-outline-warning mx-2"
                      onClick={this.props.handleFilmDelete(item.id)}
                    >
                      <i className="fas fa-trash btnTableEdit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    )
  }
}
export default MemberCollectTable
