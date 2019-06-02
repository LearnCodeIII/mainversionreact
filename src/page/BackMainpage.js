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
//Import SweetAlert2
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
})
//memberId
const memberId = sessionStorage.getItem('memberId')

class BackSidenav extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    this.state = {
      // sidenave
      memberSidenavItems: [],
      // 會員用state
      memberEditInputmsg: [],
      favTypeOptions: [], //喜愛電影類型選項
      allMemberData: [], // 全部會員pure json
      thisMemberData: [], // 已登入會員pure json
      allCinemaData: [], // 全部戲院 pure json
      allFilmData: [], // 全部影片 pure json
      allArticleData: [], // 全部影片 pure json
      thisCollectArticleData: [], // 該會員收藏的文章資訊
      myForumData: [],
      avatarOne: '', // 整理過頭像框用
      boxData: '', // 整理過基本資料用
      cinemaCollecCard: [], // 整理過 戲院收藏頁卡片用
      filmCard: [], // 整理過影片卡片用
      filmCollecCard: [], //整裡過 影片收藏頁卡片用
      //活動用state
      activityPageData: [],
      activityPageOtherData: [],
      activityMemberFavorite: [],
      activityMemberJoin: [],
      collectActivity: '',
    }
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

    // 會員個人資訊頁 + 收藏頁--------------------------
    try {
      const resMember = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataMember = await resMember.json()

      const dataThisMember = dataMember.filter(el => el.id === memberId)

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
      const resFilm = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 完整的影片json資料
      const dataFilm = await resFilm.json()

      // 會員頁面需要的資料
      const memberPageData = await dataMember.find(item => item.id === memberId)

      // 導入戲院資料
      const resCinema = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 完整的影片json資料
      const dataCinema = await resCinema.json()

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
      //==============================================================
      // 元件filmCard
      // 先找出影片id跟會員收藏id一致的資料 (會員收藏是array) --到時候串接用
      // 完整的影片資料 dataFilm
      const boosMovieCollec = []
      for (let i = 0; i < dataThisMember[0].collectMovie.length / 14; i++) {
        boosMovieCollec.push(
          dataThisMember[0].collectMovie.substring(14 * i, 14 * i + 14)
        )
      }

      let fileCard1 = []
      let fileCard2 = []
      dataFilm.filter(item => {
        return memberPageData.collectFilm.map(items => {
          if (item.id === items) {
            fileCard1.push(item)
          }
        })
      })
      dataFilm.filter(item => {
        return boosMovieCollec.map(items => {
          if (item.id === items) {
            fileCard2.push(item)
          }
        })
      })

      if (fileCard1.length === 0) {
        fileCard1 = fileCard2
      } else {
        fileCard1.map(el1 => {
          fileCard2.map(el2 => {
            if (el2.id !== el1.id) {
              fileCard1.push(el2)
            }
            return el2
          })
          return el1
        })
      }

      // 影片收藏頁卡片的資料
      const filmCollecCardData = fileCard1.map(item => ({
        key: item.id,
        id: item.id,
        title: item.title,
        subtitle: item.titleEn,
        img: item.imgSrc,
        link: '/movie/' + item.id,
        star: item.filmStar,
        mark: memberPageData.markList,
      }))

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
        collection: fileCard1.length,
        Awesome: memberPageData.collectArticle.length,
        PageViews: forumPublishData.length,
      }

      // 戲院收藏頁卡片的資料
      // 完整的戲院資料 dataCinema
      // 先找到此會員收藏的戲院  撈出這些戲院的資料
      let memberCollecCinema = []
      dataCinema.map(el => {
        memberPageData.collectCinema.map(item => {
          if (el.id === item) {
            memberCollecCinema.push(el)
          }
          return item
        })
        return el
      })

      const cinemaCollecCardData = memberCollecCinema.map(item => ({
        key: item.id,
        id: item.id,
        title: item.cinemaName,
        subtitle: item.cinemaCity + '/' + item.cinemaArea,
        img: 'http://localhost:3000/images/cinemaImg/' + item.cinemaHeroImg,
        link: '/cinema/' + item.id,
        star: item.cinemaStar,
        mark: memberPageData.markList,
      }))

      // 資訊頁卡片要限制四筆
      // 如果資料筆數超過設定筆數  就只剩下這幾筆 (這邊設定4筆)  --到時候串接用
      const OnlyFourfilmCardata = []
      fileCard1.map((item, index) => {
        if (index < 4) {
          return OnlyFourfilmCardata.push(item)
        }
        return item
      })

      // 轉成卡片格式
      const filmCardData = OnlyFourfilmCardata.map(item => ({
        key: item.id,
        id: item.id,
        title: item.title,
        subtitle: item.titleEn,
        img: item.imgSrc,
        link: '/movie/' + item.id,
        star: item.filmStar,
        mark: memberPageData.markList,
      }))

      this.setState({
        allArticleData: dataArcticle,
        thisCollectArticleData: myArticleData,
        allCinemaData: dataCinema,
        allFilmData: dataFilm,
        avatarOne: avatarOneData,
        boxData: dataBoxData,
        cinemaCollecCard: cinemaCollecCardData,
        filmCard: filmCardData,
        filmCollecCard: filmCollecCardData,
        myForumData: forumPublishData,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 影片卡片的註記與星星調整 這邊改資料庫
  filmCardNewStarAndMark = async newVal => {
    // 先抓到要改的影片資料並去除陣列
    let thisFilm = this.state.allFilmData.filter(
      item => item.id === newVal.mark.markId
    )
    let thisFilmData = thisFilm[0] //thisFilmData 就是要更改的影片完整資料
    // 製作要蓋回去mark的資料
    // 先看看mark裡面是不是有這個id的備註
    // 如果有some完就是true然後轉成修改
    // 如果沒有some完就是false然後轉成新增
    // some是要有一筆是true就會回傳true 完全沒有相符的就回傳false
    let markTrueFalse = this.state.thisMemberData.markList.some(
      item => item.markId === thisFilmData.id
    )
    let newMarkUpdateData = this.state.thisMemberData.markList
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
    const NewMemberData = this.state.thisMemberData
    NewMemberData.markList = newMarkUpdateData

    // 然後確實蓋回去
    const resMember = await fetch('http://localhost:5555/member/' + memberId, {
      method: 'PUT',
      body: JSON.stringify(NewMemberData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const jsonMember = await resMember.json()
    console.log(jsonMember)

    // 再來做要蓋回去影片的資料
    let newStarData = { starId: newVal.star.starId, star: newVal.star.star }
    // 先做好要蓋的那之影片的資料 thisNewFilmData
    // 用length判斷是否星星裡面有資料
    let thisNewFilmData = thisFilmData
    let starTrueFalse = thisFilmData.filmStar.some(
      item => item.starId == newVal.star.starId
    )
    if (starTrueFalse === false) {
      thisNewFilmData.filmStar.push(newStarData)
    } else {
      thisNewFilmData.filmStar = thisFilmData.filmStar.map(item => {
        if (item.starId == newVal.star.starId) {
          item = newStarData
        }
        return item
      })
    }
    // 然後確實蓋回去
    const resMark = await fetch(
      'http://localhost:5555/movieCardData/' + thisNewFilmData.id,
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
    console.log(jsonMark)

    // 搞卡片資料來改state渲染了.................
    // thisNewFilmData==新的那筆影片原始資料
    // 轉成卡片格式

    let newOneCardData = {
      key: thisNewFilmData.id,
      id: thisNewFilmData.id,
      title: thisNewFilmData.title,
      subtitle: thisNewFilmData.titleEn,
      img: thisNewFilmData.imgSrc,
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
        star: item.star,
        mark: item.mark,
      }
    })
    this.setState({ filmCard: filmCardData })
  }

  // 影片卡片按下刪除鈕後刪除此收藏
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
      thisNewMemberData.collectMovie = thisNewMemberData.collectMovie
        .split(id)
        .toString()
        .replace(/,/g, '')
      console.log('thisNewMemberData')
      console.log(thisNewMemberData)
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

      // 處理要蓋回去的filmCollecCard  整裡過 影片收藏頁卡片用
      let newFilmCollecCard = this.state.filmCollecCard
      newFilmCollecCard = newFilmCollecCard.filter(item => item.id !== id)

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
        filmCollecCard: newFilmCollecCard,
        thisMemberData: thisNewMemberData,
        filmCard: newFileCard,
        allMemberData: newAllMemberData,
      })
    } catch (e) {
      console.log(e)
    }
  }

  // 戲院卡片的註記與星星調整 這邊改資料庫
  CinemaCardNewStarAndMark = async newVal => {
    let thisCinema = this.state.allCinemaData.filter(
      item => item.id === newVal.mark.markId
    )
    let thisCinemaData = thisCinema[0] //thisFilmData 就是要更改的影片完整資料
    // 製作要蓋回去mark的資料
    // 先看看mark裡面是不是有這個id的備註
    // 如果有some完就是true然後轉成修改
    // 如果沒有some完就是false然後轉成新增
    // some是要有一筆是true就會回傳true 完全沒有相符的就回傳false
    let markTrueFalse = this.state.thisMemberData.markList.some(
      item => item.markId === thisCinemaData.id
    )
    let newMarkUpdateData = this.state.thisMemberData.markList
    if (markTrueFalse === false) {
      newMarkUpdateData.push({
        markId: thisCinemaData.id,
        markcontent: newVal.mark.markcontent,
      })
    } else {
      newMarkUpdateData = this.state.thisMemberData.markList.map(item => {
        if (item.markId === thisCinemaData.id) {
          item = {
            markId: thisCinemaData.id,
            markcontent: newVal.mark.markcontent,
          }
        }
        return item
      })
    }
    // 把剛做好的新mark 套進即將蓋回去會員json的資料
    const NewMemberData = this.state.thisMemberData
    NewMemberData.markList = newMarkUpdateData

    // 然後確實蓋回去
    const resMember = await fetch('http://localhost:5555/member/' + memberId, {
      method: 'PUT',
      body: JSON.stringify(NewMemberData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const jsonMember = await resMember.json()
    console.log('jsonMember')
    console.log(jsonMember)

    // 再來做要蓋回去戲院的資料
    let newStarData = { starId: newVal.star.starId, star: newVal.star.star }
    // 先做好要蓋的那之影片的資料 thisNewFilmData
    // 用length判斷是否星星裡面有資料
    let thisNewCinemaData = thisCinemaData
    let starTrueFalse = thisCinemaData.cinemaStar.some(
      item => item.starId == newVal.star.starId
    )
    if (starTrueFalse === false) {
      thisNewCinemaData.cinemaStar.push(newStarData)
    } else {
      thisNewCinemaData.cinemaStar = thisCinemaData.cinemaStar.map(item => {
        if (item.starId == newVal.star.starId) {
          item = newStarData
        }
        return item
      })
    }
    // 然後確實蓋回去
    const resMark = await fetch(
      'http://localhost:5555/cinema/' + thisNewCinemaData.id,
      {
        method: 'PUT',
        body: JSON.stringify(thisNewCinemaData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const jsonMark = await resMark.json()
    console.log(jsonMark)

    // 搞卡片資料來改state渲染了.................
    // thisNewFilmData==新的那筆影片原始資料
    // 轉成卡片格式

    let newOneCardData = {
      key: thisNewCinemaData.id,
      id: thisNewCinemaData.id,
      title: thisNewCinemaData.cinemaName,
      subtitle:
        thisNewCinemaData.cinemaCity + '/' + thisNewCinemaData.cinemaArea,
      img:
        'http://localhost:3000/images/cinemaImg/' +
        thisNewCinemaData.cinemaHeroImg,
      link: 'http:localhost:3000/cinema/' + thisNewCinemaData.id,
      star: thisNewCinemaData.cinemaStar,
      mark: NewMemberData.markList,
    }

    // 加到卡片資料裡面
    const finalStateCinemaCardData = this.state.cinemaCollecCard.map(el => {
      if (el.id === newOneCardData.id) {
        el = newOneCardData
      }
      return el
    })

    const cinemaCardData = finalStateCinemaCardData.map(item => {
      return {
        key: item.key,
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        img: item.img,
        link: item.link,
        star: item.star,
        mark: item.mark,
      }
    })
    this.setState({ cinemaCollecCard: cinemaCardData })
  }

  // 戲院卡片按下刪除鈕後刪除此收藏
  CinemaCardDel = async id => {
    // 去把這個會員的collectFilm裡面的這個影片id刪掉
    // 所以傳id回來
    // thisMemberData 登錄會員的完整json
    try {
      let thisNewMemberData = this.state.thisMemberData
      // 懶得無腦列直接篩選改資料
      // 把不是回傳id的資料都回傳 就是刪除了
      thisNewMemberData.collectCinema = thisNewMemberData.collectCinema.filter(
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
      let newCinemaCollecCard = this.state.cinemaCollecCard
      newCinemaCollecCard = newCinemaCollecCard.filter(item => item.id !== id)

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
        cinemaCollecCard: newCinemaCollecCard,
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
              // alert('資料儲存成功')
              Toast.fire({
                type: 'success',
                title: '資料儲存成功！',
              })
            })
          })
      } catch (e) {
        console.log(e)
        Toast.fire({
          type: 'error',
          title: '儲存失敗，請檢查您的資料再試一次',
        })
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
    // console.log(nextProps)
    // console.log(prevState)
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
          // alert('已取消收藏')
          Toast.fire({
            type: 'success',
            title: '已取消收藏',
          })
          // window.location.reload()
        } else {
          data.collectActivity += id
          // alert('已加入收藏')
          Toast.fire({
            type: 'success',
            title: '已加入收藏',
          })
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
                      img={'/images/member/' + this.state.thisMemberData.avatar}
                      name={this.state.thisMemberData.nickname}
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
                  {this.state.filmCard.length !== 0 ? (
                    <>
                      <div className="d-flex flex-wrap col-lg-12 mt-4">
                        {this.state.filmCard.map(item => (
                          <CardKaga
                            key={item.key}
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            img={
                              item.img.indexOf('http') == 0
                                ? item.img
                                : '/images/movieImg/' + item.img
                            }
                            link={item.link}
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
                    </>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: '300px', width: '100%' }}
                    >
                      <h5 className="">
                        尚無收藏紀錄，趕快
                        <a style={{ color: '#ffa510' }} href="/movie">
                          前往影片
                        </a>
                        收藏影片吧！
                      </h5>
                    </div>
                  )}

                  <div className="py-5" />
                  <TitleKaga title="收藏文章" />
                  <div className=" d-flex flex-wrap col-lg-12 my-5">
                    <MemberCollectTable
                      thisData={this.state.thisMemberData}
                      thisCollectArticleData={this.state.thisCollectArticleData}
                    />
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="發文紀錄" />
                  <div className=" d-flex flex-wrap col-lg-12 my-5">
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

              {pagename === 'collect-film' ? (
                this.state.filmCollecCard.length !== 0 ? (
                  <>
                    <TitleKaga title="收藏影片" />
                    <div className="d-flex flex-wrap col-lg-12 mt-4">
                      {this.state.filmCollecCard.map((
                        item //--串接時使用
                      ) => (
                        <CardKaga
                          key={item.key}
                          id={item.id}
                          title={item.title}
                          subtitle={item.subtitle}
                          img={
                            item.img.indexOf('http') == 0
                              ? item.img
                              : '/images/movieImg/' + item.img
                          }
                          link={item.link}
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
                  </>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: '300px', width: '100%' }}
                  >
                    <h5 className="ml-4">
                      尚無收藏紀錄，趕快
                      <a style={{ color: '#ffa510' }} href="/movie">
                        前往影片
                      </a>
                      收藏影片吧！
                    </h5>
                  </div>
                )
              ) : (
                ''
              )}

              {pagename === 'collect-cinema' ? (
                this.state.filmCollecCard.length !== 0 ? (
                  <>
                    <TitleKaga title="收藏戲院" />
                    <div className="d-flex flex-wrap col-lg-12 mt-4">
                      {this.state.cinemaCollecCard.map((
                        item //--串接時使用
                      ) => (
                        <CardKaga
                          key={item.key}
                          id={item.id}
                          title={item.title}
                          subtitle={item.subtitle}
                          img={item.img}
                          link={item.link}
                          popup
                          member
                          star={item.star}
                          starAmimation
                          mark={item.mark}
                          newStarAndMark={this.CinemaCardNewStarAndMark}
                          del={this.CinemaCardDel}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: '300px', width: '100%' }}
                  >
                    <h5 className="ml-4">
                      尚無收藏紀錄，趕快
                      <a style={{ color: '#ffa510' }} href="/cinema">
                        前往戲院
                      </a>
                      收藏戲院吧！
                    </h5>
                  </div>
                )
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
                          imgSrc={
                            data.imgSrc.indexOf('http') == 0
                              ? data.imgSrc
                              : '/images/activityImg/' + data.imgSrc
                          }
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
                          imgSrc={
                            data.imgSrc.indexOf('http') == 0
                              ? data.imgSrc
                              : '/images/activityImg/' + data.imgSrc
                          }
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
