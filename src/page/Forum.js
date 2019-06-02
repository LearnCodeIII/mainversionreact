import React from 'react'
import { Link } from 'react-router-dom'
import ForumArticleListRoy from '../component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../component/Forum/ForumActionButton/ActionButtonFilterRoy'
import ActionButtonCommentRoy from '../component/Forum/ForumActionButton/ActionButtonCommentRoy'
import ActionBtnScrollTopRoy from '../component/Forum/ForumActionButton/ActionBtnScrollTopRoy'
import ActionBtnScrollBottomRoy from '../component/Forum/ForumActionButton/ActionBtnScrollBottomRoy'
// import ActionBtnCreateRoy from '../component/Forum/ForumActionButton/ActionBtnCreateRoy'
// import ActionBtnUpdateArticleRoy from '../component/Forum/ForumActionButton/ActionBtnUpdateArticleRoy'
import ForumSideActionBarRoy from '../component/Forum/ForumSideActionBarRoy'
import ForumCategoryTextRoy from '../component/Forum/ForumArticleComment/ForumCategoryTextRoy'
import ForumCommentCountRoy from '../component/Forum/ForumArticleComment/ForumCommentCountRoy'
import ForumArticleCommentInputRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentInputRoy'
import ForumCommentCancelRoy from '../component/Forum/ForumArticleComment/ForumCommentCancelRoy'
import ForumCommentCreateRoy from '../component/Forum/ForumArticleComment/ForumCommentCreateRoy'
// InputCardContent_MemberSignUp發文用
import InputCardContent_MemberSignUp from '../component/Forum/ForumActionButton/InputCardContent_MemberSignUp'
import ForumPage from '../component/Forum/ForumArticleList/ForumPage'

import Swal from 'sweetalert2'

class Forum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 目前登入者
      nowLoginUserId: '',
      // 目前登入者資訊
      noLoginInfo: '',
      // 根據搜尋結果設定頁面顯示
      searchStatus: 'd-none',
      searchNoDataContentStatus: '',
      searchNoDataContentHiddenArea: 'd-none',
      loading: false,
      // listdata用來接JSONSERVER所FETCH到的資料
      // 再didmount裡有reverse過要注意陣列索引值
      listdata: [],
      //listdataReverse 將原始撈出的listdata陣列反轉方便控制最後一筆顯示最上面
      listdataReverse: [],
      //nowIDdata 用來接比對params文章對應到的所有內容，用來渲染到文章內容用
      nowIDdata: {},
      // currentdata用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容用
      currentdata: {},
      // 用來裝留言，因為要MAP所以要用陣列方式
      currentcommentdata: [],
      // API型式裝留言
      currentcommentApi: [],
      // 發表文章光香彈出判斷
      show: false,
      imagePath: '/images/member/',
      forumData: [],
      id: 0,
      headline: '',
      forumSpoilers: false,
      // 蒐藏會員陣列
      // 爆雷內容顯示控制
      articleShow: false,
      // 控制以點開的爆雷˙文章可以永久顯示
      spoilerClickCheck: [],
      forumCollectMember: [],
      forumViews: 0,
      forumCreateDate: '',
      forumCreateDateInSecond: 0,
      forumCreateTimeCount: 0,
      commentCreateTimeCount: [],
      forumCommentCreateTimeDate: '',
      forumName: '',
      // 要撈會員
      forumNameId: '',
      // 發文會員的ID
      forumAvatar: '9743_2.jpg',
      forumArticlePic: '',
      forumReview: '',
      forumReviewLike: 0,
      forumCommentCount: 0,
      forumCommentArea: [],
      // 判斷列表是否有被點擊
      listClickChek: false,
      // 判斷留言發送是否有被點擊
      CommentClickChek: false,
      // 裝留言input欄位變更後站存空間，到最後在發送留言時再引入值
      commentTempStorage: '',
      // 確認留言欄是否有輸入內容當作狀態判斷讓送出按鈕控制是否要不要作用
      CommentInputStatus: false,
      commentlikeStatus: false,
      commentDislikeStatus: false,
      // 判斷蒐藏狀態
      collectStatus: false,
      // 判斷篩選狀態的收藏生蜜或降冪
      ViewfilterStatus: false,
      // 日期新舊排序分類用
      handleDateFilterStatus: false,
      // 日期篩選後第一筆資料ID
      filterDataFirstDataId: 1,
      // 留言排序切換生蜜降冪
      handlCommentFilterStatus: false,
      // 左邊列表顯示排序時應該顯示收藏還是留言數開關
      listFilterAccordding: false,
      // 篩選欄顯示狀態
      filterBarShow: false,
      // 確認是否有點選邊輯標題按鈕
      // 一定要把true false設為字串傳，contenteditable如果只給boolean不會顯示
      handleHeadlineEditStatus: 'false',
      handleArticleEditStatus: 'false',
      HeadlineCancelBtnStatus: 'd-none',
      HeadlineSaveBtnStatus: 'd-none',
      HeadlineEditBtnStatus: '',
      ArticleCancelBtnStatus: 'd-none',
      ArticleSaveBtnStatus: 'd-none',
      ArticleEditBtnStatus: '',
      // 發文時間計算用
      hour: 0,
      minute: 0,
      second: 0,
      // 目前總頁數
      ForumTotalPages: 0,
      // 用來傳給當前頁碼第一筆資料路徑參照值
      cuerrenPageFirstData: [],
      // 計算上下頁用的參照容器
      currentPage: 1,
      // 目前頁面第一筆資料ID
      currentLastDataId: 1,
      // CSS內容
      inputH: '48px',
      inputmsg: [
        //設定Input內容
        {
          id: 'Forumtitle',
          w: '',
          h: '',
          iconL: 'fas fa-envelope',
          iconLS: '28px',
          placeholder: '',
          iconR: '',
          iconRS: '',
          inputType: 'text',
          inputLabel: '標題',
        },
        // {
        //   id: 'Forumfile',
        //   w: '',
        //   h: '',
        //   iconL: 'fas fa-envelope',
        //   iconLS: '28px',
        //   placeholder: '',
        //   iconR: '',
        //   iconRS: '',
        //   inputType: 'file',
        //   inputLabel: '圖片',
        // },
      ],
    }
  }

  // 上傳圖片名稱到STATE
  handleArticlePicChange = evt => {
    this.setState({ forumArticlePic: evt.target.files[0].name })
    console.log(evt.target.files[0].name.split('.')[0])
  }

  async componentDidMount() {
    const nowLoginID = sessionStorage.getItem('memberId')
    console.log(nowLoginID)
    this.setState({ nowLoginUserId: nowLoginID })

    try {
      await this.setState({ loading: true })
      // 從JSONSERVER中抓forum這個陣列的的JSON檔
      const response = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      const jsonObject = await response.json()
      // console.log(jsonObject)
      await this.setState({
        // 用來下面ForumArticleListRoy渲染列表內容
        listdata: jsonObject,
      })

      // 預設將頁面設為顯示10筆
      const totalPagesNow = Math.ceil(this.state.listdata.length / 10)
      await this.setState({
        ForumTotalPages: totalPagesNow,
        // 初次登入會沒有預設值所以先得最後一筆資料的id當作生成頁面按鈕的導向位置
        // 這邊不要reverse因為頁面列表資訊是反過來的
        cuerrenPageFirstData: this.state.listdata,
      })

      // 加上slice是為了控制根據目前點到的頁面去切割陣列重新帶入state渲染出新的對應頁面10筆資料
      // 渲染左側列表用
      // 將讀出的陣列反轉，用來讓資料最後一筆顯示在最上面
      // 方便陣列控制只要選索引0就可選到最後一筆
      const listdatareverse = this.state.listdata.reverse().slice(0, 10)
      // console.log(listdatareverse)

      // 用來裝目前要顯示左側列表的資料
      await this.setState({ listdataReverse: listdatareverse })
      // console.log(this.state.listdataReverse)

      // -----------內文didmount 找到目前LINK頁面後面接的ID所對應到DATA中的資料物件Start---------------
      const nowIddata = this.state.listdata.find(
        item =>
          item.id ===
          (this.props.match.params.id
            ? +this.props.match.params.id
            : +this.state.listdataReverse[0].id)
        // 比對有沒有抓到路徑ID，如果沒有就帶入反轉後最新一筆的id
        // TODO:確認如果沒有半筆資料該怎樣抓ID,ID不存在的話?
      )
      console.log(nowIddata)
      // 如果nowIddata比對到資料就set state如果比對不到就自動重導頁面到最新一筆後再setstate
      if (nowIddata) {
        await this.setState({
          nowIDdata: nowIddata,
        })
      } else {
        window.location.href = '/forum/' + this.state.listdataReverse[0].id
        await this.setState({
          nowIDdata: nowIddata,
        })
      }
      // console.log(this.state.listdataReverse[0].id)
      // console.log(this.state.nowIDdata)
      // console.log(this.state.listdataReverse[0].id)
      // -----------內文didmount 找到目前LINK頁面後面接的ID所對應到DATA中的資料物件End---------------

      // -----------留言didmount Start---------------
      const nowIdcomment = this.state.listdata.find(
        item =>
          item.id ===
          (this.props.match.params.id
            ? +this.props.match.params.id
            : +this.state.listdataReverse[0].id)
        // 比對有沒有抓到路徑ID，如果沒有就帶入反轉後最新一筆的id
        // TODO:確認如果沒有半筆資料該怎樣抓ID,ID不存在的話?
      )
      // console.log(nowIdcomment)
      // 如果nowIdcomment比對到資料就set state如果比對不到就自動重導頁面到最新一筆後再setstate
      if (nowIdcomment) {
        await this.setState({
          currentcommentApi: nowIdcomment.forumCommentArea,
        })
      } else {
        window.location.href = '/forum/' + this.state.listdataReverse[0].id
        await this.setState({
          currentcommentApi: nowIdcomment.forumCommentArea,
        })
      }
      // console.log(this.state.nowIDdata)
      // console.log(this.state.listdataReverse[0].id)
      // -----------留言didmount End---------------

      // 如果導向頁面沒有接ID則導向最後一頁
      // console.log(this.props.match.params.id)
      if (this.props.match.params.id === undefined) {
        window.location.href = '/forum/' + this.state.listdataReverse[0].id
      }
      //
      //
      // -------------發文時間偵測計算start-----------------------------------
      // this.timerID為生命週期中用來清除的
      this.timerID = setInterval(this.articleCreateTimeCount, 10000)
      this.timerIDComment = setInterval(this.CommentCreateTimeCount, 10000)
      // 搭配呼叫articleCreateTimeCount然後設interval 最後用 componentWillUnmount生命週期讓他失效

      // -------------發文時間偵測計算End-----------------------------------
      //
      //
    } catch (e) {
      console.log(e)
    }

    try {
      const res = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const noLoginInfo = data.find(
        item => item.id === sessionStorage.getItem('memberId')
      )

      // console.log(data)
      // console.log(noLoginInfo)
      this.setState({ noLoginInfo: noLoginInfo })
    } catch (err) {
      console.log(err)
    }
  }

  // 用來實時更新時間，讓舊的時間元件失效
  componentWillUnmount() {
    clearInterval(this.timerID)
    clearInterval(this.timerIDComment)
  }

  // ------------------------------發文時間自動更新套餐Start---------------------------------------
  // 用來實時更新時間
  articleCreateTimeCount = () => {
    const articleCurrent = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )

    // const a = articleCurrent.forumCommentArea.map(e => coonsole.log(e))

    // console.log(articleCurrent)
    const nowTime = +new Date()
    const messageTime = articleCurrent.forumCreateDateInSecond
    let time = nowTime - messageTime
    let secondnumber = time / 1000
    let minutenumber = time / 60000
    // 秒
    let second = Math.floor(secondnumber % 60)
    // 小時
    let hour = minutenumber / 60 >= 1 ? Math.floor(minutenumber / 60) : ''
    // 分鐘
    let minute = minutenumber % 60 >= 1 ? Math.floor(minutenumber % 60) : ''
    // 天
    let day = hour / 24 >= 1 ? Math.floor(hour / 24) : ''
    let showTimeText =
      day >= 1
        ? day + '天'
        : hour >= 1
        ? hour + '小時'
        : minute >= 1
        ? minute + '分鐘'
        : second + '秒'
    // 已發佈時間邏輯結束

    this.setState({ forumCreateTimeCount: showTimeText })
  }

  // ------------------------------發文時間自動更新套餐End----------------------------------------

  // ------------------------------留言時間自動更新套餐Start---------------------------------------
  // 用來實時更新時間
  CommentCreateTimeCount = () => {
    const articleCurrent = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )

    var doubles = articleCurrent.forumCommentArea.map(function(num) {
      const nowTime = +new Date()
      const messageTime = num.forumCommentCreateTime
      let time = nowTime - messageTime
      let secondnumber = time / 1000
      let minutenumber = time / 60000
      // 秒
      let second = Math.floor(secondnumber % 60)
      // 小時
      let hour = minutenumber / 60 >= 1 ? Math.floor(minutenumber / 60) : ''
      // 分鐘
      let minute = minutenumber % 60 >= 1 ? Math.floor(minutenumber % 60) : ''
      // 天
      let day = hour / 24 >= 1 ? Math.floor(hour / 24) : ''
      // console.log(day)
      let showTimeText =
        day >= 1
          ? day + '天'
          : hour >= 1
          ? hour + '小時'
          : minute >= 1
          ? minute + '分鐘'
          : second + '秒'
      // console.log(showTimeText)

      return showTimeText
    })

    // console.log(doubles)

    this.setState({ commentCreateTimeCount: doubles })
  }

  // ------------------------------留言時間自動更新套餐End----------------------------------------

  // ----------------------------------pagination頁面套餐start-------------------------------
  // 最後動作完一定要設定state讓全部重新渲染
  handleNowPageNumber = async e => {
    // 在點了頁面列表後因為會變成TRUE，RENDER的STATE就改變了會造成在回來點PAGE會無法讓右邊頁面重新渲染
    // 所以要把列表點擊趕痕FALSE
    this.setState({ listClickChek: false })
    // 可從handleNowPageNumber去撈到動做
    console.log(+e.target.innerText)
    // 抓到目前點選button的頁碼轉為數字
    // 偵測目前總共資料筆數/10後變成每頁10比後去改變渲染資料左邊列表每次顯示比數
    // 再用handleNowPageNumber FUNCTION去撈到ForumPage偷渡回來的目前頁面數字最後可以帶入下方計算用

    // 抓到當下頁面就存進state給選擇一頁下一頁參照用
    this.setState({ currentPage: Number(e.target.innerText) })

    // 計算陣列複製起始索引用來接下slice
    // 陣列起始索引
    const pagesideListDataStart = Number(e.target.innerText - 1) * 10
    // 陣列結束索引
    const pagesideListDataEnd = pagesideListDataStart + 10
    // console.log(pagesideListDataStart)
    // 計算陣列結束索引用來接下slice

    // this.setState({

    const maxEndlength = this.state.listdata.length
    // 這邊不像didmount相同要reverse，因為頁碼產生的數值是從1開始
    // 對應到的10筆資料會是從前面開始，這樣render頁面資訊就會反過來變成最舊的擺最前面
    // 所以取消reverse讓他頁碼1對照的是最後10筆資料
    // console.log(maxEndlength)
    // 如果總比數的數量小於pagesideListDataEnd最後中的數字就會產生陣列撈到是空的，因此當最後一頁的時候是撈總資料的長度當最後斷點
    const listdatareverse = this.state.listdata.slice(
      pagesideListDataStart,
      maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
    )
    // console.log(listdatareverse)
    // console.log(listdatareverse[0].id)

    // 用來裝目前要顯示左側列表的資料
    await this.setState({
      listdataReverse: listdatareverse,
      nowIDdata: listdatareverse[0],
    })
    // console.log(this.state.listdataReverse)
    await this.setState({
      currentcommentApi: listdatareverse[0].forumCommentArea,
    })
  }

  // 使用參數用法都跟上面page主軸一樣
  handlePrevPage = async e => {
    // 在點了頁面列表後因為會變成TRUE，RENDER的STATE就改變了會造成在回來點PAGE會無法讓右邊頁面重新渲染
    // 所以要把列表點擊趕痕FALSE
    this.setState({ listClickChek: false })
    // 控制頁數小於1產生錯誤
    if (this.state.currentPage > 1) {
      const newCurrentPage = this.state.currentPage - 1
      console.log(newCurrentPage)

      // 因為資料室反握來到的所以第一筆資料應該是往回加，待確認邏輯
      // const newCurrentPageLastdataId = this.state.currentPage + 1

      // 點了上一頁馬上存入state
      await this.setState({
        // 如果頁面=0就顯示1
        currentPage: newCurrentPage,
      })
      // 這次已經有參照newCurrentPagr可以丟了
      const pagesideListDataStart = (newCurrentPage - 1) * 10
      const pagesideListDataEnd = pagesideListDataStart + 10

      const maxEndlength = this.state.listdata.length
      const listdatareverse = this.state.listdata.slice(
        pagesideListDataStart,
        maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
      )
      // console.log(listdatareverse)
      await this.setState({
        listdataReverse: listdatareverse,
        nowIDdata: listdatareverse[0],
        currentcommentApi: listdatareverse[0].forumCommentArea,
        // currentLastDataId: +listdatareverse[0].id,
      })
    }
    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動
    ScollLeft.scrollBy(-45, 0)
  }

  handleOnlyScrollLeftPage = e => {
    // 轉動按鈕欄可左右滑
    // 選到要捲動的區塊
    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動
    ScollLeft.scrollBy(-200, 0)
  }
  handleOnlyScrollLeftHover = e => {
    // 轉動按鈕欄可左右滑
    // 選到要捲動的區塊
    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動
    ScollLeft.scrollBy(-100, 0)
  }
  handleOnlyScrollRightHover = e => {
    // 轉動按鈕欄可左右滑
    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動

    ScollLeft.scrollBy(100, 0)
  }
  handleOnlyScrollRightPage = e => {
    // 轉動按鈕欄可左右滑
    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動
    ScollLeft.scrollBy(200, 0)
  }

  //下一頁 使用參數用法都跟上面page主軸一樣
  handleNextvPage = async e => {
    // 在點了頁面列表後因為會變成TRUE，RENDER的STATE就改變了會造成在回來點PAGE會無法讓右邊頁面重新渲染
    // 所以要把列表點擊趕痕FALSE
    this.setState({ listClickChek: false })

    const ScollLeft = document.querySelector('#forumListScollRightLeft')
    e.preventDefault()
    // 往下捲動
    ScollLeft.scrollBy(45, 0)
    // 點了下一頁馬上存入state

    // 計算總頁數
    const maxPages = Math.ceil(this.state.listdata.length / 10)
    // 總頁數有筆目前頁碼大才可執行
    if (this.state.currentPage < maxPages) {
      const newCurrentPage = this.state.currentPage + 1

      // 因為資料室反握來到的所以第一筆資料應該是往回加，待確認邏輯
      // const newCurrentPageLastdataId = this.state.currentPage - 1

      await this.setState({
        // 如果頁面=0就顯示1
        currentPage: newCurrentPage,
        // / 目前資料頁最後一筆ID拿來連接設定LINKID，待確認邏輯
        // currentLastDataId: newCurrentPageLastdataId,
      })
      // 這次已經有參照newCurrentPagr可以丟了
      const pagesideListDataStart = (newCurrentPage - 1) * 10
      const pagesideListDataEnd = pagesideListDataStart + 10

      const maxEndlength = this.state.listdata.length
      const listdatareverse = this.state.listdata.slice(
        pagesideListDataStart,
        maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
      )
      this.setState({
        listdataReverse: listdatareverse,
        nowIDdata: listdatareverse[0],
        currentcommentApi: listdatareverse[0].forumCommentArea,
      })

      // 待確認邏輯
      // this.setState({
      //   currentLastDataId: Number(this.state.listdataReverse[0].id),
      // })

      // console.log(Number(this.state.listdataReverse[0].id))
    }
  }
  // ----------------------------------pagination頁面套餐end-------------------------------
  //
  //
  //

  // 先撈到ID的資訊
  // --------------------------------列表點選控制state供後續渲染文章start-------------
  handleListHover = () => {
    console.log('1')
  }
  handleListUnHover = () => {
    console.log('2')
  }

  // 點列表顯示頁面功能
  // element:點擊到列表的對應物件，index當個文章的索引值
  handleClick = async (index, element) => {
    // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容ForumArticleContentRoy
    // console.log(element)
    const filterelement = this.state.listdata.filter(
      item => item.id === element.id
    )
    // console.log(filterelement[0])
    await this.setState({
      // nowIDdata: filterelement,
      currentdata: filterelement[0],
      // 將當下點到的物件中的forumCommentArea留言區陣列設回去STATE
      currentcommentdata: filterelement[0].forumCommentArea,
      // 點擊列表後將click轉為true後判斷內文顯示currentdata對應內容
      listClickChek: true,
      // 點擊列表後將click轉為true後判斷留言顯示currentcommentdata對應內容
      CommentClickChek: true,
      // 控制如果切換文章要讓爆雷顯示狀態回到預設
      articleShow: false,
    })

    this.setState({ nowParams: this.props.match.params })
    // console.log(this.state.nowParams)
  }

  // 滑鼠離開列表離開套餐/ */
  handleListMouseEnter = (index, element) => {
    const HoverControl = document.querySelector('#listHover' + element.id)
    // 模擬移上去自動觸發click事件這樣就不用手點就可以編滑邊切換params
    // console.log(HoverControl)
    HoverControl.setAttribute(
      'style',
      'border: none; background: #242B34; box-shadow: rgb(25, 28, 32) 0px 2px 8px; transition:  .3s ease-in-out; background:#343a40;transform: scale(1,1.1)'
    )
  }

  // 滑鼠離開列表離開套餐
  handleListMouseLeave = (index, element) => {
    const HoverControl = document.querySelector('#listHover' + element.id)
    HoverControl.setAttribute(
      'style',
      'border: none; background: #242B34; box-shadow: 0px 2px 6px #000000; transition:  .3s ease-in-out;'
    )
  }
  // --------------------------------列表點選控制state供後續渲染文章end-------------
  //
  //
  // --------------------------------爆雷顯示偵測功能start------------------------
  // 爆雷偵測套餐，兩個都要有引入才有效
  handleSpoilerChange = evt => {
    // this.setState({ forumSpoilers: evt.target.checked })
    //   console.log(this.state.forumSpoilers)
  }
  handleSpoilerToggle = async () => {
    await this.setState({ forumSpoilers: !this.state.forumSpoilers })
    // console.log(this.state.forumSpoilers)
  }

  // 控制爆雷頁面是否顯示
  handleSpoilerShow = async e => {
    await this.setState({ articleShow: true })
    // 記得在hadleclick控制列表文章切換那加上state設回false則切換文章後就全部維持TRUE了
    // await this.setState({ spoilerClickCheck: true })
    // console.log(this.state.articleShow)

    // 設定一個coockie function來使用
    function setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + exdays * 2000)
      var expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    }

    // 用來將coockie的值轉化為只有value否則原來getCOOCKI會回傳name=.....
    function getCookie(cname) {
      var name = cname + '='
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
    // 是否有點開閱讀，是一個陣列用來裝等等被點到文章的ID
    const spoilerClick = this.state.spoilerClickCheck
    // 目前文章ID
    const nowSpoilerId = this.props.match.params.id

    // console.log(spoilerClick)
    // console.log(a.indexOf(''))
    if (spoilerClick.indexOf(nowSpoilerId) === -1) {
      // 如果找不到這篇文章閱讀紀錄就推進陣列，用來塞進COOCKIE後續判斷
      spoilerClick.push(nowSpoilerId)
      console.log(spoilerClick)
    }

    // user = prompt('Please enter your name:', '')
    setCookie('username', spoilerClick.toString(), 10)
    // var user = getCookie('username').split('')

    // 抓到目前丟進去StateID的索引值用來刪除
    const newCookie = spoilerClick.indexOf(nowSpoilerId)
    // 因為每次塞進去陣列的ID會來越多，所以必須在每次處發效果後刪除原本的ID
    // 這樣下次再點button才不會因為陣列裡的原本的state都沒有消除，一次觸發所有之前塞進去的ID
    // 或是另一種方法換頁重新導向清除state才可還原
    this.setState({
      // 刪除原本丟進去的ID，在不跳頁下讓state可以重複利用
      spoilerClickCheck: this.state.spoilerClickCheck.slice(newCookie, 1),
    })
    // console.log(this.state.spoilerClickCheck)
    // console.log(document.cookie)
  }

  // --------------------------------列表爆雷顯示偵測功能end--------------------------
  //
  //
  // --------------------------------捲動套餐Start--------------------------
  // 下以下STYLE
  // overflow: 'scroll',
  // overflowX: 'hidden',
  // scrollBehavior: 'smooth',
  // 在區塊上CSS如下可以把滾動卷軸隱藏
  // #forumListScollTop::-webkit-scrollbar {
  //   width: 0 !important;
  // }
  handleScrollTop = e => {
    // 選到要捲動的區塊
    const ScollTop = document.querySelector('#forumListScollTop')
    e.preventDefault()
    // 往上捲動
    ScollTop.scrollBy(0, -300)
  }
  handleScrollBottom = e => {
    // 選到要捲動的區塊
    const ScollTop = document.querySelector('#forumListScollTop')
    e.preventDefault()
    // 往下捲動
    ScollTop.scrollBy(0, 300)
  }

  // handleScrollRight = e => {
  //   // 選到要捲動的區塊
  //   const ScollTop = document.querySelector('#forumListScollRightLeft')
  //   e.preventDefault()
  //   // 往下捲動
  //   ScollTop.scrollBy(300, 0)
  // }
  // handleScrollLeft = e => {
  //   // 選到要捲動的區塊
  //   const ScollTop = document.querySelector('#forumListScollRightLeft')
  //   e.preventDefault()
  //   // 往下捲動
  //   ScollTop.scrollBy(-300, 0)
  // }
  // --------------------------------捲動套餐End--------------------------
  //
  //
  //
  //
  // --------------------------------留言功能start-----------------------------------

  //確認發文後沒重新導向頁面馬上按留言會有問題
  // 留言區塊onchange撈值回傳到state後再提供給handleCommentInput要送出的參數
  handleCommentInputArea = e => {
    console.log(e.target.value)
    this.setState({
      // 將textarea輸入的\n轉化成<br>，再到ForumArticleCommentRoy用dangerouslySetInnerHTML轉化tag
      commentTempStorage: e.target.value.replace(/\r\n|\r|\n/g, '<br />'),
      // 若無內容設狀態提供留言按鈕判斷
      CommentInputStatus: e.target.value === '' ? false : true,
    })
    // console.log(this.state.CommentInputStatus)
  }
  // 留言清除功能
  handleCommentInputCancel = () => {
    document.querySelector('#CommentArea').value = ''
  }
  // 留言空白警告
  handleCommentInputAreaCheck = () => {
    // alert('請輸入內容')

    Swal.fire({
      // position: 'top-end',
      title: '<span style="color:#d4d1cc">請輸入內容</span>',
      type: 'error',
      showCancelButton: false,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      // cancelButtonColor: ' #d33',
      confirmButtonClass: ' btn-warning',
      confirmButtonColor: '#ffa510',
      background: '#242b34',
    })

    return
  }
  // 留言功能，由上方控制是否啟動
  handleCommentInput = async () => {
    // 測試如果沒sessioN給一個暫時的話會跟後面抓sesion iD實衝突
    // if (!sessionStorage.getItem('memberId')) {
    //   sessionStorage.setItem('memberId', +new Data())
    // }

    // TODO:確認登入導向頁面
    // if (!sessionStorage.getItem('memberId')) {
    //   // alert('回到登入頁')
    //   window.location.href = '/LoginSign'
    // }

    // 搜尋到所點擊的文章回傳的內容物件倒入onClickArticle
    const onClickArticle = this.state.listdata.find(
      item => item.id === +this.props.match.params.id
    )

    // 選取該筆文章裡面的留言區塊陣列forumCommentArea
    const onClickArticleComment = onClickArticle.forumCommentArea
    // console.log(onClickArticle)

    // 將要留言的內容倒入newComment
    // 判斷目前陣列最後一筆所帶的id是多少然後+1賦予，用index容易缺中間某筆資料造成抓做資料
    // 先用三元運算判斷是否初始留言數是否為0來排除索引值為-1的狀況
    // 如果初始無留言直接賦予forumCommentId為0+1
    const newComment = {
      forumCommentId:
        (onClickArticle.forumCommentArea.length > 0
          ? onClickArticleComment[onClickArticle.forumCommentArea.length - 1]
              .forumCommentId
          : 0) + 1,
      forumComment: this.state.commentTempStorage,
      forumCommentLike: 0,
      forumCommentDislike: 0,
      // 判斷是否有session帶入不同值
      forumCommentName: sessionStorage.getItem('memberId')
        ? this.state.noLoginInfo.nickname
        : '藏鏡人',
      // TODO:有資料可以撈時要改回
      forumCommentAvatar: sessionStorage.getItem('memberId')
        ? this.state.noLoginInfo.avatar
        : 'ca11cf8a-7724-4b33-8e93-6e6635eff034.jpg',
      // forumCommentAvatar: '9743_2.jpg',
      forumCommentUserId: sessionStorage.getItem('memberId')
        ? sessionStorage.getItem('memberId')
        : 'defaultForumCommentID',
      // 發留言時間
      forumCommentCreateTime: +new Date(),
      // 另存留言格式
      forumCommentCreateTimeDate: new Date().toLocaleString('chinese', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    // 將整包要更新的內容重新打包，不能漏掉任何屬性即使沒變
    const UpdateArticle = {
      id: onClickArticle.id,
      headline: onClickArticle.headline,
      forumSpoilers: onClickArticle.forumSpoilers,
      forumCollectMember: onClickArticle.forumCollectMember,
      forumViews: onClickArticle.forumViews,
      forumCreateDate: onClickArticle.forumCreateDate,
      forumCreateDateInSecond: onClickArticle.forumCreateDateInSecond,
      forumName: onClickArticle.forumName,
      forumNameId: onClickArticle.forumNameId,
      forumAvatar: onClickArticle.forumAvatar,
      forumArticlePic: onClickArticle.forumArticlePic,
      forumReview: onClickArticle.forumReview,
      forumReviewLike: onClickArticle.forumReviewLike,
      // 因為留言還沒新增所以要在length+1送進資料庫
      forumCommentCount: onClickArticle.forumCommentArea.length + 1,
      // 將原本的留言陣列onClickArticleComment內容展開後再把新的留言newComment加入
      forumCommentArea: [...onClickArticleComment, newComment],
    }
    console.log(UpdateArticle.forumCommentArea)
    // console.log(this.state.listdata)

    Swal.fire({
      title: '<span style="color:#d4d1cc">是否確認留言?</span>',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      // cancelButtonColor: ' #d33',
      confirmButtonClass: ' btn-warning',
      confirmButtonColor: '#ffa510',
      background: '#242b34',
      html:
        sessionStorage.getItem('memberId') === null
          ? '<span style="color:#d4d1cc">未登入會員會以匿名方式留言</span><br /><span style="color:#d4d1cc">請點選確認繼續或取消離開</span>'
          : '',
    }).then(result => {
      // 確認有按下上傳確認鍵後開始FETCH
      if (result.value) {
        // 文字編輯器要放在NEWFORMDATA前面，要先用下方方式抓取送出的文章內容，才不會要送兩次
        // const edt = document.querySelector('#review')
        // console.log(edt);
        // edt.innerHTML += tinyMCE.activeEditor.getContent();

        // 跳出結果確認視窗,並倒數

        try {
          // const data = newData
          // 將更新後的文章內容包進data最後用PUT方式丟回SERVER
          const data = UpdateArticle
          // console.log(data)
          fetch('http://localhost:5555/forum/' + this.props.match.params.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
            .then(response => response.json())
            // console.log(jsonObject)
            //TODO:檢查留言功能
            // 在State中設定特定陣列中的物件，這邊一邊設定回原始listdata中比對到的forumCommentArea陣列
            .then(
              this.setState(prevState => ({
                listdata: prevState.listdata.map(obj =>
                  // 比對當下指定到的文章
                  obj.id === +this.props.match.params.id
                    ? Object.assign(obj, {
                        forumCommentArea: UpdateArticle.forumCommentArea,
                      })
                    : obj
                ),
              }))
            )
            // 同時設定新留言到用來渲染留言的currentcommentdata state
            .then(
              this.setState(
                {
                  currentcommentdata: UpdateArticle.forumCommentArea,
                  CommentClickChek: true,
                },
                () => {
                  // 發文後後把留言內容清掉

                  document.querySelector('#CommentArea').value = ''
                  // alert('留言成功!')
                  // this.handleClose()
                  // window.location.href = '/forum/'
                }
              )
            )
          console.log(this.state.CommentClickChek)
        } catch (e) {
          console.log(e)
        }

        Swal.fire({
          // 大括號設定內容
          type: 'success',
          confirmButtonText: '確認',
          title: '<span style="color:#d4d1cc">成功</span>',
          html:
            '<span style="color:#d4d1cc">留言成功</span><br /><span style="color:#d4d1cc">請確認離開</span>',
          // 顯示圖片類型
          // type: 'success',
          // 倒數計時
          // cancelButtonColor: ' #d33',
          confirmButtonClass: ' btn-warning',
          confirmButtonColor: '#ffa510',
          background: '#242b34',
        })
      }
    })
  }
  // --------------------------------留言功能end-----------------------------------
  //
  //
  // --------------------------------刪除留言功能Start-----------------------------------
  handleCommentDelete = async e => {
    // 搜尋到所點擊的文章回傳的內容物件倒入onClickArticle
    const onClickArticle = this.state.listdata.find(
      item => item.id === +this.props.match.params.id
    )

    // 選取該筆文章裡面的留言區塊陣列forumCommentArea
    const onClickArticleComment = onClickArticle.forumCommentArea

    // console.log(onClickArticle)
    // 抓到點選的當個留言的ID，這裡要把ID命名為數字起頭這樣就可以篩成純數字ID
    const nowCommentId = parseInt(
      e.target.parentNode.parentNode.parentNode.parentNode.id
    )

    // console.log(nowCommentId)
    // console.log(onClickArticleComment)
    // 濾掉想要刪掉的留言，回傳的陣列拿回去PUT取代
    const ondeleteComment = onClickArticleComment.filter(
      item => item.forumCommentId !== +nowCommentId
    )
    // console.log(ondeleteComment)
    // console.log(onClickArticleComment)

    // 將整包要更新的內容重新打包，不能漏掉任何屬性即使沒變
    const UpdateComment = {
      id: onClickArticle.id,
      headline: onClickArticle.headline,
      forumSpoilers: onClickArticle.forumSpoilers,
      forumCollectMember: onClickArticle.forumCollectMember,
      forumViews: onClickArticle.forumViews,
      forumCreateDate: onClickArticle.forumCreateDate,
      forumCreateDateInSecond: onClickArticle.forumCreateDateInSecond,
      forumName: onClickArticle.forumName,
      forumNameId: onClickArticle.forumNameId,
      forumAvatar: onClickArticle.forumAvatar,
      forumArticlePic: onClickArticle.forumArticlePic,
      forumReview: onClickArticle.forumReview,
      forumReviewLike: onClickArticle.forumReviewLike,
      // 因為留言還沒新增所以要在length+1送進資料庫
      forumCommentCount: onClickArticle.forumCommentArea.length + 1,
      //  將過濾過剩下的留言用三個點拆開成物件放回陣列
      forumCommentArea: [...ondeleteComment],
    }
    // console.log(UpdateComment)
    // console.log(this.state.listdata)

    Swal.fire({
      title: '<span style="color:#d4d1cc">確認是否刪除?</span>',
      html: '<span style="color:#d4d1cc">請點選確認繼續或取消離開</span>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      cancelButtonClass: ' btn-warning',
      confirmButtonClass: ' #d33',
      confirmButtonColor: '#d33',
      background: '#242b34',
    }).then(result => {
      // 確認有按下上傳確認鍵後開始FETCH
      if (result.value) {
        // 文字編輯器要放在NEWFORMDATA前面，要先用下方方式抓取送出的文章內容，才不會要送兩次
        // const edt = document.querySelector('#review')
        // console.log(edt);
        // edt.innerHTML += tinyMCE.activeEditor.getContent();

        // 跳出結果確認視窗,並倒數

        try {
          // 將更新後的文章內容包進data最後用PUT方式丟回SERVER
          const data = UpdateComment
          // console.log(data)

          fetch('http://localhost:5555/forum/' + this.props.match.params.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
            .then(response => response.json())
            // console.log(jsonObject)
            //TODO:檢查留言功能
            // 在State中設定特定陣列中的物件，這邊一邊設定回原始listdata中比對到的forumCommentArea陣列
            .then(
              this.setState(prevState => ({
                listdata: prevState.listdata.map(obj =>
                  // 比對當下指定到的文章
                  obj.id === +this.props.match.params.id
                    ? Object.assign(obj, {
                        forumCommentArea: UpdateComment.forumCommentArea,
                      })
                    : obj
                ),
              }))
            )
            // 同時設定新留言到用來渲染留言的currentcommentdata state
            .then(
              this.setState(
                {
                  currentcommentdata: UpdateComment.forumCommentArea,
                  // 判斷渲染方式用，參考綁定props
                  CommentClickChek: true,
                },
                () => {
                  // 發文後後把留言內容清掉
                  // alert('刪除留言成功!')
                  // this.handleClose()
                  // window.location.href = '/forum/'
                }
              )
            )
          console.log(this.state.currentcommentdata)
        } catch (e) {
          console.log(e)
        }

        Swal.fire({
          // 大括號設定內容
          type: 'success',
          confirmButtonText: '確認',
          title: '<span style="color:#d4d1cc">成功</span>',
          // 顯示圖片類型
          // type: 'success',
          // 倒數計時
          html:
            '<span style="color:#d4d1cc">刪除成功</span><br /><span style="color:#d4d1cc">請確認離開</span>',
          // cancelButtonColor: ' #d33',
          confirmButtonClass: ' btn-warning',
          confirmButtonColor: '#ffa510',
          background: '#242b34',
        })
      }
    })
  }
  // --------------------------------刪除留言功能End-----------------------------------

  // -----------------------------留言讚噓套餐Start---------------------------------------------
  handleCommentLike = () => {
    this.setState({ commentlikeStatus: !this.state.commentlikeStatus })
    console.log(this.state.commentlikeStatus)
  }
  handleCommentDislike = () => {
    this.setState({ commentDislikeStatus: !this.state.commentDislikeStatus })
    console.log(this.state.commentlikeStatus)
  }
  // -----------------------------留言讚噓套餐End---------------------------------------------

  //
  //
  //TODO:檢查初次導向頁面發文後留言問題
  // --------------------------------發文功能start-----------------------------------

  // 對應跳出視窗的表單的欄位變動，這是一種常見的使用方式
  // ，讓下層元件保持為函式型元件，仍然是有表單可控元件
  // 不過onChange與state會寫在上層元件中
  handleModalFormInputChange = event => {
    let value = event.target.value
    const name = event.target.name

    // 創造ID
    // 注意：id(學號)與生日，需先轉為數字類型再進入state中
    if (name === 'id' || name === 'birth') value = +value

    this.setState({ [name]: value })
  }

  // 新增文章modal  toggle用
  handleClose = () => {
    this.setState({ show: false })
  }
  // 新增文章modal  toggle用
  handleShow = () => {
    if (!sessionStorage.getItem('memberId')) {
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請先登入會員</span>',
        html: '<span style="color:#d4d1cc">請點選確認繼續或取消離開</span>',
        textColor: 'blue',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      }).then(result => {
        // 確認有按下上傳確認鍵後開始FETCH
        if (result.value) {
          window.location.href = '/LoginSign'
        }
      })

      // alert('請登入發文')
    } else {
      this.setState({ show: true })
    }
  }

  // 發送文章
  handleModalFormInputSave = async () => {
    // 簡單的檢查部份

    if (this.state.headline.trim() === '') {
      // alert('請輸入標題!')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請輸入標題</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      return
    }
    if (this.state.headline.trim().length > 30) {
      // alert('標題請勿超過30字!')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">標題請勿超過30字!</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      return
    }

    if (this.state.forumReview.trim() === '') {
      // alert('請輸入評論!')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請輸入評論!</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      return
    }
    if (this.state.forumReview.trim().length > 30000) {
      // alert('內文請勿超過30000字!')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">內文請勿超過30000字!</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      return
    }

    // console.log('123')

    // 處理新增資料的儲存
    // 先檢查學號是否重覆
    // const index = this.state.listdata.findIndex(
    //   item => item.id === this.state.id
    // )

    // if (index > -1) {
    //   alert('學號已存在!')
    //   return
    // }

    // 處理新增的儲存
    const item = {
      id: this.state.listdata[0].id + 1,
      headline: this.state.headline
        .replace(/<script\b[^>]*>/gm, '<script>')
        // 後TAG
        .replace(/<\/script>/gm, '</script>')
        // TAG包內容
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '<script></script>'),
      forumSpoilers: this.state.forumSpoilers,
      forumCollectMember: this.state.forumCollectMember,
      forumViews: this.state.forumViews,
      // 發文當下時間2019/5/20 23:59:40 先設時區格式chinese，再給第二參數設定24時制
      // 不要用formSubmit自動抓時間，送出會為空值，在這裡直接給值
      forumCreateDate: new Date().toLocaleString('chinese', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      // 發文當下距離1970總秒數，用一元正字或可用new Date().getTime()
      forumCreateDateInSecond: +new Date(),
      forumName: this.state.noLoginInfo.nickname,
      //  發文時存入session ID
      forumNameId: sessionStorage.getItem('memberId'),
      // TODO:有圖片後要改成帶入撈到的圖片
      forumAvatar: this.state.noLoginInfo.avatar,
      // forumAvatar: this.state.forumAvatar,
      // TODO://要改成實際樣子
      forumArticlePic: this.state.forumArticlePic,
      // 將textarea輸入的\n轉化成<br>，再到ForumArticleContentRoy用dangerouslySetInnerHTML轉化tag
      forumReview: this.state.forumReview
        .replace(/\r\n|\r|\n/g, '<br />')
        // 將意圖輸入SCRIPT TAG轉成NOPE
        // 前TAG
        .replace(/<script\b[^>]*>/gm, '&lt;script&gt;')
        // 後TAG
        .replace(/<\/script>/gm, '&lt;/script&gt;')
        // TAG包內容
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '<script></script>'),
      forumReviewLike: this.state.forumReviewLike,
      forumCommentCount: this.state.forumCommentCount,
      forumCommentArea: this.state.forumCommentArea,
    }
    // console.log(this.state.listdata[0].id)
    const newData = [...this.state.listdata, item]
    console.log(this.state.forumCommentArea.length)

    Swal.fire({
      title: '<span style="color:#d4d1cc">請確認是否送出?</span>',
      html: '<span style="color:#d4d1cc">請點選確認繼續或取消離開</span>',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      // cancelButtonColor: ' #d33',
      confirmButtonClass: ' btn-warning',
      confirmButtonColor: '#ffa510',
      background: '#242b34',
    }).then(result => {
      // 確認有按下上傳確認鍵後開始FETCH
      if (result.value) {
        // 文字編輯器要放在NEWFORMDATA前面，要先用下方方式抓取送出的文章內容，才不會要送兩次
        // const edt = document.querySelector('#review')
        // console.log(edt);
        // edt.innerHTML += tinyMCE.activeEditor.getContent();

        // 跳出結果確認視窗,並倒數
        try {
          const data = item

          fetch('http://localhost:5555/forum', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
            .then(response => response.json())

            // console.log(jsonObject)

            // 確認資料有進資料庫後再setState
            .then(
              this.setState({ listdata: newData }, () => {
                // alert('資料已成功新增!')
                this.handleClose()
                // console.log(this.state.listdata)
                // 送出表單後重新導向最新一筆頁面
                window.location.href = '/forum/' + this.state.listdata[0].id + 1
              })
            )
        } catch (e) {
          console.log(e)
        }

        Swal.fire({
          // 大括號設定內容
          type: 'success',
          confirmButtonText: '確認',
          title: '<span style="color:#d4d1cc">成功</span>',
          html: '<span style="color:#d4d1cc">發文成功</span>',
          // 顯示圖片類型
          // type: 'success',
          // 倒數計時
          // cancelButtonColor: ' #d33',
          confirmButtonClass: ' btn-warning',
          confirmButtonColor: '#ffa510',
          background: '#242b34',
        })
      }
    })
  }
  // --------------------------------發文功能end-----------------------------------

  // --------------------------------刪文功能Start-----------------------------------
  handleArticleDelete = async () => {
    // 將點擊的文章filter掉後的剩下的陣列倒回
    const filteredRestArticle = this.state.listdata.filter(
      item => item.id !== +this.props.match.params.id
    )
    // const data = onClickArticle.reverse()
    // console.log(data)

    Swal.fire({
      title: '<span style="color:#d4d1cc">請確認是否刪除?</span>',
      html: '<span style="color:#d4d1cc">請點選確認繼續或取消離開</span>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      cancelButtonClass: ' btn-warning',
      confirmButtonClass: ' #d33',
      confirmButtonColor: '#d33',
      background: '#242b34',
    }).then(result => {
      // 確認有按下上傳確認鍵後開始FETCH
      if (result.value) {
        // 文字編輯器要放在NEWFORMDATA前面，要先用下方方式抓取送出的文章內容，才不會要送兩次
        // const edt = document.querySelector('#review')
        // console.log(edt);
        // edt.innerHTML += tinyMCE.activeEditor.getContent();
        try {
          // 用DELETE去刪除特定ID的文章
          // console.log(data)
          fetch('http://localhost:5555/forum/' + this.props.match.params.id, {
            method: 'DELETE',
            // DELETE不用給BODY
            // body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
            // 摻刪出來接出來的是空的
            .then(response => response.json())

            // 將filter後的剩下的陣列倒回listdata後重新導向最新一筆頁面
            .then(
              this.setState({ listdata: filteredRestArticle }, () => {
                // alert('刪除成功!')
                window.location.href =
                  '/forum/' + this.state.listdataReverse[0].id
              })
            )
        } catch (e) {
          console.log(e)
        }
        // 跳出結果確認視窗,並倒數

        Swal.fire({
          // 大括號設定內容
          type: 'success',
          confirmButtonText: '確認',
          title: '<span style="color:#d4d1cc">成功</span>',
          html: '<span style="color:#d4d1cc">刪除成功</span>',
          // cancelButtonColor: ' #d33',
          confirmButtonClass: ' btn-warning',
          confirmButtonColor: '#ffa510',
          background: '#242b34',
          // 顯示圖片類型
          // type: 'success',
          // 倒數計時
        })
      }
    })
  }
  // --------------------------------刪文功能End-----------------------------------

  // -----------------------編輯文章標題功能Start-----------------------------------
  // 編輯標題因為轉出都會是純文字，所以撈值用innerText就好
  // 必須先在要改變的標題元件中加入 contenteditable="true"使之可變更
  // 要先在開始傳id下去用來getlement用
  // TODO:典編輯背景的BORDER SHADOW會消失
  handleHeadlineEditTrigger = e => {
    // 一定要把true false設為字串傳，contenteditable如果只給boolean不會顯示
    // 在按SAVE時再把他涉回FALSE
    this.setState({ handleHeadlineEditStatus: 'true' })
    // 將編輯BTN DISPLAY取消 取消SA按鈕顯示
    this.setState({ HeadlineEditBtnStatus: 'd-none' })
    this.setState({ HeadlineSaveBtnStatus: '' })
    this.setState({ HeadlineCancelBtnStatus: '' })
    console.log(this.state.handleHeadlineEditStatus)
    // 比對抓到點擊到的標題物件
    const onEditHeadline = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    // 控制按下編輯後介面變更
    const currentNodeSelect = document.querySelector(
      '#contentheadlineId' + onEditHeadline.id
    )
    // 編輯啟動時先將內文砍掉
    // currentNodeSelect.innerHTML = ''
    currentNodeSelect.setAttribute(
      'class',
      ' bg-dark border border-warning rounded '
    )
    currentNodeSelect.setAttribute('style', 'height:35px ')
    currentNodeSelect.parentNode.setAttribute(
      'style',
      'width:75% ; transition:0.5s ease-in-out'
    )
    // 抓到上兩層元素
    currentNodeSelect.parentNode.parentNode.setAttribute('style', 'width:100% ')
    // console.log(
    //   document.querySelector('#contentheadlineId' + onEditHeadline.id)
    //     .parentNode.parentNode
    // )
  }

  // 按下取消BTN回復原狀
  handleHeadlineEditCancel = () => {
    // 將按鈕顯示狀態歸位
    this.setState({ HeadlineEditBtnStatus: '' })
    this.setState({ HeadlineSaveBtnStatus: 'd-none' })
    this.setState({ HeadlineCancelBtnStatus: 'd-none' })

    this.setState({ handleHeadlineEditStatus: 'false' })
    const onEditHeadline = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    const currentNodeSelect = document.querySelector(
      '#contentheadlineId' + onEditHeadline.id
    )
    // 點擊後將CLASS改變
    currentNodeSelect.removeAttribute(
      'class',
      'bg-dark border border-warning rounded'
    )
    currentNodeSelect.removeAttribute('style', 'height:35px ')
    currentNodeSelect.parentNode.removeAttribute('style', 'width:75%')
    // 抓到上兩層元素
    currentNodeSelect.parentNode.parentNode.removeAttribute(
      'style',
      'width:100% '
    )
    console.log(onEditHeadline.headline)
    // 取消不做變更因此將原來的值倒回text顯示
    // 因為這裡只會顯示TEXT所以不能用HinnerTML
    currentNodeSelect.innerText = onEditHeadline.headline
  }

  // TODO:沒有儲存變更後切換文章
  handleHeadlineEditSave = async e => {
    // 比對抓到點擊到的標題物件
    const onEditHeadline = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    // 比對抓到點擊到的標題物件的索引值
    const onEditHeadlineIndex = this.state.listdata.findIndex(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )

    // 抓ID值傳下去設定在各文張物件中
    // contentheadlineId已經在元件中建立等待接值
    // 這邊藥用innerText否則在後續在撈值會轉成HTML轉換字符造成抓長度時過長
    const getThisIdInnerText = document.querySelector(
      '#contentheadlineId' + onEditHeadline.id
    ).innerText

    // 控制按下儲存後介面還原
    const currentNodeSelect = document.querySelector(
      '#contentheadlineId' + onEditHeadline.id
    )
    // console.log(getThisIdInnerText.length)

    if (getThisIdInnerText.length === 0) {
      // alert('請輸入內容')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請輸入內容</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
    } else if (getThisIdInnerText.length > 30) {
      // console.log(getThisIdInnerText.length)
      // alert('請勿超過30字')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請勿超過30字</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
    } else {
      // 儲存後先將狀態關閉成不能編輯
      this.setState({ handleHeadlineEditStatus: 'false' })

      // 將編輯BTN DISPLAY取消 取消SA按鈕顯示
      this.setState({ HeadlineEditBtnStatus: '' })
      this.setState({ HeadlineSaveBtnStatus: 'd-none' })
      this.setState({ HeadlineCancelBtnStatus: 'd-none' })

      // 點擊後將CLASS改變
      currentNodeSelect.removeAttribute(
        'class',
        'bg-dark border border-warning rounded'
      )
      currentNodeSelect.removeAttribute('style', 'height:35px ')
      currentNodeSelect.parentNode.removeAttribute('style', 'width:75%')
      // 抓到上兩層元素
      currentNodeSelect.parentNode.parentNode.removeAttribute(
        'style',
        'width:100% '
      )
      // 將目前要取代的文章物件先裝到一個容器，記得把headline取代換掉成目前取值的內容
      // 其他內容保持不變
      const UpdateHeadline = {
        id: onEditHeadline.id,
        // 將目前INNERText字樣替換回去headline state，會根據目前控制標題輸入內容變動
        headline: getThisIdInnerText
          .replace(/<script\b[^>]*>/gm, '<script>')
          // 後TAG
          .replace(/<\/script>/gm, '</script>')
          // TAG包內容
          .replace(
            /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
            '<script></script>'
          ),
        forumSpoilers: onEditHeadline.forumSpoilers,
        forumCollectMember: onEditHeadline.forumCollectMember,
        forumViews: onEditHeadline.forumViews,
        forumCreateDate: onEditHeadline.forumCreateDate,
        forumCreateDateInSecond: onEditHeadline.forumCreateDateInSecond,
        forumName: onEditHeadline.forumName,
        forumNameId: onEditHeadline.forumNameId,
        forumAvatar: onEditHeadline.forumAvatar,
        forumArticlePic: onEditHeadline.forumArticlePic,
        forumReview: onEditHeadline.forumReview,
        forumReviewLike: onEditHeadline.forumReviewLike,
        forumCommentCount: onEditHeadline.forumCommentArea.length,
        // 將原本的留言陣列onClickArticleComment內容展開後再把新的留言newComment加入
        forumCommentArea: onEditHeadline.forumCommentArea,
      }

      console.log(getThisIdInnerText)
      const data = UpdateHeadline
      // console.log(data)
      // 將資料寫進資料庫
      const response = await fetch(
        'http://localhost:5555/forum/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const jsonObject = await response.json()

      // 將原始listdata從先前偵測到點擊到文章的索引值帶入後選擇刪除量為1，最後帶入要取代的文章物件
      await this.state.listdata.splice(onEditHeadlineIndex, 1, UpdateHeadline)
      // console.log(jsonObject)
      // console.log(UpdateHeadline)
      // // console.log(updateHeadlineReturn)
      // console.log(this.state.listdata)
      // console.log(this.state.listdataReverse)
      // 因為splice後只會回傳被刪除的東西所以不能用updateHeadline倒回listdata
      // splice作用後會暫時將this.state.listdata轉變成新的陣列，再倒回去listdataReverse用來渲染左側列表的
      await this.setState({ listdataReverse: this.state.listdata })
      // console.log('123')
      // 如果不setState也可以作用，只是要先切換文章再點回來
    }
  }

  // 輸入文字過程中只控制不可按ENTER，因為按ENTER會自動產生一個DIV換行
  handleHeadlineEditKeyboardControl = e => {
    // console.log(e.key)
    // return e.which != 13
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    // var keycode = e.charCode || e.keyCode
    // if (keycode === 13) {
    //   //Enter key's keycode
    //   return false
    // }
  }
  // -----------------------編輯文章標題功能End-----------------------------------
  //
  //
  //
  // -----------------------編輯內文功能Start-----------------------------------
  // 內文因為要轉HTML格式所以要用INNERHTML

  // 必須先在要改變的標題元件中加入 contenteditable="true"使之可變更
  // 要先在開始傳id下去用來getlement用
  handleArticleEditTrigger = e => {
    // 一定要把true false設為字串傳，contenteditable如果只給boolean不會顯示
    // 在按SAVE時再把他涉回FALSE
    this.setState({ handleArticleEditStatus: 'true' })
    // 將編輯BTN DISPLAY取消 取消SA按鈕顯示
    this.setState({ ArticleEditBtnStatus: 'd-none' })
    this.setState({ ArticleSaveBtnStatus: '' })
    this.setState({ ArticleCancelBtnStatus: '' })
    console.log(this.state.handleArticleEditStatus)
    // 比對抓到點擊到的標題物件
    const onEditArticle = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    // 控制按下編輯後介面變更
    const currentNodeSelect = document.querySelector(
      '#contentArticleId' + onEditArticle.id
    )
    currentNodeSelect.setAttribute(
      'class',
      ' bg-dark border border-warning rounded p-3'
    )
    currentNodeSelect.setAttribute('style', ' ')
    currentNodeSelect.parentNode.setAttribute('style', 'width:75% ')
    // 抓到上兩層元素
    currentNodeSelect.parentNode.parentNode.setAttribute('style', 'width:100% ')
    // console.log(
    //   document.querySelector('#contentArticleId' + onEditArticle.id)
    //     .parentNode.parentNode
    // )
  }

  // 按下取消BTN回復原狀
  handleArticleEditCancel = () => {
    // 將按鈕顯示狀態歸位
    this.setState({ ArticleEditBtnStatus: '' })
    this.setState({ ArticleSaveBtnStatus: 'd-none' })
    this.setState({ ArticleCancelBtnStatus: 'd-none' })

    this.setState({ handleArticleEditStatus: 'false' })
    const onEditArticle = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    const currentNodeSelect = document.querySelector(
      '#contentArticleId' + onEditArticle.id
    )
    // 點擊後將CLASS改變
    currentNodeSelect.removeAttribute(
      'class',
      'bg-dark border border-warning rounded p-3'
    )
    currentNodeSelect.removeAttribute('style', ' ')
    currentNodeSelect.parentNode.removeAttribute('style', 'width:75%')
    // 抓到上兩層元素
    currentNodeSelect.parentNode.parentNode.removeAttribute(
      'style',
      'width:100% '
    )
    // console.log(onEditArticle.forumReview)
    // 取消不做變更因此將原來的值倒回html裡顯示
    currentNodeSelect.innerHTML = onEditArticle.forumReview
  }

  // TODO:沒有儲存變更後切換文章
  handleArticleEditSave = async e => {
    // 比對抓到點擊到的標題物件
    const onEditArticle = this.state.listdata.find(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )
    // 比對抓到點擊到的標題物件的索引值
    const onEditArticleIndex = this.state.listdata.findIndex(
      item =>
        item.id ===
        (this.props.match.params.id
          ? +this.props.match.params.id
          : +this.state.listdataReverse[0].id)
    )

    // 抓ID值傳下去設定在各文張物件中
    // contentArticleId已經在元件中建立等待接值
    // 這邊藥用INNERHTML因為內文會有換行
    const getThisIdInnerHTML = document.querySelector(
      '#contentArticleId' + onEditArticle.id
    ).innerHTML

    // 控制按下儲存後介面還原
    const currentNodeSelect = document.querySelector(
      '#contentArticleId' + onEditArticle.id
    )
    // console.log(getThisIdInnerHTML.length)

    if (getThisIdInnerHTML.length === 0) {
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請輸入內容</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      // alert('請輸入內容')
    } else if (getThisIdInnerHTML.length > 30000) {
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請勿超過30000字</span>',
        type: 'error',
        showCancelButton: false,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      })
      // alert('請勿超過30000字')
    } else {
      // 儲存後先將狀態關閉成不能編輯
      this.setState({ handleArticleEditStatus: 'false' })

      // 將編輯BTN DISPLAY取消 取消SA按鈕顯示
      this.setState({ ArticleEditBtnStatus: '' })
      this.setState({ ArticleSaveBtnStatus: 'd-none' })
      this.setState({ ArticleCancelBtnStatus: 'd-none' })

      // 點擊後將CLASS改變
      currentNodeSelect.setAttribute('class', ' bg-dark')
      currentNodeSelect.removeAttribute(
        'class',
        ' border border-warning rounded p-3'
      )
      currentNodeSelect.removeAttribute('style', ' ')
      currentNodeSelect.parentNode.removeAttribute('style', 'width:75%')
      // 抓到上兩層元素
      currentNodeSelect.parentNode.parentNode.removeAttribute(
        'style',
        'width:100% '
      )
      // 將目前要取代的文章物件先裝到一個容器，記得把headline取代換掉成目前取值的內容
      // 其他內容保持不變
      const UpdateArticle = {
        id: onEditArticle.id,
        // 將目前INNERText字樣替換回去headline state，會根據目前控制標題輸入內容變動
        headline: onEditArticle.headline,
        forumSpoilers: onEditArticle.forumSpoilers,
        forumCollectMember: onEditArticle.forumCollectMember,
        forumViews: onEditArticle.forumViews,
        forumCreateDate: onEditArticle.forumCreateDate,
        forumCreateDateInSecond: onEditArticle.forumCreateDateInSecond,
        forumName: onEditArticle.forumName,
        forumNameId: onEditArticle.forumNameId,
        forumAvatar: onEditArticle.forumAvatar,
        forumArticlePic: onEditArticle.forumArticlePic,
        forumReview: getThisIdInnerHTML,
        forumReviewLike: onEditArticle.forumReviewLike,
        forumCommentCount: onEditArticle.forumCommentArea.length,
        // 將原本的留言陣列onClickArticleComment內容展開後再把新的留言newComment加入
        forumCommentArea: onEditArticle.forumCommentArea,
      }

      const data = UpdateArticle
      console.log(data)
      // 將資料寫進資料庫
      const response = await fetch(
        'http://localhost:5555/forum/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const jsonObject = await response.json()

      // 將原始listdata從先前偵測到點擊到文章的索引值帶入後選擇刪除量為1，最後帶入要取代的文章物件
      await this.state.listdata.splice(onEditArticleIndex, 1, UpdateArticle)
      // console.log(jsonObject)
      // console.log(UpdateHeadline)
      // // console.log(updateHeadlineReturn)
      // console.log(this.state.listdata)
      // console.log(this.state.listdataReverse)
      // 因為splice後只會回傳被刪除的東西所以不能用updateHeadline倒回listdata
      // splice作用後會暫時將this.state.listdata轉變成新的陣列，再倒回去listdataReverse用來渲染左側列表的
      await this.setState({ listdataReverse: this.state.listdata })
      // console.log('123')
      // 如果不setState也可以作用，只是要先切換文章再點回來
    }
  }

  // --------------------編輯內文功能EeEnd---------------------------
  //
  //--------------------搜尋功能EStart-------------------------------
  // TODO:搜尋右邊藍渲染測試
  handleSearch = async () => {
    // 抓取搜尋欄輸入的文字內容
    const searchcontent = document.querySelector('#forumSearchBar').value
    // console.log(searchcontent)

    //  搜尋符合headline結果回傳之陣列
    const serchResultArray = this.state.listdata.filter(item =>
      item.headline.includes(searchcontent)
    )
    // console.log(serchResultArray)
    // 如果搜尋結果沒有就將預設的隱藏內容打開
    if (serchResultArray.length !== 0) {
      // addElement()
      await this.setState({
        // 將右半邊顯示
        searchStatus: 'd-none',
        searchNoDataContentStatus: '',
        searchNoDataContentHiddenArea: 'd-none',
      })
      // 重新渲染畫面
      this.setState({ listdataReverse: serchResultArray })
      await this.setState({
        nowIDdata: this.state.listdataReverse[0],
        currentcommentApi: this.state.listdataReverse[0].forumCommentArea,
      })
    } else {
      this.setState({
        searchStatus: '',
        searchNoDataContentStatus: 'd-none',
        searchNoDataContentHiddenArea: '',
      })
      // return
    }
  }
  //--------------------搜尋功能Eend------------------------------
  //
  //
  // ---------------------蒐藏功能START--------------------------
  handleCollect = async e => {
    // 如果抓不到收藏陣列在Render前下判斷式render <></>

    if (sessionStorage.getItem('memberId') === null) {
      // alert('請登入會員進行蒐藏')
      Swal.fire({
        // position: 'top-end',
        title: '<span style="color:#d4d1cc">請先登入會員</span>',
        html: '<span style="color:#d4d1cc">請點選確認繼續或取消離開</span>',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        // cancelButtonColor: ' #d33',
        confirmButtonClass: ' btn-warning',
        confirmButtonColor: '#ffa510',
        background: '#242b34',
      }).then(result => {
        // 確認有按下上傳確認鍵後開始FETCH
        if (result.value) {
          window.location.href = '/LoginSign'
        }
      })
    } else {
      // 比對抓到點擊到的標題物件
      const onCollect = this.state.listdata.find(
        item =>
          item.id ===
          (this.props.match.params.id
            ? +this.props.match.params.id
            : +this.state.listdataReverse[0].id)
      )

      // 比對抓到點擊到的標題物件的索引值
      const onEditArticleIndex = this.state.listdata.findIndex(
        item =>
          item.id ===
          (this.props.match.params.id
            ? +this.props.match.params.id
            : +this.state.listdataReverse[0].id)
      )

      const allCollect = onCollect.forumCollectMember

      console.log(onCollect.forumViews)
      console.log(sessionStorage.getItem('memberId'))
      // 尋找這篇文章是否有登入者的蒐藏
      const findMmber = allCollect.indexOf(sessionStorage.getItem('memberId'))
      // 如果陣列找不到會員就塞一個會員如果找到就砍掉，產生切換開關效果
      // 最後在設判斷要不要顯示收過
      if (findMmber !== -1) {
        // console.log(findMmber)
        allCollect.splice(findMmber, 1)
        await this.setState({ collectStatus: false })
        // console.log(allCollect)
      } else {
        allCollect.push(sessionStorage.getItem('memberId'))
        // console.log(allCollect)
        await this.setState({ collectStatus: true })
      }

      // 將目前要取代的文章物件先裝到一個容器，記得把headline取代換掉成目前取值的內容
      // 其他內容保持不變
      const UpdateCollect = {
        id: onCollect.id,
        // 將目前INNERText字樣替換回去headline state，會根據目前控制標題輸入內容變動
        headline: onCollect.headline,
        forumSpoilers: onCollect.forumSpoilers,
        forumCollectMember: allCollect,
        // 讚時把收藏的值儲存在這當作推文
        forumViews:
          findMmber === -1
            ? onCollect.forumViews + 1
            : onCollect.forumViews - 1,
        forumCreateDate: onCollect.forumCreateDate,
        forumCreateDateInSecond: onCollect.forumCreateDateInSecond,
        forumName: onCollect.forumName,
        forumNameId: onCollect.forumNameId,
        forumAvatar: onCollect.forumAvatar,
        forumArticlePic: onCollect.forumArticlePic,
        forumReview: onCollect.forumReview,
        forumReviewLike: onCollect.forumReviewLike,
        forumCommentCount: onCollect.forumCommentArea.length,
        // 將原本的留言陣列onClickArticleComment內容展開後再把新的留言newComment加入
        forumCommentArea: onCollect.forumCommentArea,
      }
      // await this.setState({ collectnowID:allCollect })
      // 取代目前所有STATE的內容中點到的那篇文章
      await this.state.listdata.splice(onEditArticleIndex, 1, UpdateCollect)
      // await this.setState({ nowIDdata: a})
      // splice後會直接將原本listdata直接變動。所以只要重新倒回去所以不用重新設定state也可
      await this.setState({ listdataReverse: this.state.listdata })
      // 選擇對listdata進行變更STATE是因為左邊測欄改變STATE的方式讓右便文章變動是拿listdata當參照
      // 所以這裡蓋過後，切換文章列表STATE也不會消失
      // console.log(this.state.listdata)
      // console.log(UpdateCollect)
      const data = UpdateCollect
      // console.log(data)
      // 將資料寫進資料庫
      const response = await fetch(
        'http://localhost:5555/forum/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
    }
    // console.log(this.state.nowIDdata)
  }

  // ---------------------蒐藏功能END--------------------------
  //
  //
  //
  // --------------------------排序套餐START---------------------------
  // 隱藏排序欄開關
  filterBarShowClick = () => {
    this.setState({ filterBarShow: !this.state.filterBarShow })
  }

  // 排序收藏
  handleViewFilter = () => {
    // 因為這裡牽扯到右邊內文跟留言是不同容器分開渲染的，當左邊列表被點擊過後會把下面兩個都變成TRUE
    // 造成渲染的方式被固定了因此在點別的按鈕改變左邊列表內容後右邊不會跟著變動
    // 所以要再把這兩都設定回FALSE，詳情可參照後續頁面RENDER的判斷式
    this.setState({ listClickChek: false })
    this.setState({ CommentClickChek: false })

    var items = this.state.listdata
    // console.log(items)
    // 切換標籤內圖片用的判斷
    this.setState({
      ViewfilterStatus: !this.state.ViewfilterStatus,
      // 切換列表顯示的排序為依照收藏數
      listFilterAccordding: false,
    })

    if (this.state.ViewfilterStatus === true) {
      // // sort by value
      // 大到小排序
      items.sort(function(a, b) {
        return b.forumViews - a.forumViews
      })
    } else {
      // 小到大排序
      items.sort(function(a, b) {
        return a.forumViews - b.forumViews
      })
    }
    // console.log(items)
    // 排序完切割成10筆側邊列表每頁顯示
    // 同時將該10筆第一筆資料放進渲染右邊內文與留言的容器
    this.setState({
      listdataReverse: items.slice(0, 10),
      nowIDdata: items.slice(0, 10)[0],
      currentcommentApi: items.slice(0, 10)[0].forumCommentArea,
    })
  }
  // 排序日期
  handleDateFilter = async () => {
    // 因為這裡牽扯到右邊內文跟留言是不同容器分開渲染的，當左邊列表被點擊過後會把下面兩個都變成TRUE
    // 造成渲染的方式被固定了因此在點別的按鈕改變左邊列表內容後右邊不會跟著變動
    // 所以要再把這兩都設定回FALSE，詳情可參照後續頁面RENDER的判斷式
    this.setState({ listClickChek: false })
    this.setState({ CommentClickChek: false })

    var items = this.state.listdata
    // console.log(items)
    // 切換標籤內圖片用的判斷
    this.setState({
      handleDateFilterStatus: !this.state.handleDateFilterStatus,
      // 這裡不可以把列表後面顯示的機制改回true，否則只會固定顯示留言數(目前機制false是留言數)
      // listFilterAccordding: true,
    })

    if (this.state.handleDateFilterStatus === true) {
      // // sort by value
      // 大到小排序
      items.sort(function(a, b) {
        return b.forumCreateDateInSecond - a.forumCreateDateInSecond
      })
    } else {
      // 小到大排序
      items.sort(function(a, b) {
        return a.forumCreateDateInSecond - b.forumCreateDateInSecond
      })
    }
    await this.setState({ filterDataFirstDataId: items.slice(0, 10)[0].id })
    // console.log(items)
    // 排序完切割成10筆側邊列表每頁顯示
    // 同時將該10筆第一筆資料放進渲染右邊內文與留言的容器
    await this.setState({
      listdataReverse: items.slice(0, 10),
      nowIDdata: items.slice(0, 10)[0],
      currentcommentApi: items.slice(0, 10)[0].forumCommentArea,
    })
  }

  handleCommentFilter = async () => {
    // 因為這裡牽扯到右邊內文跟留言是不同容器分開渲染的，當左邊列表被點擊過後會把下面兩個都變成TRUE
    // 造成渲染的方式被固定了因此在點別的按鈕改變左邊列表內容後右邊不會跟著變動
    // 所以要再把這兩都設定回FALSE，詳情可參照後續頁面RENDER的判斷式
    this.setState({ listClickChek: false })
    this.setState({ CommentClickChek: false })
    var items = this.state.listdata
    // console.log(items)
    // 切換標籤內圖片用的判斷
    this.setState({
      handlCommentFilterStatus: !this.state.handlCommentFilterStatus,
      // 切換列表顯示的排序為依照留言數
      listFilterAccordding: true,
    })

    if (this.state.handlCommentFilterStatus === true) {
      // // sort by value
      // 大到小排序
      items.sort(function(a, b) {
        return b.forumCommentCount - a.forumCommentCount
      })
    } else {
      // 小到大排序
      items.sort(function(a, b) {
        return a.forumCommentCount - b.forumCommentCount
      })
    }
    console.log(items)
    // 排序完切割成10筆側邊列表每頁顯示
    // 同時將該10筆第一筆資料放進渲染右邊內文與留言的容器
    this.setState({
      listdataReverse: items.slice(0, 10),
      nowIDdata: items.slice(0, 10)[0],
      currentcommentApi: items.slice(0, 10)[0].forumCommentArea,
    })
  }
  // --------------------------排序套餐End---------------------------

  render() {
    // 初始化因為要二次渲染，第一次沒有近來值的時候先回傳空內容，等進didmount後在正式render
    if (this.state.nowIDdata.forumCollectMember === undefined) {
      return (
        <>
          <div
            className="fa-2x w-100  d-flex justify-content-center align-items-center"
            style={{ width: '100%', height: '100vh', background: '#242b34' }}
          >
            <div>
              <i className="fas fa-spinner fa-spin" />
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <div
          className="container-fuild justify-content-center"
          style={{ marginTop: '120px' }}
        >
          <div className="row justify-content-center ">
            <div
              className="forumLeftArea col-lg-4 col-md-10 col-sm-12 mr-lg-4 mr-md-0 mr-sm-0 "
              // style={{ height: '1000px', width: '500px' }}
            >
              <div
              // className="position-fixed 0"
              // style={{ width: '500px' }}
              >
                <div className="">
                  <InputCardContent_MemberSignUp
                    inputmsg={this.state.inputmsg}
                    inputH={this.state.inputH}
                    inputLabel={this.inputLabel}
                    onClick={this.handleShow}
                    onhide={this.handleClose}
                    show={this.state.show}
                    handleModalFormInputChange={this.handleModalFormInputChange}
                    handleModalFormInputSave={this.handleModalFormInputSave}
                    forumName={this.state.forumName}
                    headline={this.state.headline}
                    forumReview={this.state.forumReview}
                    forumSpoilers={this.state.forumSpoilers}
                    // 爆雷公能，兩個handle都必須同時要有
                    handleSpoilerToggle={this.handleSpoilerToggle}
                    handleSpoilerChange={this.handleSpoilerChange}
                    // 上傳圖片
                    forumArticlePic={this.state.forumArticlePic}
                    handleArticlePicChange={this.handleArticlePicChange}
                  />
                </div>

                <div className="my-4">
                  <ForumSearchbarRoy
                    handleSearch={this.handleSearch}
                    filterBarShowClick={this.filterBarShowClick}
                  />
                </div>
                <div
                  className="d-flex justify-content-end  "
                  style={{
                    height: this.state.filterBarShow ? '40px' : '0px',
                    transition: '0.5s',
                    marginBottom: this.state.filterBarShow ? '1.5rem' : '0',
                  }}
                >
                  <div className="ml-3">
                    <ActionButtonCategoryRoy
                      // 日期篩選用
                      handleDateFilter={this.handleDateFilter}
                      handleDateFilterStatus={this.state.handleDateFilterStatus}
                      filterBarShow={this.state.filterBarShow}
                      // 傳遞整筆資料下去先讓BUTTON運算值不用改變後的陣列運算因為會step會拿上階段的顯示
                      // 先送整筆資料下去，同時在BUTTON裡面同步作運算，得到相同的回傳結果
                      nowAllData={this.state.listdata}
                    />
                  </div>
                  <div className="ml-3">
                    <ActionButtonFilterRoy
                      // 收藏數篩選用
                      handleViewFilter={this.handleViewFilter}
                      handleViewFilterStatus={this.state.ViewfilterStatus}
                      filterBarShow={this.state.filterBarShow}
                      nowAllData={this.state.listdata}
                    />
                  </div>
                  <div className="ml-3">
                    <ActionButtonCommentRoy
                      // 留言數篩選用
                      handleCommentFilter={this.handleCommentFilter}
                      handlCommentFilterStatus={
                        this.state.handlCommentFilterStatus
                      }
                      filterBarShow={this.state.filterBarShow}
                      nowAllData={this.state.listdata}
                    />
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center align-content-center w-100  mb-4"
                  style={{ height: '40px' }}
                >
                  <ForumPage
                    // 將總頁數算完傳下去
                    ForumTotalPages={this.state.ForumTotalPages}
                    // 將目前頁數的資料傳下去給button偵測回傳的路徑為哪個id
                    nowPage={this.state.listdataReverse}
                    // 控制按鈕按下後傳入目前第幾頁的參數去重新渲染listdataReverse裡資料的陣列
                    handleNowPageNumber={this.handleNowPageNumber}
                    // 把當前頁碼應該對應到的ID位置數值傳下去
                    cuerrenPageFirstData={this.state.cuerrenPageFirstData}
                    // firstData={this.state.listdataReverse}
                    // 上一頁功能
                    handlePrevPage={this.handlePrevPage}
                    // 下一頁功能
                    handleNextvPage={this.handleNextvPage}
                    handleOnlyScrollLeftPage={this.handleOnlyScrollLeftPage}
                    handleOnlyScrollRightPage={this.handleOnlyScrollRightPage}
                    handleOnlyScrollRightHover={this.handleOnlyScrollRightHover}
                    handleOnlyScrollLeftHover={this.handleOnlyScrollLeftHover}
                    // 目前頁面，寫判斷式用
                    currentPage={this.state.currentPage}
                    // 先傳下去同時作運算，讓BUTTON 點下去PATH馬上有ID值帶入
                    listData={this.state.listdata}
                    // 目前頁面第一筆資料計算用
                    currentLastDataId={this.state.currentLastDataId}
                  />
                </div>
                <div className=" mt-1">
                  <ActionBtnScrollTopRoy
                    handleScrollTop={this.handleScrollTop}
                  />
                </div>
                <div
                  className={
                    ' px-4 text-center m-2 text-light  rounded ' +
                    this.state.searchStatus
                  }
                  style={{
                    border: 'none',
                    background: 'none',
                    boxShadow: '0 2px 6px #191C20',
                    height: '500px',
                  }}
                >
                  <h4 className="align-middle" style={{ height: '500px' }}>
                    沒有符合搜尋的結果
                  </h4>
                </div>
                <div
                  id="forumListScollTop"
                  className={
                    'listRWDHeight my-2 ' + this.state.searchNoDataContentStatus
                  }
                  style={{
                    height: '500px',
                    overflowY: 'scrholl',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                  }}
                >
                  {/* 將陣列倒入COMPINET，用MAP的方式，記得設定KEY */}
                  {/* 同時撈將各index */}
                  {this.state.listdataReverse.map((element, index) => (
                    <Link
                      to={'/forum/' + element.id}
                      // hover無底線
                      className="text-decoration-none"
                      // 因為冒泡事件關係enter leave要綁在包在外層的div等
                      // 用這裡取代原本要click的事件
                      onMouseEnter={this.handleListMouseEnter.bind(
                        this,
                        index,
                        element
                      )}
                      onMouseLeave={this.handleListMouseLeave.bind(
                        this,
                        index,
                        element
                      )}
                      // onMouseLeave={this.handleListUnHover}
                    >
                      {/* {console.log(element)} */}
                      <ForumArticleListRoy
                        id="searchDiv"
                        //MAP之所在，KEY之所在
                        key={element.id}
                        currentId={element.id}
                        listheadline={element.headline}
                        listforumSpoilers={element.forumSpoilers}
                        // 根據目前排序切換根據變更顯示哪種數字
                        listforumViews={
                          this.state.listFilterAccordding
                            ? element.forumCommentCount
                            : element.forumViews
                        }
                        listforumCreateDate={element.forumCreateDate}
                        listforumName={element.forumName}
                        listforumAvatar={element.forumAvatar}
                        nowParams={this.state.nowParams}
                        // 用bind綁定偵測點擊當下的element之index，並傳入handleClick得到index值
                        // click後將listClickChek state轉為true
                        // 用上面的mouseEnther更炫泡
                        onClick={this.handleClick.bind(this, index, element)}
                        // 圖像路徑開頭
                        avatarPath={this.state.imagePath}
                        listFilterAccorddingPic={
                          this.state.listFilterAccordding
                        }
                      />
                    </Link>
                  ))}
                </div>
                <div className=" mb-3">
                  <ActionBtnScrollBottomRoy
                    handleScrollBottom={this.handleScrollBottom}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                'forumRighttArea col-lg-7 col-md-10 col-sm-12 ml-lg-4 ml-md-0 ml-sm-0'
              }
            >
              <div className={' ' + this.state.searchNoDataContentHiddenArea} />
              <div className={' ' + this.state.searchNoDataContentStatus}>
                <div
                  className=""
                  style={{
                    border: 'none',
                    background: '#29313B',
                    boxShadow: '0 2px 6px #191C20',
                  }}
                >
                  <div className="row m-0 p-0 ">
                    <div className="col-12  p-5  ">
                      <>
                        {/* <ActionBtnUpdateArticleRoy
                      onClick={this.handleArticleEdit}
                    /> */}
                        {/* {
                      (console.log(this.state.currentdata),
                      console.log(this.state.listClickChek))
                    } */}
                        <ForumArticleContentRoy
                          nowLoginID={this.state.nowLoginUserId}
                          // 將點擊文章列表後所產生的物件中的值傳下去，同時更新文章內容
                          // 檢查是否有點擊上方ForumArticleListRoy列表
                          // 並在handleClick裡將listClickChek轉成true，用link方式重新render則會再回到false
                          // 有就用FETCH到的資料RENDER，如果是用LINK方式判斷FALSE就用params判斷id後所倒入的另一個state撈資料
                          // nowIDdata為params比對倒入的state
                          // currentdata為click倒入的state
                          articleeID={
                            this.state.listClickChek
                              ? this.state.currentdata.id
                              : this.state.nowIDdata.id
                          }
                          forumNameId={
                            this.state.listClickChek
                              ? this.state.currentdata.forumNameId
                              : this.state.nowIDdata.forumNameId
                          }
                          contentheadline={
                            this.state.listClickChek
                              ? this.state.currentdata.headline
                              : this.state.nowIDdata.headline
                          }
                          contentSpoiler={
                            this.state.listClickChek
                              ? this.state.currentdata.forumSpoilers
                              : this.state.nowIDdata.forumSpoilers
                          }
                          contentUserAvatar={
                            this.state.listClickChek
                              ? this.state.currentdata.forumAvatar
                              : this.state.nowIDdata.forumAvatar
                          }
                          contentUserName={
                            this.state.listClickChek
                              ? this.state.currentdata.forumName
                              : this.state.nowIDdata.forumName
                          }
                          contentIssueDate={
                            this.state.listClickChek
                              ? this.state.currentdata.forumCreateDate
                              : this.state.nowIDdata.forumCreateDate
                          }
                          contentReview={
                            this.state.listClickChek
                              ? this.state.currentdata.forumReview
                              : this.state.nowIDdata.forumReview
                          }
                          forumReviewLike={
                            this.state.listClickChek
                              ? this.state.currentdata.forumReviewLike
                              : this.state.nowIDdata.forumReviewLike
                          }
                          contentArticlePic={
                            this.state.listClickChek
                              ? this.state.currentdata.forumArticlePic
                              : this.state.nowIDdata.forumArticlePic
                          }
                          // 用來傳遞當筆資料id值下去然後在元件街上字串產生唯一id
                          // 用來編輯時getelement控制用
                          contentheadlineId={
                            this.state.listClickChek
                              ? this.state.currentdata.id
                              : this.state.nowIDdata.id
                          }
                          // 圖片路徑前墜
                          avatarPath={this.state.imagePath}
                          // 刪除文章button
                          handleArticleDelete={this.handleArticleDelete}
                          // 文章標題編輯後state變更用
                          handleHeadlineEditSave={this.handleHeadlineEditSave}
                          handleHeadlineEditCancel={
                            this.handleHeadlineEditCancel
                          }
                          handleHeadlineEditKeyboardControl={
                            this.handleHeadlineEditKeyboardControl
                          }
                          // 確認是否有按標題邊輯按鈕
                          handleHeadlineEditTrigger={
                            this.handleHeadlineEditTrigger
                          }
                          // 傳送是否可編輯部林值確認是否啟動編輯
                          handleHeadlineEditStatus={
                            this.state.handleHeadlineEditStatus
                          }
                          HeadlineEditBtnStatus={
                            this.state.HeadlineEditBtnStatus
                          }
                          HeadlineSaveBtnStatus={
                            this.state.HeadlineSaveBtnStatus
                          }
                          HeadlineCancelBtnStatus={
                            this.state.HeadlineCancelBtnStatus
                          }
                          handleArticleEditSave={this.handleArticleEditSave}
                          handleArticleEditTrigger={
                            this.handleArticleEditTrigger
                          }
                          handleArticleEditCancel={this.handleArticleEditCancel}
                          handleArticleEditStatus={
                            this.state.handleArticleEditStatus
                          }
                          ArticleEditBtnStatus={this.state.ArticleEditBtnStatus}
                          ArticleSaveBtnStatus={this.state.ArticleSaveBtnStatus}
                          ArticleCancelBtnStatus={
                            this.state.ArticleCancelBtnStatus
                          }
                          articleCreateTimeCount={this.articleCreateTimeCount}
                          forumCreateTimeCount={this.state.forumCreateTimeCount}
                          handleCollect={this.handleCollect}
                          // 判讀目前有沒有蒐藏切換TAG
                          collectStatus={
                            this.state.listClickChek
                              ? this.state.currentdata.forumCollectMember
                              : this.state.nowIDdata.forumCollectMember
                          }
                          articleShow={this.state.articleShow}
                          // 控制內文爆雷顯ˋ
                          handleSpoilerShow={this.handleSpoilerShow}
                          //  控制已經底開的永久顯示
                          spoilerClickCheck={this.state.spoilerClickCheck}
                        />
                      </>
                    </div>
                  </div>
                </div>
                <div
                  className="row my-4 "
                  style={{
                    border: 'none',
                    background: 'none',
                    boxShadow: '0 2px 6px #191C20',
                  }}
                >
                  <div
                    className="col-12 p-5 "
                    style={{ background: '#29313B' }}
                  >
                    <div className="d-flex ">
                      <div className="">
                        <ForumCategoryTextRoy />
                      </div>
                      <div className="mx-5">
                        <ForumCommentCountRoy
                          // 計算該篇文章下面留言數量
                          /* 確認是否有用點列表的方式render，否則用didmount比對params的currentcommentApi state帶出陣列去MAP後渲染 */
                          commentCount={
                            this.state.CommentClickChek
                              ? this.state.currentcommentdata.length
                              : this.state.currentcommentApi.length
                          }
                        />
                      </div>
                    </div>
                    {/* 確認是否有用點列表的方式render，否則用didmount比對params的currentcommentApi state帶出陣列去MAP後渲染 */}
                    {(this.state.CommentClickChek
                      ? this.state.currentcommentdata
                      : this.state.currentcommentApi
                    ).map((e, index) => (
                      <>
                        {/* {console.log(this.state.currentcommentdata)} */}
                        {/* {console.log(e)} */}
                        <ForumArticleCommentRoy
                          // map要用陣列，先建立一個陣列裝對應當篇文章下面的留言
                          key={e.forumCommentId}
                          forumCommentId={e.forumCommentId}
                          commentComment={e.forumComment}
                          commentLike={e.forumCommentLike}
                          commentDislike={e.forumCommentDislike}
                          commentUserName={e.forumCommentName}
                          commentAvatar={e.forumCommentAvatar}
                          // 傳遞判斷刪留言比對session依據
                          forumCommentUserId={e.forumCommentUserId}
                          // 圖片路徑前墜
                          avatarPath={this.state.imagePath}
                          handleCommentDelete={this.handleCommentDelete}
                          commentCreateTimeCount={
                            this.state.commentCreateTimeCount[index]
                          }
                          handleCommentDislike={this.handleCommentDislike}
                          handleCommentLike={this.handleCommentLike}
                          commentlikeStatus={this.state.commentlikeStatus}
                          commentDislikeStatus={this.state.commentDislikeStatus}
                        />
                      </>
                    ))}
                    <div className="mt-5">
                      <ForumArticleCommentInputRoy
                        handleCommentInputArea={this.handleCommentInputArea}
                        commentCount={
                          this.state.CommentClickChek
                            ? this.state.currentcommentdata.length
                            : this.state.currentcommentApi.length
                        }
                      />
                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                      <div className="mx-2">
                        <ForumCommentCancelRoy
                          // 留言清除輸入內容
                          handleCommentInputCancel={
                            this.handleCommentInputCancel
                          }
                        />
                      </div>
                      <ForumCommentCreateRoy
                        handleCommentInput={
                          // 確認handleCommentInputArea有沒有輸入內容有再觸發送出否則警告
                          this.state.CommentInputStatus
                            ? this.handleCommentInput
                            : this.handleCommentInputAreaCheck
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-none px-3 py-4 rounded border border-warning position-fixed"
          style={{ right: 0, top: '25vh' }}
        >
          <ForumSideActionBarRoy />
        </div>
      </>
    )
  }
}

export default Forum
