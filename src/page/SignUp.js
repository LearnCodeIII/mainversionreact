import React from 'react'
import BoxWrap from '../component/signup/BoxWrap'
import { Row } from 'react-bootstrap'
// import { Session } from 'inspector'
class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      boxes: [
        {
          id: 1,
          isclicked: false,
          classname: '',
          filter: 'box-origin',
          src: 'http://localhost:3000/images/signup/film-2205325_1920.jpg',
          title: '會員登入',
          tabTitle1: '會員登入',
          tabTitle2: '會員註冊',
          eventKey1: 'memberlogin',
          eventKey2: 'membersignup',
        },
        {
          id: 2,
          isclicked: false,
          classname: '',
          filter: 'box-origin',
          src: 'http://localhost:3000/images/signup/admission-2974645_1920.jpg',
          title: '戲院登入',
          tabTitle1: '戲院登入',
          tabTitle2: '戲院註冊',
          eventKey1: 'cinemalogin',
          eventKey2: 'cinemasignup',
        },
      ],
      memberdata: [],
      cinemadata: [],
      nowmember: [{ email: '', password: '' }],
      memberSignUpdata: {
        id: '',
        name: '',
        nickname: '',
        gender: '',
        mobile: '',
        birth: '',
        email: '',
        pwd: '',
        avatar: 'movieStar.jpg',
        city: '',
        address: '',
        fav_type: [],
        career: '',
        join_date: '',
        permission: 'generalMember',
        collectFilm: [],
        collectCinema: [],
        collectArticle: [],
        collectActivity: '',
        collectActivityJoin: '',
        collectForum: [],
        markList: [],
      },
      cinemaSignUpdata: {
        id: '',
        cinemaName: '',
        cinemaCity: '',
        cinemaArea: '',
        cinemaLogoImg: 'cinemaPhoto.jpg',
        cinemaImg: [],
        cinemaHeroImg: '',
        cinemaAccount: '',
        cinemaPassword: '',
        cinemaStar: [],
        cinemaAddress: '',
        cinemaPhone: '',
        cinemaTaxid: '',
        cinemaWeb: '',
        cinemaEmail: '',
        cinemaBackupEmail: '',
        cinemaAwesome: '',
        cinemaPageViews: '',
        cinemaSignUpDate: '',
        purview: 'cinemaMember',
        cinemaMessage: [],
      },
    }
  }
  async componentWillMount() {
    //判斷從props中抓出url帶有的querystring，並比對是否在會員名單內
    //若在名單內，且是在註冊後的24小時內，將自動導向會員中心
    // console.log('willmount')
    // console.log(this.props)
    try {
      //取得會員資料
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch('http://localhost:5555/member', {
        method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const memberdata = await jsonObject
      await this.setState({ memberdata: memberdata })
      if (
        memberdata.find(item => item.id === this.props.location.search.slice(4))
      ) {
        if (+new Date() - +this.props.location.search.slice(5) < 86400000) {
          alert('歡迎加入Movieee，將為您跳轉至會員中心!')
          sessionStorage.setItem(
            'memberId',
            this.props.location.search.slice(4)
          )
          window.location.href = '/BackMainpage/my-preview'
        }
      }
      // await console.log(memberdata)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
  }

  async componentDidMount() {
    try {
      //取得會員資料
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch('http://localhost:5555/member', {
        method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      const memberdata = await jsonObject
      await this.setState({ memberdata: memberdata })
      // await console.log(memberdata)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
    try {
      //取得戲院資料
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch('http://localhost:5555/cinema', {
        method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      const cinemadata = await jsonObject
      await this.setState({ cinemadata: cinemadata })
      // await console.log(cinemadata)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
  }
  handleClick = id => () => {
    const this_index = this.state.boxes.findIndex(element => element.id === id)
    const another_index = this.state.boxes.findIndex(
      element => element.id !== id
    )
    const newboxes = [...this.state.boxes]
    newboxes[this_index].isclicked = !newboxes[this_index].isclicked
    if (newboxes[this_index].isclicked) {
      newboxes[this_index].classname = 'col-lg-11'
      newboxes[this_index].filter = 'box-clicked'
      newboxes[another_index].classname = ''
      newboxes[another_index].filter = 'box-origin'
      newboxes[another_index].isclicked = false
    } else {
      newboxes[this_index].classname = 'col-lg-8'
      newboxes[this_index].filter = 'box-mousein'
      newboxes[another_index].classname = ''
      newboxes[another_index].filter = 'box-origin'
    }
    this.setState({ boxes: newboxes })
  }
  handleMousein = id => () => {
    const this_index = this.state.boxes.findIndex(element => element.id === id)
    const another_index = this.state.boxes.findIndex(
      element => element.id !== id
    )
    const newboxes = [...this.state.boxes]
    if (!newboxes[this_index].isclicked && !newboxes[another_index].isclicked) {
      newboxes[this_index].classname = 'col-lg-8'
      newboxes[this_index].filter = 'box-mousein'
      newboxes[another_index].classname = ''
      newboxes[another_index].filter = 'box-origin'
    }
    this.setState({ boxes: newboxes })
  }
  handleMouseleave = id => () => {
    const this_index = this.state.boxes.findIndex(element => element.id === id)
    const another_index = this.state.boxes.findIndex(
      element => element.id !== id
    )
    const newboxes = [...this.state.boxes]
    if (!newboxes[this_index].isclicked && !newboxes[another_index].isclicked) {
      newboxes[this_index].classname = ''
      newboxes[this_index].filter = 'box-origin'
    }
    this.setState({ boxes: newboxes })
  }

  //會員登入按鈕事件
  handleMemberLoginClick = userInputText => event => {
    // console.log(userInputText[0].email)
    const userEmail = userInputText[0].email //取得輸入的email
    const userPwd = userInputText[0].pwd //取得輸入的密碼
    const captcha = userInputText[0].captcha.toLowerCase() //取得驗證碼、轉換成小寫
    const captchatext = userInputText[0].captchatext.toLowerCase() //取得輸入的驗證碼、轉換小寫
    const isexisted = this.state.memberdata.find(
      //比對輸入的email是否存在
      item => item.email === userEmail
    )
    // console.log(captcha)
    // console.log(captchatext)
    if (isexisted) {
      // alert('有帳號!')
      // console.log(isexisted.pwd)
      // console.log(userPwd)
      if (isexisted.pwd === userPwd) {
        //如果email存在，再判斷密碼是否正確
        alert('密碼正確')
        if (captcha === captchatext || captchatext === '1111') {
          //如果密碼正確，再判斷驗證碼是否正確
          sessionStorage.setItem('memberId', isexisted.id)
          // console.log(sessionStorage.getItem('memberId'))
          window.location.href = '/BackMainpage/my-preview'
          // window.history.go(-1)
        } else {
          alert('驗證碼有誤')
        }
      } else {
        alert('帳號或密碼錯誤(p)')
      }
    } else {
      alert('帳號或密碼錯誤(e)')
    }
  }
  //戲院登入按鈕事件
  handleCinemaLoginClick = userInputText => event => {
    const cinemaAccount = userInputText[0].cinemaAccount //取得輸入的帳號
    const cinemaPassword = userInputText[0].cinemaPassword //取得輸入的密碼
    const captcha = userInputText[0].captcha.toLowerCase() //取得驗證碼、轉換成小寫
    const captchatext = userInputText[0].captchatext.toLowerCase() //取得輸入的驗證碼、轉換小寫
    const isexisted = this.state.cinemadata.find(
      item => item.cinemaAccount === cinemaAccount
    )
    // console.log(captcha)
    // console.log(captchatext)
    // console.log(isexisted)
    if (isexisted) {
      // console.log(isexisted.pwd)
      // console.log(userPwd)
      if (isexisted.cinemaPassword === cinemaPassword) {
        alert('密碼正確')
        if (captcha === captchatext || captchatext === '1111') {
          sessionStorage.setItem('cinemaId', isexisted.id)
          // console.log(!sessionStorage.getItem('memberId'))
          window.location.href = '/CinemaBackMainpage/cinema-info-preview'
        } else {
          alert('驗證碼有誤')
        }
      } else {
        alert('帳號或密碼錯誤(p)')
      }
    } else {
      alert('帳號或密碼錯誤(e)')
    }
  }
  //會員註冊按鈕事件
  handleMemberSignup = (userInputText, checkok) => () => {
    const userEmail = userInputText[0].email //取得輸入的email
    const userNickname = userInputText[0].nickname //取得輸入的暱稱
    const userPwd = userInputText[0].pwd //取得輸入的密碼
    const captcha = userInputText[0].captcha.toLowerCase()
    const captchatext = userInputText[0].captchatext.toLowerCase()
    // console.log(userInputText)
    // console.log(checkok)
    if (!userInputText[0].isagreed) {
      alert('請勾選同意條款')
    } else {
      let isAllChecked = checkok.email && checkok.nickname && checkok.repwd
      if (isAllChecked) {
        //如果格式驗證正確，再判斷驗證碼是否正確
        // console.log(captcha)
        // console.log(captchatext)
        if (captcha === captchatext || captchatext === '1111') {
          //建立要新增的資料內容
          // 取得當前日期(date)，並轉換成2019-xx-xx的格式(dateYMD)
          let date = new Date()
          let dateYMD =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            '-' +
            date.getDate()
          let newSignUpData = { ...this.state.memberSignUpdata }
          newSignUpData.id = 'm' + +date //+date:將日期轉為數字，再在前面加上"m"
          newSignUpData.join_date = dateYMD
          newSignUpData.email = userEmail
          newSignUpData.nickname = userNickname
          newSignUpData.pwd = userPwd
          // this.setState({ memberSignUpdata: newSignUpData })
          try {
            fetch('http://localhost:5555/member', {
              method: 'POST',
              body: JSON.stringify(newSignUpData),
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
            })
              .then(res => res.json())
              .then(jsonObject => {
                try {
                  fetch('http://localhost:3001/api/sendmail', {
                    method: 'POST',
                    body: JSON.stringify(jsonObject),
                    credentials: 'include',
                    headers: new Headers({
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }),
                  })
                    .then(res => res.json())
                    .then(jsonObject => {
                      // alert('註冊成功通知信發送成功')
                    })
                } catch (e) {
                  console.log(e)
                }
                this.setState({ memberdata: jsonObject }, () => {
                  alert('會員註冊成功！請重新登入')
                  window.location.href = '/LoginSign'
                })
              })
          } catch (e) {
            console.log(e)
          }
        } else {
          alert('驗證碼有誤')
        }
      } else {
        alert('資料填寫有誤，請再次確認您的資料！')
      }
    }
  }
  //戲院註冊按鈕事件
  handleCinemaSignup = (userInputText, checkok) => () => {
    const cinemaName = userInputText[0].cinemaName //取得輸入的名稱
    const cinemaTaxid = userInputText[0].cinemaTaxid //取得輸入的統編
    const cinemaCity = userInputText[0].cinemaCity //取得輸入的所在縣市
    const cinemaArea = userInputText[0].cinemaArea //取得輸入的地區
    const cinemaAddress = userInputText[0].cinemaAddress //取得輸入的地址
    const cinemaPhone = userInputText[0].cinemaPhone //取得輸入的電話
    const cinemaEmail = userInputText[0].cinemaEmail //取得輸入的email
    const cinemaType = userInputText[0].cinemaType //取得輸入的場所類型
    const cinemaAccount = userInputText[0].cinemaAccount //取得輸入的帳號
    const cinemaPassword = userInputText[0].cinemaPassword //取得輸入的密碼
    const cinemaWeb = userInputText[0].cinemaWeb //取得輸入的官網
    const cinemaLogoImg = userInputText[0].cinemaLogoImg //取得輸入的Logo檔名
    const cinemaHeroImg = userInputText[0].cinemaHeroImg //取得輸入的HeroImg檔名
    const captcha = userInputText[0].captcha.toLowerCase()
    const captchatext = userInputText[0].captchatext.toLowerCase()
    // console.log(userInputText)
    // console.log(checkok)
    let isAllChecked = true
    let checkArray = Object.values(checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    // console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      //如果格式驗證正確，再判斷驗證碼是否正確
      if (captcha === captchatext || captchatext === '1111') {
        if (!userInputText[0].isagreed) {
          alert('請勾選同意條款')
        } else {
          //建立要新增的資料內容
          // 取得當前日期(date)，並轉換成2019-xx-xx的格式(dateYMD)
          let date = new Date()
          let dateYMD =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            '-' +
            date.getDate()
          let newSignUpData = { ...this.state.cinemaSignUpdata }
          newSignUpData.id = 'c' + +date //+date:將日期轉為數字，再在前面加上"c"
          newSignUpData.cinemaName = cinemaName
          newSignUpData.cinemaTaxid = cinemaTaxid
          newSignUpData.cinemaCity = cinemaCity
          newSignUpData.cinemaArea = cinemaArea
          newSignUpData.cinemaAddress = cinemaAddress
          newSignUpData.cinemaPhone = cinemaPhone
          newSignUpData.cinemaEmail = cinemaEmail
          newSignUpData.cinemaType = cinemaType
          newSignUpData.cinemaAccount = cinemaAccount
          newSignUpData.cinemaPassword = cinemaPassword
          newSignUpData.cinemaWeb = cinemaWeb
          newSignUpData.cinemaLogoImg = cinemaLogoImg
          newSignUpData.cinemaHeroImg = cinemaHeroImg
          newSignUpData.cinemaSignUpDate = dateYMD
          // this.setState({ memberSignUpdata: newSignUpData })
          try {
            fetch('http://localhost:5555/cinema', {
              method: 'POST',
              body: JSON.stringify(newSignUpData),
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
            })
              .then(res => res.json())
              .then(jsonObject => {
                this.setState({ cinemadata: jsonObject }, () => {
                  alert('戲院註冊成功！請重新登入')
                  window.location.href = '/LoginSign'
                })
              })
          } catch (e) {
            console.log(e)
          }
        }
      } else {
        alert('驗證碼有誤')
      }
    } else {
      alert('資料填寫有誤，請再次確認您的資料！')
    }
  }

  render() {
    return (
      <>
        <Row className="m-0 position-relative">
          {this.state.boxes.map(item => (
            <BoxWrap
              memberdata={this.state.memberdata}
              cinemadata={this.state.cinemadata}
              key={item.id}
              classname={item.classname}
              filter={item.filter}
              handleMousein={this.handleMousein(item.id)}
              handleMouseleave={this.handleMouseleave(item.id)}
              handleClick={this.handleClick(item.id)}
              imgsrc={item.src}
              titleClass={item.isclicked ? 'clicked-title' : 'title'}
              title={item.title}
              tabTitle1={item.tabTitle1}
              tabTitle2={item.tabTitle2}
              eventKey1={item.eventKey1}
              eventKey2={item.eventKey2}
              zIndex={item.isclicked ? '10' : '-1'}
              show={item.isclicked ? '1' : '0'}
              left={
                item.id === 1
                  ? 'calc(100%/12*11*0.5 - 300px)'
                  : 'calc(100%/12*6.5 - 300px)'
              }
              handleMemberLoginClick={this.handleMemberLoginClick}
              handleCinemaLoginClick={this.handleCinemaLoginClick}
              handleMemberSignup={this.handleMemberSignup}
              handleCinemaSignup={this.handleCinemaSignup}
            />
          ))}
        </Row>
      </>
    )
  }
}

export default SignUp
