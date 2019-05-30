import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MemberBackSidenav from '../component/backSidenav/MemberBackSidenav'
import CinemaBackSidenav from '../component/backSidenav/CinemaBackSidenav'
import TitleKaga from '../component/cinema/TitleKaga'
import AvatarOne from '../component/cinema/AvatarTypeOne/AvatarOne'
import DataBox from '../component/cinema/DataBoxSM/DataBox'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import MemberEditInfo from '../component/meberBack/MemberEditInfo'
import MemberEditPwd from '../component/meberBack/MemberEditPwd'
import MemberCollectTable from '../component/meberBack/MemberCollectTable'
import MemberCollectTableForForum from '../component/meberBack/MemberCollectTableForForum'
import CheckboxMultiForFavTypeReadSu from '../component/inputs/CheckboxMultiForFavTypeReadSu'
import CinemaEditInfo from '../component/cinemaBack/CinemaEditInfo'
import ForumBackArticle from './ForumBackArticle'
import ForumBackComment from './ForumBackComment'

//memberId
const memberId = sessionStorage.getItem('memberId')

class BackSidenav extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    // console.log(path)
    this.state = {
      // sidenave
      memberSidenavItems: [],
      // 會員用state
      memberEditInputmsg: [],
      favTypeOptions: [], //喜愛電影類型選項
      allMemberData: [], // 全部會員pure json
      thisMemberData: [], // 已登入會員pure json
      allFilmData: [], // 全部影片 pure json
      allArticleData: [], // 全部影片 pure json
      thisCollectArticleData: [], // 該會員收藏的文章資訊
      myForumData: [], //該會員發表的文章資訊
      avatarOne: '', // 整理過頭像框用
      boxData: '', // 整理過基本資料用
      filmCard: [], // 整理過影片卡片用
      //活動用state
      activityPageData: [],
      activityPageOtherData: [],
      activityMemberFavorite: [],
      activityMemberJoin: [],
      collectActivity: '',
    }
    // console.log('parent-didmount')
    // console.log(this.props)
  }

  async componentDidMount() {
    //取得會員sidenav項目
    try {
      const response = await fetch('http://localhost:5555/memberBackSidenav', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ memberSidenavItems: data })
    } catch (e) {
      console.log(e)
    }
    //取得會員資料
    try {
      const response = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject.find(
        item => item.id === sessionStorage.getItem('memberId')
      )
      // console.log('session' + sessionStorage.getItem('memberId'))
      await this.setState({ thisMemberData: data, allMemberData: jsonObject })
    } catch (e) {
      console.log(e)
    }
    //取得會員editInfo項目
    try {
      const response = await fetch('http://localhost:5555/memberEditInputmsg', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ memberEditInputmsg: data })
    } catch (e) {
      console.log(e)
    }
    //取得喜愛電影類型項目
    try {
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

    //activity get
    try {
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
      const dataActivity = await resActivity.json()

      const activityPageData = dataActivity.find(
        item => item.id === this.props.match.params.id
      )
      const activityPageOtherData = dataActivity.filter(
        item => item.id !== this.props.match.params.id
      )

      const activityMemberFavorite = dataActivity.filter(
        item => this.state.thisMemberData.collectActivity.indexOf(item.id) > -1
      )

      const activityMemberJoin = dataActivity.filter(
        item =>
          this.state.thisMemberData.collectActivityJoin.indexOf(item.id) > -1
      )
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityPageOtherData: activityPageOtherData })
      this.setState({ activityMemberFavorite: activityMemberFavorite })
      this.setState({ activityMemberJoin: activityMemberJoin })
    } catch (err) {
      console.log(err)
    }
    const memberId = sessionStorage.getItem('memberId')
    if (memberId !== null) {
      try {
        const res = await fetch('http://localhost:5555/member/' + memberId, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        const data = await res.json()
        this.setState({ collectActivity: data.collectActivity })
      } catch (err) {
        console.log(err)
      }
    }

    // 會員個人資訊頁
    try {
      const resMember = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataMember = await resMember.json()

      // 導入論壇資料
      const resForum = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataForum = await resForum.json()

      // 導入影片資料
      const resFilm = await fetch('http://localhost:5555/filmData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 完整的影片json資料
      const dataFilm = await resFilm.json()

      // 會員my-preview頁面需要的資料
      const memberPageData = await dataMember.find(item => item.id === memberId)

      // ==========Su========預覽頁======導入完整文章資料
      const resArticle = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataArcticle = await resArticle.json()
      const myArticleData = []
      await dataArcticle.filter(item => {
        return memberPageData.collectArticle.map(items => {
          if (item.id === items) {
            myArticleData.push(item)
          }
        })
      })
      // console.log('parnet--myArticleData')
      // console.log(myArticleData)
      //==============================================================

      // 元件AvatarOne -- 完成
      // 如果沒有頭像就給他預設頭像
      const memberAvatar =
        memberPageData.avatar !== '' ? memberPageData.avatar : 'movieStar.jpg'
      const avatarOneData = {
        img: '/images/member/' + memberAvatar,
        name: memberPageData.nickname,
        purview: memberPageData.permission,
        SignUpDate: memberPageData.join_date,
      }

      // 元件DataBox -- 完成
      const forumPublishData = dataForum.filter(
        item => item.forumNameId === memberId
      )
      const dataBoxData = {
        collection: memberPageData.collectFilm.length,
        Awesome: memberPageData.collectArticle.length,
        PageViews: forumPublishData.length,
      }

      // 元件filmCard
      // 先找出影片id跟會員收藏id一致的資料 (會員收藏是array) --到時候串接用
      const filmCard = []
      dataFilm.filter(item => {
        return memberPageData.collectFilm.map(items => {
          if (item.id === items) {
            filmCard.push(item)
          }
        })
      })
      // 如果資料筆數超過設定筆數  就只剩下這幾筆 (這邊設定4筆)  --到時候串接用
      const OnlyFourfilmCardata = []
      filmCard.map((item, index) => {
        if (index < 4) {
          return OnlyFourfilmCardata.push(item)
        }
        return item
      })

      const filmCardData = OnlyFourfilmCardata.map(item => ({
        key: item.id,
        id: item.id,
        title: item.name_tw,
        subtitle: item.name_en,
        img: item.movie_pic,
        link: item.id,
        star: item.filmStar,
        mark: memberPageData.markList,
      }))
      this.setState({
        allArticleData: dataArcticle,
        thisCollectArticleData: myArticleData,
        allFilmData: dataFilm,
        avatarOne: avatarOneData,
        boxData: dataBoxData,
        filmCard: filmCardData,
        myForumData: forumPublishData,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 影片卡片的註記與星星調整 1.改資料庫 2.改state
  filmCardNewStarAndMark = async newVal => {
    // 先抓到要改的影片資料並去除陣列
    // 找到屬於要改註記id的該筆影片資料
    let thisFilm = this.state.allFilmData.filter(
      item => item.id === newVal.mark.markId
    )
    //把這筆資料去除陣列
    let thisFilmData = thisFilm[0] //thisFilmData 就是要更改的影片完整資料
    // 製作要蓋回去mark的資料
    // 先看看mark裡面是不是有這個id的備註
    // 如果有some完就是true然後轉成修改
    // 如果沒有some完就是false然後轉成新增
    // some是要有一筆是true就會回傳true 完全沒有相符的就回傳false
    let markTrueFalse = this.state.thisMemberData.markList.some(
      item => item.markId === thisFilmData.id
    )
    let newMarkUpdateData = []
    if (markTrueFalse === false) {
      newMarkUpdateData.push({
        markId: thisFilmData.id,
        markcontent: newVal.mark.markcontent,
      })
    } else {
      newMarkUpdateData = this.state.thisMemberData.markList.map(item => {
        if (item.markId === thisFilmData.id) {
          item = {
            markId: thisFilmData.id,
            markcontent: newVal.mark.markcontent,
          }
        }
        return item
      })
    }
    // 把剛做好的新mark 套進即將蓋回去會員json的資料
    const NewMemberData = {
      id: this.state.thisMemberData.id,
      name: this.state.thisMemberData.name,
      nickname: this.state.thisMemberData.nickname,
      gender: this.state.thisMemberData.gender,
      mobile: this.state.thisMemberData.mobile,
      birth: this.state.thisMemberData.birth,
      email: this.state.thisMemberData.email,
      pwd: this.state.thisMemberData.pwd,
      avatar: this.state.thisMemberData.avatar,
      city: this.state.thisMemberData.city,
      address: this.state.thisMemberData.address,
      fav_type: this.state.thisMemberData.fav_type,
      career: this.state.thisMemberData.career,
      join_date: this.state.thisMemberData.permission,
      permission: this.state.thisMemberData.permission,
      collectFilm: this.state.thisMemberData.collectFilm,
      collectCinema: this.state.thisMemberData.collectCinema,
      collectArticle: this.state.thisMemberData.collectArticle,
      collectActivity: this.state.thisMemberDatacollectActivity,
      collectForum: this.state.thisMemberData.collectForum,
      markList: newMarkUpdateData,
    }
    // 把有新mark的會員整張蓋回資料庫
    const resMember = await fetch('http://localhost:5555/member/' + memberId, {
      method: 'PUT',
      body: JSON.stringify(NewMemberData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const jsonMember = await resMember.json()
    // console.log(jsonMember)

    // 再來做要蓋回去影片的資料
    let newStarData = { starId: newVal.star.starId, star: newVal.star.star }
    // 先做好要蓋的那之影片的資料 thisNewFilmData
    // 用length判斷是否星星裡面有資料
    let thisNewFilmData = thisFilmData
    let starTrueFalse = thisFilmData.filmStar.some(
      item => item.starId == newVal.star.starId
    )

    // 如果沒有給過星星  就新增一筆
    if (starTrueFalse === false) {
      thisNewFilmData.filmStar.push(newStarData)
      // 如果本來已經有資料了  就找到那筆並修改他
    } else {
      thisNewFilmData.filmStar = thisFilmData.filmStar.map(item => {
        if (item.starId == newVal.star.starId) {
          item = newStarData
        }
        return item
      })
    }
    // 把有新star的戲院整張蓋回資料庫
    const resMark = await fetch(
      'http://localhost:5555/filmData/' + thisNewFilmData.id,
      {
        method: 'PUT',
        body: JSON.stringify(thisNewFilmData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const jsonMark = await resMark.json()

    // 搞卡片資料來改state渲染了.................
    // thisNewFilmData==新的那筆影片原始資料
    // 轉成卡片格式

    let newOneCardData = {
      key: thisNewFilmData.id,
      id: thisNewFilmData.id,
      title: thisNewFilmData.name_tw,
      subtitle: thisNewFilmData.name_en,
      img: thisNewFilmData.movie_pic,
      link: thisNewFilmData.id,
      star: thisNewFilmData.filmStar,
      mark: NewMemberData.markList,
    }
    // 加到卡片資料裡面
    const finalStateFilmCardData = this.state.filmCard.map(el => {
      if (el.id === newOneCardData.id) {
        el = newOneCardData
      }
      return el
    })

    // 然後回去改card的state
    // 一樣限制只能有4筆
    const OnlyFourfilmCardata = []
    finalStateFilmCardData.map((item, index) => {
      if (index < 4) {
        return OnlyFourfilmCardata.push(item)
      }
      return item
    })

    const filmCardData = OnlyFourfilmCardata.map(item => {
      return {
        key: item.key,
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        img: item.img,
        link: item.link,
        star: item.star, // 錯的
        mark: item.mark,
      }
    })
    this.setState({ filmCard: filmCardData })
  }

  //影片卡片按下刪除鈕後刪除此收藏
  filmCardDel = async id => {
    // 去把這個會員的collectFilm裡面的這個影片id刪掉
    // 所以傳id回來
    // thisMemberData 登錄會員的完整json
    try {
      let thisNewMemberData = this.state.thisMemberData
      // 懶得無腦列直接篩選改資料
      // 把不是回傳id的資料都回傳 就是刪除了
      thisNewMemberData.collectFilm = thisNewMemberData.collectFilm.filter(
        item => item !== id
      )
      //蓋回去資料庫
      const response = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'PUT',
        body: JSON.stringify(thisNewMemberData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const jsonObject = await response.json()
      console.log(jsonObject)

      // state要改3個地方
      // filmCard: [], // 整理過影片卡片用
      // thisMemberData: [], // 已登入會員pure json
      // allMemberData: [], // 全部會員pure json

      // 整理要蓋回去filmCard的資料 蓋回去 變成newFileCard
      let newFileCard = this.state.filmCard
      newFileCard = newFileCard.filter(item => item.id !== id)

      // 整理要蓋回去allMemberData的資料 蓋回去 變成newAllMemberData
      let newAllMemberData = this.state.allMemberData
      newAllMemberData = newAllMemberData.map(item => {
        if (item.id === memberId) {
          item = thisNewMemberData
        }
        return item
      })

      // 統一蓋回去
      this.setState({
        thisMemberData: thisNewMemberData,
        filmCard: newFileCard,
        allMemberData: newAllMemberData,
      })
    } catch (e) {
      console.log(e)
    }
  }
  //會員編輯儲存按鈕
  handleMemberEditSave = (data, checkok) => () => {
    let memberid = sessionStorage.getItem('memberId')
    let isAllChecked = true
    let checkArray = Object.values(checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    // console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      try {
        fetch('http://localhost:5555/member/' + memberid, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            this.setState({ thisMemberData: jsonObject }, () => {
              alert('資料儲存成功')
            })
          })
      } catch (e) {
        console.log(e)
      }
    }
  }
  // 登出function
  handleLogout = () => {
    //點擊登出，清除session並導回主頁
    // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
    sessionStorage.clear()
    window.location.href = '/'
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('childDerived')

    let stateToBeReturned = null
    if (prevState.thisData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        originData: nextProps.thisData,
      }
    }

    // console.log(nextProps)
    // console.log(prevState)
    // console.log(stateToBeReturned)
    return stateToBeReturned
  }

  handleCollect = async id => {
    const memberId = sessionStorage.getItem('memberId')
    if (memberId !== null) {
      try {
        const res = await fetch('http://localhost:5555/member/' + memberId, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        let data = await res.json()
        let isCollect = data.collectActivity.indexOf(id) > -1

        if (isCollect) {
          data.collectActivity = data.collectActivity
            .split(id)
            .toString()
            .replace(/,/g, '')
        } else {
          data.collectActivity += id
        }
        this.setState({ collectActivity: data.collectActivity })
        try {
          const res = await fetch('http://localhost:5555/member/' + memberId, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
          console.log('修改完成')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    if (!sessionStorage.getItem('memberId')) {
      // alert('回到登入頁')
      window.location.href = '/LoginSign'
    } else {
      const pagename = this.props.location.pathname.slice(14)

      return (
        <>
          {/* 暫時上方navbar區塊 */}
          <Row>
            <MemberBackSidenav
              sidenavItems={this.state.memberSidenavItems}
              pagename={pagename}
            />
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{
                background: '#2b333d',
                padding: '240px 120px 120px 120px',
              }}
            >
              {/* 會員公開個人資訊 */}
              {pagename === 'my-preview' ? (
                <>
                  <TitleKaga title="公開資訊卡預覽" />
                  <div
                    className="row d-flex align-items-center my-5"
                    style={{ height: '200px' }}
                  >
                    {/* 上面資訊列 */}
                    <AvatarOne
                      img={this.state.avatarOne.img}
                      name={this.state.avatarOne.name}
                      purview={this.state.avatarOne.purview}
                      SignUpDate={this.state.avatarOne.SignUpDate}
                    />
                    <DataBox
                      collection={this.state.boxData.collection}
                      Awesome={this.state.boxData.Awesome}
                      PageViews={this.state.boxData.PageViews}
                      member
                    />
                  </div>
                  {/* 隔開兩類專用 */}
                  <div className="py-5">
                    <TitleKaga title="喜愛電影類型" />
                  </div>
                  {/* 喜好列塞入處 */}
                  <div className="row d-flex align-items-center">
                    <Row>
                      {this.state.favTypeOptions.slice(1).map(item => (
                        <CheckboxMultiForFavTypeReadSu
                          thisData={this.state.thisMemberData}
                          inputName="fav_type"
                          optionId={item.id}
                          optionName={item.name}
                          thisfavType={this.state.thisMemberData.fav_type}
                        />
                      ))}
                    </Row>
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="收藏影片" />
                  <div className="d-flex flex-wrap col-lg-12 mt-4">
                    {this.state.filmCard.map((
                      item //--串接時使用
                    ) => (
                      <CardKaga
                        key={item.key}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={'http://localhost:3000/images/' + item.img}
                        link={'/film/' + item.link}
                        // collectionIcon
                        // collectionClick={this.collectionClick}
                        // collection={}
                        popup
                        member
                        star={item.star}
                        starAmimation
                        mark={item.mark}
                        newStarAndMark={this.filmCardNewStarAndMark}
                        del={this.filmCardDel}
                      />
                    ))}
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="收藏文章" />
                  <div
                    className=" d-flex flex-wrap col-lg-12 my-5"
                    style={
                      {
                        // height: '300px',
                      }
                    }
                  >
                    <MemberCollectTable
                      thisData={this.state.thisMemberData}
                      thisCollectArticleData={this.state.thisCollectArticleData}
                    />
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="發文紀錄" />
                  <div
                    className=" d-flex flex-wrap col-lg-12 my-5"
                    style={
                      {
                        // height: '300px',
                      }
                    }
                  >
                    <MemberCollectTableForForum
                      thisData={this.state.thisMemberData}
                      myForumData={this.state.myForumData}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
              {/* 會員個人資訊編輯 */}
              {pagename == 'edit-myinfo' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'編輯個人資訊'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <MemberEditInfo
                        memberEditInputmsg={this.state.memberEditInputmsg}
                        thisData={this.state.thisMemberData}
                        allMemberData={this.state.allMemberData}
                        handleMemberEditSave={this.handleMemberEditSave}
                        avatarOne={this.state.avatarOne}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'edit-mypassword' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'更改密碼'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <MemberEditPwd
                        memberEditInputmsg={this.state.memberEditInputmsg}
                        thisData={this.state.thisMemberData}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'activityMemberBoard' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'收藏活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityMemberFavorite.map(data => (
                      <div
                        className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                        style={{ width: '250px', height: '360px' }}
                      >
                        <ActivityCard
                          routerId={data.id}
                          handleCollect={() => this.handleCollect(data.id)}
                          key={data.id}
                          title={data.theater}
                          subtitle={data.title}
                          imgSrc={data.imgSrc}
                          collectOpen
                          isCollect={
                            this.state.collectActivity.indexOf(data.id) > -1
                              ? true
                              : false
                          }
                        />
                      </div>
                    ))}
                    <div className="col-md-12 p-0 mt-5">
                      <ActivityTitle
                        title={'已報名活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityMemberJoin.map(data => (
                      <div
                        className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                        style={{ width: '250px', height: '360px' }}
                      >
                        <ActivityCard
                          routerId={data.id}
                          handleCollect={() => this.handleCollect(data.id)}
                          key={data.id}
                          title={data.theater}
                          subtitle={data.title}
                          imgSrc={data.imgSrc}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'activityMemberCollect' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'收藏活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityMemberFavorite.map(data => (
                      <div
                        className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                        style={{ width: '250px', height: '360px' }}
                      >
                        <ActivityCard
                          routerId={data.id}
                          handleCollect={() => this.handleCollect(data.id)}
                          key={data.id}
                          title={data.theater}
                          subtitle={data.title}
                          imgSrc={data.imgSrc}
                          collectOpen
                          isCollect={
                            this.state.collectActivity.indexOf(data.id) > -1
                              ? true
                              : false
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'activityMemberSignUp' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'已報名活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityMemberJoin.map(data => (
                      <div
                        className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                        style={{ width: '250px', height: '360px' }}
                      >
                        <ActivityCard
                          routerId={data.id}
                          handleCollect={() => this.handleCollect(data.id)}
                          key={data.id}
                          title={data.theater}
                          subtitle={data.title}
                          imgSrc={data.imgSrc}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'myPost' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'發文紀錄'}
                        className="content-title"
                      />
                    </div>
                    <ForumBackArticle />
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'myComment' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'留言紀錄'}
                        className="content-title"
                      />
                    </div>
                    <ForumBackComment />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </Row>
        </>
      )
    }
  }
}

export default BackSidenav
