import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import CinemaBackSidenav from '../component/backSidenav/CinemaBackSidenav'
import CinemaEditInfo from '../component/cinemaBack/CinemaEditInfo'
import CinemaEditPwd from '../component/cinemaBack/CinemaEditPwd'
import TitleKaga from '../component/cinema/TitleKaga'
import AvatarOne from '../component/cinema/AvatarTypeOne/AvatarOne'
import DataBox from '../component/cinema/DataBoxSM/DataBox'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import MessageCinema from '../component/cinema/MessageSM/MessageCinema'
//cinemaId
import ActivityBtnAddActivity from '../component/activity/ActivityBtnAddActivity/ActivityBtnAddActivity'
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
      // 戲院資訊頁
      allFilmData: [], //全部戲院資料
      AvatarOne: '', //頭像用
      DataBox: '', //收藏統計列用
      FilmCard: [], //影片卡用
      ActivityCard: [], //活動卡用
      MessageBoxData: [],
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
      await this.setState({ thisCinemaData: data, allCinemaData: jsonObject })
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
      const resFilm = await fetch('http://localhost:5555/filmData', {
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
        item.moviecinema.map(item1 => {
          if (item1 === dataThisCinema.id) {
            FilmCardUseData.push(item)
          }
          return item1
        })
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
          title: item.name_tw,
          subtitle: item.name_en,
          img: 'http://localhost:3000/images/' + item.movie_pic,
          link: '/movie/' + item.id,
          star: item.filmStar,
          time: item.in_theaters + ' / ' + item.out_theaters,
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
              alert('資料儲存成功')
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('資料填寫有誤，請再次確認您的資料！')
    }
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
                        img={this.state.AvatarOne.img}
                        name={this.state.AvatarOne.name}
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
                      this.state.FilmCard.map(item => (
                        <div className="d-flex flex-wrap col-lg-12 mt-4">
                          <CardKaga
                            key={item.key}
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            img={item.img}
                            link={item.link}
                            popup
                            star={item.star}
                            AVGStar
                            time={item.time}
                          />
                        </div>
                      ))
                    ) : (
                      <div
                        className="d-flex align-items-center"
                        style={{ height: '300px', width: '100%' }}
                      >
                        <h5 className="ml-4">目前沒有上映影片喔</h5>
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
                        <h5 className="ml-4">目前沒有舉辦活動喔</h5>
                      </div>
                    )}

                    <div className="py-5" />
                    <TitleKaga title="近期評論紀錄" />
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
                        title={'編輯戲院資訊'}
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
              {pagename === 'cinema-manage-activity' ? (
                <>
                  <ActivityBtnAddActivity />
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-activity-in-progress' ? <></> : ''}
              {pagename === 'activity-costum-analysis' ? <></> : ''}
            </div>
          </Row>
        </>
      )
    }
  }
}

export default CinemaBackMainpage
