import React from 'react'
import { Link } from 'react-router-dom'
import ForumArticleListRoy from '../component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../component/Forum/ForumActionButton/ActionButtonFilterRoy'
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
      forumSpoilers: true,
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
      // console.log(nowIddata)
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
      this.timerID = setInterval(this.articleCreateTimeCount, 1000)
      this.timerIDComment = setInterval(this.CommentCreateTimeCount, 1000)
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

      console.log(data)
      console.log(noLoginInfo)
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
      day > 1
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

  // ------------------------------發文時間自動更新套餐Start---------------------------------------
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
      let showTimeText =
        day > 1
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

  // ------------------------------發文時間自動更新套餐End----------------------------------------

  // ----------------------------------pagination頁面套餐start-------------------------------
  // 最後動作完一定要設定state讓全部重新渲染
  handleNowPageNumber = async e => {
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
      await this.setState({
        listdataReverse: listdatareverse,
        nowIDdata: listdatareverse[0],
        currentcommentApi: listdatareverse[0].forumCommentArea,
        // currentLastDataId: +listdatareverse[0].id,
      })
    }
  }

  //下一頁 使用參數用法都跟上面page主軸一樣
  handleNextvPage = async e => {
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
  // 點列表顯示頁面功能
  // element:點擊到列表的對應物件，index當個文章的索引值
  handleClick = async (index, element) => {
    // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容ForumArticleContentRoy

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
    })
    // console.log(this.state.currentcommentdata)
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
  handleSpoilerToggle = () => {
    this.setState({ forumSpoilers: !this.state.forumSpoilers })
    console.log(this.state.forumSpoilers)
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
    alert('請輸入內容')
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
        ? this.state.noLoginInfo.name
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

    try {
      // const data = newData
      // 將更新後的文章內容包進data最後用PUT方式丟回SERVER
      const data = UpdateArticle
      // console.log(data)
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
      // console.log(jsonObject)
      //TODO:檢查留言功能
      // 在State中設定特定陣列中的物件，這邊一邊設定回原始listdata中比對到的forumCommentArea陣列
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
      // 同時設定新留言到用來渲染留言的currentcommentdata state
      this.setState(
        {
          currentcommentdata: UpdateArticle.forumCommentArea,
          CommentClickChek: true,
        },
        () => {
          // 發文後後把留言內容清掉
          document.querySelector('#CommentArea').value = ''
          alert('留言成功!')
          // this.handleClose()
          // window.location.href = '/forum/'
        }
      )
      console.log(this.state.CommentClickChek)
    } catch (e) {
      console.log(e)
    }
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

    try {
      // 將更新後的文章內容包進data最後用PUT方式丟回SERVER
      const data = UpdateComment
      // console.log(data)
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
      // console.log(jsonObject)
      //TODO:檢查留言功能
      // 在State中設定特定陣列中的物件，這邊一邊設定回原始listdata中比對到的forumCommentArea陣列
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
      // 同時設定新留言到用來渲染留言的currentcommentdata state
      this.setState(
        {
          currentcommentdata: UpdateComment.forumCommentArea,
          // 判斷渲染方式用，參考綁定props
          CommentClickChek: true,
        },
        () => {
          // 發文後後把留言內容清掉
          alert('刪除留言成功!')
          // this.handleClose()
          // window.location.href = '/forum/'
        }
      )
      console.log(this.state.currentcommentdata)
    } catch (e) {
      console.log(e)
    }
  }
  // --------------------------------刪除留言功能End-----------------------------------

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
      // alert('回到登入頁')
      window.location.href = '/LoginSign'
    } else {
      this.setState({ show: true })
    }
  }

  // 發送文章
  handleModalFormInputSave = async () => {
    // 簡單的檢查部份
    if (this.state.forumReview.trim() === '') {
      alert('請輸入評論!')
      return
    }
    if (this.state.forumReview.trim().length > 3000) {
      alert('內文請勿超過3000字!')
      return
    }

    console.log('123')
    if (this.state.headline.trim() === '') {
      alert('請輸入標題!')
      return
    }
    if (this.state.headline.trim().length > 30) {
      alert('標題請勿超過30字!')
      return
    }
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
      forumName: this.state.noLoginInfo.name,
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
    try {
      const data = item

      const response = await fetch('http://localhost:5555/forum', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const jsonObject = await response.json()

      // console.log(jsonObject)

      // 確認資料有進資料庫後再setState
      await this.setState({ listdata: newData }, () => {
        alert('資料已成功新增!')
        this.handleClose()
        // console.log(this.state.listdata)
        // 送出表單後重新導向最新一筆頁面
        window.location.href = '/forum/' + this.state.listdata[0].id + 1
      })
    } catch (e) {
      console.log(e)
    }
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
    try {
      // 用DELETE去刪除特定ID的文章
      // console.log(data)
      const response = await fetch(
        'http://localhost:5555/forum/' + this.props.match.params.id,
        {
          method: 'DELETE',
          // DELETE不用給BODY
          // body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      // 摻刪出來接出來的是空的
      const jsonObject = await response.json()

      // 將filter後的剩下的陣列倒回listdata後重新導向最新一筆頁面
      await this.setState({ listdata: filteredRestArticle }, () => {
        alert('刪除成功!')
        window.location.href = '/forum/' + this.state.listdataReverse[0].id
      })
    } catch (e) {
      console.log(e)
    }
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
    currentNodeSelect.parentNode.setAttribute('style', 'width:75% ')
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
      alert('請輸入內容')
    } else if (getThisIdInnerText.length > 30) {
      // console.log(getThisIdInnerText.length)
      alert('請勿超過30字')
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
      alert('請輸入內容')
    } else if (getThisIdInnerHTML.length > 3000) {
      alert('請勿超過3000字')
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
      this.setState({
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
  //
  render() {
    return (
      <>
        <div
          className="container-fuild justify-content-center"
          style={{ marginTop: '120px' }}
        >
          <div className="row justify-content-center ">
            <div className="col-3 mr-4 px-1 " style={{ height: '1000px' }}>
              <div className="">
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
                  <ForumSearchbarRoy handleSearch={this.handleSearch} />
                </div>
                {/* <div className="d-flex m-0 ">
                  <div className="mr-3">
                    <ActionButtonCategoryRoy />
                  </div>
                  <div className="">
                    <ActionButtonFilterRoy />
                  </div>
                </div> */}
                <div
                  className="d-flex justify-content-center align-content-center w-100 my-3"
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
                    // 上一頁功能
                    handlePrevPage={this.handlePrevPage}
                    // 下一頁功能
                    handleNextvPage={this.handleNextvPage}
                    // 目前頁面，寫判斷式用
                    currentPage={this.state.currentPage}
                    // 目前頁面第一筆資料計算用
                    currentLastDataId={this.state.currentLastDataId}
                  />
                </div>
                <div className=" my-1">
                  <ActionBtnScrollTopRoy
                    handleScrollTop={this.handleScrollTop}
                  />
                </div>
                <div
                  className={
                    'px-4 text-center my-2 text-light  rounded ' +
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
                  className={'px-1 ' + this.state.searchNoDataContentStatus}
                  style={{
                    height: '500px',
                    overflowY: 'schroll',
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
                    >
                      {/* {console.log(element)} */}
                      <ForumArticleListRoy
                        id="searchDiv"
                        //MAP之所在，KEY之所在
                        key={element.id}
                        listheadline={element.headline}
                        listforumSpoilers={element.forumSpoilers}
                        listforumViews={element.forumViews}
                        listforumCreateDate={element.forumCreateDate}
                        listforumName={element.forumName}
                        listforumAvatar={element.forumAvatar}
                        // 用bind綁定偵測點擊當下的element之index，並傳入handleClick得到index值
                        // click後將listClickChek state轉為true
                        onClick={this.handleClick.bind(this, index, element)}
                        // 圖像路徑開頭
                        avatarPath={this.state.imagePath}
                      />
                    </Link>
                  ))}
                </div>
                <div className=" my-3">
                  <ActionBtnScrollBottomRoy
                    handleScrollBottom={this.handleScrollBottom}
                  />
                </div>
              </div>
            </div>
            <div className={'col-7 ml-4 '}>
              <div className={' ' + this.state.searchNoDataContentHiddenArea} />
              <div className={' ' + this.state.searchNoDataContentStatus}>
                <div
                  style={{
                    border: 'none',
                    background: 'none',
                    boxShadow: '0 2px 6px #191C20',
                  }}
                >
                  <div className="row m-0 p-0">
                    <div className="col-12  p-5">
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
                  <div className="col-12 p-5 ">
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
                        />
                      </>
                    ))}
                    <div className="mt-5">
                      <ForumArticleCommentInputRoy
                        handleCommentInputArea={this.handleCommentInputArea}
                      />
                    </div>
                    <div className="my-4 d-flex justify-content-end">
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
