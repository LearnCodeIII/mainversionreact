import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import ActivityCinemaCard from '../component/activity/ActivityCard/ActivityCinemaCard'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import AcitivityForm from '../component/activity/AcitivityForm/AcitivityForm'
import AcitivityEditForm from '../component/activity/AcitivityForm/AcitivityEditForm'
import CinemaBackSidenav from '../component/backSidenav/CinemaBackSidenav'
import CinemaEditInfo from '../component/cinemaBack/CinemaEditInfo'
import CinemaEditPwd from '../component/cinemaBack/CinemaEditPwd'
import TitleKaga from '../component/cinema/TitleKaga'
import AvatarOne from '../component/cinema/AvatarTypeOne/AvatarOne'
import DataBox from '../component/cinema/DataBoxSM/DataBox'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import MessageCinema from '../component/cinema/MessageSM/MessageCinema'
import CinemaFilmUpdate from '../component/cinemaBack/CinemaFilmUpdate'
import CinemaFilmTable from '../component/cinemaBack/CinemaFilmTable'
//cinemaId
import ActivityBtnAddActivity from '../component/activity/ActivityBtnAddActivity/ActivityBtnAddActivity'

//Import SweetAlert2
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
})
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-warning',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
  background: '#242b34',
})
const cinemaId = sessionStorage.getItem('cinemaId')
class CinemaBackMainpage extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    // console.log(path)
    // console.log(props)
    this.state = {
      cinemaSidenavItems: [],
      cinemaEditInputmsg: [],
      allCinemaData: [],
      cinemaId: [],
      thisCinemaData: [],
      thisCinemaCardData: [],
      // 戲院資訊頁
      allFilmData: [], //全部戲院資料
      AvatarOne: '', //頭像用
      DataBox: '', //收藏統計列用
      FilmCard: [], //影片卡用
      ActivityCard: [], //活動卡用
      MessageBoxData: [],
      // 戲院影片刪除強制render用的state
      cinemaFilmDeleteRender: false,
    }
    // console.log('parent-constructor')
  }

  async componentDidMount() {
    // console.log('parent-didmount')
    try {
      //取得戲院sidenav項目
      const response = await fetch('http://localhost:5555/cinemaBackSidenav', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ cinemaSidenavItems: data })
    } catch (e) {
      console.log(e)
    }
    try {
      //取得戲院editInfo項目
      const response = await fetch('http://localhost:5555/cinemaEditInputmsg', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ cinemaEditInputmsg: data })
    } catch (e) {
      console.log(e)
    }
    try {
      //取得戲院資料
      const response = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject.find(item => item.id === cinemaId)
      await this.setState({
        thisCinemaData: data,
        allCinemaData: jsonObject,
      })
    } catch (e) {
      console.log(e)
    }
    try {
      //取得戲院活動
      const response = await fetch('http://localhost:5555/cinema/' + cinemaId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      let data = await response.json()
      data = JSON.parse(JSON.stringify(data.cinemaActivity))
      await this.setState({
        thisCinemaCardData: data,
      })
    } catch (e) {
      console.log(e)
    }
    // cinema-ingfo-preview
    try {
      //取得會員資料
      const resMember = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 全部會員資料 dataMember
      const dataMember = await resMember.json()

      //取得戲院資料
      const resCinema = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!resCinema.ok) throw new Error(resCinema.statusText)
      // 全部戲院資料 dataCinema
      const dataCinema = await resCinema.json()
      // 登錄的戲院資料 dataThisCinema
      const dataThisCinema = await dataCinema.find(item => item.id === cinemaId)

      // 取得影片資料
      const resFilm = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 全部影片資料 dataFilm
      const dataFilm = await resFilm.json()

      // 取得活動資料
      const resActivity = await fetch(
        'http://localhost:5555/activityCardData',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      // 全部活動資料 dataActivity
      const dataActivity = await resActivity.json()

      // AvatarOne
      const AvatarOneData = {
        img:
          'http://localhost:3000/images/cinemaImg/' +
          dataThisCinema.cinemaLogoImg,
        name: dataThisCinema.cinemaName,
        purvie: dataThisCinema.permission,
        SignUpDate: dataThisCinema.cinemaSignUpDate,
      }

      // DataBox
      let DataBoxCollection = []
      // 把有會員中有收藏本戲院的人全部抓出來算有幾個就好惹
      dataMember.map(item => {
        item.collectCinema.map(item1 => {
          if (item1 === dataThisCinema.id) {
            DataBoxCollection.push(item)
          }
        })
      })
      // DataBoxCollection.length就是收藏數
      const DataBoxData = {
        collection: DataBoxCollection.length,
        Awesome: dataThisCinema.cinemaAwesome.length,
        PageViews: dataThisCinema.cinemaPageViews,
      }

      // FilmCard
      let FilmCardUseData = [] // 在本戲院播放的影片的完整資料
      // 把有影片中有在本戲院播放的影片全部抓出來套進去
      dataFilm.map(item => {
        if (item.theater === dataThisCinema.cinemaName) {
          FilmCardUseData.push(item)
        }
        return item
      })
      // 先限制只有4筆
      const OnlyFourfilmCardata = []
      FilmCardUseData.map((item, index) => {
        if (index < 4) {
          return OnlyFourfilmCardata.push(item)
        }
        return item
      })
      // 再把這4筆原始資料加工成card格式, 所以card用 FilmCardData 這隻
      const FilmCardData = []
      OnlyFourfilmCardata.map(item =>
        FilmCardData.push({
          key: item.id,
          id: item.id,
          title: item.title,
          subtitle: item.titleEn,
          img: item.imgSrc,
          link: '/movie/' + item.id,
          star: item.filmStar,
          time: item.inTheaterDate + ' / ' + item.outTheaterDate,
        })
      )

      // ActivityCard
      // 把有活動中有在本戲院舉辦的全部抓出來套進去
      let ActivityCardUseData = dataActivity.filter(
        item => item.theater === dataThisCinema.cinemaName
      )
      // 先限制只有4筆
      const OnlyFourActivityCardData = []
      ActivityCardUseData.map((item, index) => {
        if (index < 4) {
          return OnlyFourActivityCardData.push(item)
        }
        return item
      })
      // 再把這4筆原始資料加工成card格式, 所以card用 ActivityCardData 這隻
      const ActivityCardData = []
      OnlyFourActivityCardData.map(item =>
        ActivityCardData.push({
          key: item.id,
          id: item.id,
          title:
            item.title.length > 6 ? item.title.slice(0, 6) + '...' : item.title,
          subtitle:
            item.content.length > 12
              ? item.content.slice(0, 12) + '...'
              : item.content,
          img: item.imgSrc,
          link: '/activity/' + item.id,
          time: '',
        })
      )

      // MessageCinema
      const OnlyFourMessageBoxData = []
      dataThisCinema.cinemaMessage.map((item, index) => {
        if (index < 6) {
          return OnlyFourMessageBoxData.push(item)
        }
        return item
      })
      const messageBoxData = []
      OnlyFourMessageBoxData.map(item =>
        messageBoxData.push({
          img: 'http://localhost:3000/images/cinemaImg/' + item.img,
          message: item.message,
          name: item.name,
          time: item.time,
        })
      )
      // 用time做比較翻轉順序 不需要了
      // 已從發文那邊改變順序了
      // messageBoxData.sort((a, b) => {
      //   return b.time - a.time
      // })

      // 全部setState上去
      this.setState({
        allFilmData: dataCinema,
        AvatarOne: AvatarOneData,
        DataBox: DataBoxData,
        FilmCard: FilmCardData,
        ActivityCard: ActivityCardData,
        MessageBoxData: messageBoxData,
      })
    } catch (err) {
      console.log(err)
    }
  }
  //戲院編輯儲存按鈕
  handleCinemaEditSave = (data, checkok) => () => {
    let cinemaId = sessionStorage.getItem('cinemaId')
    let isAllChecked = true
    let checkArray = Object.values(checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    // console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      try {
        fetch('http://localhost:5555/cinema/' + cinemaId, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            // sessionStorage.setItem('thisCinemaData', JSON.stringify(jsonObject))
            this.setState({ thisCinemaData: jsonObject }, () => {
              // alert('資料儲存成功')
              Toast.fire({
                type: 'success',
                title: '資料儲存成功！',
              })
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      // alert('資料填寫有誤，請再次確認您的資料！')
      Toast.fire({
        type: 'error',
        title: '儲存失敗，請檢查您的資料再試一次',
      })
    }
  }

  //戲院上架儲存按鈕
  handleCinemaFilmAdd = (data, checkok, type) => () => {
    let isAllChecked = true
    let checkArray = Object.values(checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    // console.log('isAllChecked: ' + isAllChecked)

    if (isAllChecked) {
      const newtext = { ...data }
      const newData = { ...this.state.thisCinemaData }
      let date = new Date()
      let dateYMD =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      newtext.id = 'm' + +date
      newtext.updateDate = dateYMD
      newData.cinemaFilm = [...newData.cinemaFilm, newtext]
      console.log(newData)
      const newDataForMovieCard = { ...newtext }
      if (type.find(item => item == '全選')) {
        newDataForMovieCard.type = newDataForMovieCard.type.slice(1).join('')
      } else {
        newDataForMovieCard.type = newDataForMovieCard.type.join('')
      }
      newDataForMovieCard.theater = this.state.thisCinemaData.cinemaName
      newDataForMovieCard.cinemaId = this.state.thisCinemaData.id
      try {
        fetch('http://localhost:5555/cinema/' + this.state.thisCinemaData.id, {
          method: 'PUT',
          body: JSON.stringify(newData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            try {
              fetch('http://localhost:5555/movieCardData/', {
                method: 'POST',
                body: JSON.stringify(newDataForMovieCard),
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
              })
                .then(res => res.json())
                .then(jsonObject => {
                  // this.setState({ thisCinemaData: jsonObject }, () => {
                  //   alert('資料儲存成功')
                  // })
                })
            } catch (e) {
              console.log(e)
            }
            this.setState({ thisCinemaData: jsonObject }, () => {
              // alert('資料儲存成功')
              Toast.fire({
                type: 'success',
                title: '影片上架完成！',
              })
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      // alert('資料填寫有誤，請再次確認您的資料！')
      Toast.fire({
        type: 'error',
        title: '上架失敗，請檢查您的資料再試一次',
      })
    }
  }

  //影片編輯儲存
  handleEditSave = (id, thisData) => () => {
    // if (thisData.type.length === 0) {
    //   Toast.fire({
    //     type: 'error',
    //     title: '沒有選擇影片類型，請檢查您的資料再試一次',
    //   })
    // } else {
    const newcinemaData = { ...this.state.thisCinemaData } //這個戲院的Data
    //找出這支影片在這個戲院影片列表中的Index
    const thisFilmIndex = newcinemaData.cinemaFilm.findIndex(
      item => item.id === id
    )
    //將這支影片原本的data替換成新的data
    newcinemaData.cinemaFilm[thisFilmIndex] = thisData
    this.setState({ thisCinemaData: newcinemaData })
    const newDataForMovieCard = { ...thisData }
    if (newDataForMovieCard.type.find(item => item === '全選')) {
      newDataForMovieCard.type = newDataForMovieCard.type.slice(1).join('')
    } else {
      newDataForMovieCard.type = newDataForMovieCard.type.join('')
    }
    newDataForMovieCard.theater = this.state.thisCinemaData.cinemaName

    try {
      fetch('http://localhost:5555/cinema/' + this.state.thisCinemaData.id, {
        method: 'PUT',
        body: JSON.stringify(newcinemaData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .then(jsonObject => {
          try {
            fetch(
              'http://localhost:5555/movieCardData/' + newDataForMovieCard.id,
              {
                method: 'PUT',
                body: JSON.stringify(newDataForMovieCard),
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
              }
            )
              .then(res => res.json())
              .then(jsonObject => {})
          } catch (e) {
            console.log(e)
          }
          this.setState({ thisCinemaData: jsonObject }, () => {
            // alert('資料儲存成功')
            Toast.fire({
              type: 'success',
              title: '資料儲存成功',
            })
          })
        })
    } catch (e) {
      console.log(e)
    }
    // }
  }
  handleFilmDelete = id => () => {
    swalWithBootstrapButtons
      .fire({
        title: '<span style="color:#d4d1cc">確定要刪除這支影片?</span>',
        html: '<span style="color:#d4d1cc">提醒：刪除的影片無法再復原</span>',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '確認刪除',
        confirmButtonClass: 'btn btn-warning addFilmSchedule mx-3',
        reverseButtons: true,
        cancelButtonText: '取消',
        cancelButtonClass: 'btn btn-danger addFilmSchedule mx-3',
      })
      .then(result => {
        if (result.value) {
          const newcinemaData = { ...this.state.thisCinemaData } //這個戲院的Data
          //找出這支影片在這個戲院影片列表中的Index
          const thisFilmIndex = newcinemaData.cinemaFilm.findIndex(
            item => item.id === id
          )
          //將這支影片從戲院影片列表中移除
          newcinemaData.cinemaFilm.splice([thisFilmIndex], 1)
          this.setState({ thisCinemaData: newcinemaData }, () =>
            console.log(this.state.thisCinemaData)
          )
          try {
            fetch(
              'http://localhost:5555/cinema/' + this.state.thisCinemaData.id,
              {
                method: 'PUT',
                body: JSON.stringify(newcinemaData),
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
              }
            )
              .then(res => res.json())
              .then(jsonObject => {
                try {
                  fetch('http://localhost:5555/movieCardData/' + id, {
                    method: 'DELETE',
                    headers: new Headers({
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }),
                  })
                    .then(res => res.json())
                    .then(jsonObject => {})
                } catch (e) {
                  console.log(e)
                }
                this.setState(
                  {
                    thisCinemaData: jsonObject,
                    cinemaFilmDeleteRender: !this.state.cinemaFilmDeleteRender,
                  },
                  () => {
                    // alert('資料刪除成功')
                    swalWithBootstrapButtons.fire(
                      '<span style="color:#d4d1cc">刪除成功</span>',
                      '<span style="color:#d4d1cc">已成功刪除影片</span>',
                      'success'
                    )

                    // setTimeout(() => window.location.reload(), 1500)
                  }
                )
              })
          } catch (e) {
            console.log(e)
            Swal.fire({
              type: 'error',
              title: '<span style="color:#d4d1cc">影片刪除失敗</span>',
              text:
                '<span style="color:#d4d1cc">刪除發生問題，請再試一次</span>',
              showConfirmButton: true,
              confirmButtonClass: 'btn btn-warning',
              confirmButtonColor: '#ffa510',
              buttonsStyling: false,
              background: '#242b34',
            })
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            '<span style="color:#d4d1cc">取消刪除</span>',
            '<span style="color:#d4d1cc">影片仍然還在喔！</span>',
            'error'
          )
        }
      })
  }
  handleLogout = () => {
    //點擊登出，清除session並導回主頁
    // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
    sessionStorage.clear()
    window.location.href = '/'
  }
  render() {
    console.log('parent-render')
    if (!sessionStorage.getItem('cinemaId')) {
      // 若沒session，回到登入頁
      window.location.href = '/LoginSign'
    } else {
      const pagename = this.props.location.pathname.slice(20)
      // console.log(pagename)
      return (
        <>
          <Row>
            <CinemaBackSidenav
              sidenavItems={this.state.cinemaSidenavItems}
              pagename={pagename}
            />
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{
                background: '#2b333d',
                padding: '240px 120px 120px 120px',
              }}
            >
              {pagename === 'cinema-info-preview' ? (
                <>
                  <>
                    <TitleKaga title="公開資訊卡預覽" />
                    <div
                      className="row d-flex align-items-center my-5"
                      style={{ height: '200px' }}
                    >
                      {/* 上面資訊列 */}
                      <AvatarOne
                        img={
                          '/images/cinemaImg/' +
                          this.state.thisCinemaData.cinemaLogoImg
                        }
                        name={this.state.thisCinemaData.cinemaName}
                        purview={this.state.AvatarOne.purview}
                        SignUpDate={this.state.AvatarOne.SignUpDate}
                      />
                      <DataBox
                        collection={this.state.DataBox.collection}
                        Awesome={this.state.DataBox.Awesome}
                        PageViews={this.state.DataBox.PageViews}
                      />
                    </div>

                    <div className="py-5" />
                    <TitleKaga title="上映影片" />
                    {this.state.FilmCard.length !== 0 ? (
                      <div className="d-flex flex-wrap col-lg-12 mt-4">
                        {this.state.FilmCard.map(item => (
                          <CardKaga
                            key={item.key}
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            img={
                              item.img.indexOf('http') === 0
                                ? item.img
                                : '/images/movieImg/' + item.img
                            }
                            link={item.link}
                            popup
                            star={item.star}
                            AVGStar
                            time={item.time}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="d-flex align-items-center"
                        style={{ height: '300px', width: '100%' }}
                      >
                        <h5 className="ml-4">
                          尚無紀錄，趕快前往
                          <a
                            style={{ color: '#ffa510' }}
                            href="/CinemaBackMainpage/cinema-film-post"
                          >
                            影片管理
                          </a>
                          上架影片吧！
                        </h5>
                      </div>
                    )}

                    <div className="py-5" />
                    <TitleKaga title="發佈活動" />
                    {this.state.ActivityCard.length !== 0 ? (
                      <div className="d-flex flex-wrap col-lg-12 mt-4">
                        {this.state.ActivityCard.map(item => (
                          <CardKaga
                            key={item.key}
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            img={item.img}
                            link={item.link}
                            popup
                            // mark={item.mark}
                            // newStarAndMark={this.activityCardNewStarAndMark}
                            // star={item.star}
                            // AVGStar
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="d-flex align-items-center"
                        style={{ height: '300px', width: '100%' }}
                      >
                        <h5 className="ml-4">
                          尚無紀錄，趕快前往
                          <a
                            style={{ color: '#ffa510' }}
                            href="/CinemaBackMainpage/cinema-activity-add"
                          >
                            活動管理
                          </a>
                          發起活動吧！
                        </h5>
                      </div>
                    )}

                    <div className="py-5" />
                    <TitleKaga title="近期評論紀錄" />
                    {this.state.MessageBoxData.length !== 0 ? (
                      <div
                        className=" d-flex flex-wrap col-lg-12 my-5"
                        style={
                          {
                            // height: '300px',
                          }
                        }
                      >
                        {this.state.MessageBoxData.map(item => (
                          <MessageCinema
                            img={item.img}
                            message={item.message}
                            name={item.name}
                            time={item.time}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="d-flex align-items-center"
                        style={{ height: '300px', width: '100%' }}
                      >
                        <h5 className="ml-4">尚無紀錄</h5>
                      </div>
                    )}
                  </>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-edit-info' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'編輯戲院資訊'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <CinemaEditInfo
                        img={this.state.AvatarOne.img}
                        cinemaEditInputmsg={this.state.cinemaEditInputmsg}
                        thisData={this.state.thisCinemaData}
                        allCinemaData={this.state.allCinemaData}
                        handleCinemaEditSave={this.handleCinemaEditSave}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-edit-password' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'更改密碼'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <CinemaEditPwd
                        cinemaEditInputmsg={this.state.cinemaEditInputmsg}
                        thisData={this.state.thisCinemaData}
                        allCinemaData={this.state.allCinemaD}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-film-info' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'影片資訊一覽'}
                        className="content-title"
                      />
                    </div>
                    <div className=" d-flex flex-wrap col-lg-12 my-5">
                      <CinemaFilmTable
                        thisData={this.state.thisCinemaData}
                        allCinemaData={this.state.allCinemaD}
                        handleEditSave={this.handleEditSave}
                        handleFilmDelete={this.handleFilmDelete}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-film-post' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'影片上架'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <CinemaFilmUpdate
                        thisData={this.state.thisCinemaData}
                        allCinemaData={this.state.allCinemaD}
                        handleCinemaFilmAdd={this.handleCinemaFilmAdd}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-activity-add' ? (
                <>
                  <AcitivityForm />
                </>
              ) : (
                ''
              )}
              {pagename.indexOf('cinema-activity-inprogress') > -1 ? (
                pagename.slice(27) != '' ? (
                  <>
                    <AcitivityEditForm />
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-md-12 p-0">
                        <ActivityTitle
                          title={'活動列表'}
                          className="content-title"
                        />
                      </div>
                      {this.state.thisCinemaCardData.map(data => (
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                          style={{ width: '250px', height: '360px' }}
                        >
                          <ActivityCinemaCard
                            routerId={data.id}
                            key={data.id}
                            title={data.title}
                            imgSrc={
                              data.imgSrc.indexOf('http') == 0
                                ? data.imgSrc
                                : '/images/activityImg/' + data.imgSrc
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )
              ) : (
                ''
              )}
              {pagename === 'cinema-activity-analysis' ? <></> : ''}
            </div>
          </Row>
        </>
      )
    }
  }
}

export default CinemaBackMainpage
