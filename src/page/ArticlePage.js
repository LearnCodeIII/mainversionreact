/* eslint-disable array-callback-return */
import React from 'react'
import ArricleList from '../component/article/ArticleList'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ViewPage from '../component/article/ArticlePage/ViewPage'

import ArticleComment from '../component/article/ArticlePage/ArticleComment'
import ArticleCommentInput from '../component/article/ArticlePage/ArticleCommentInput'
import ArticleBtnGroup from '../component/article/ArticleList/ArticleButton/ArticleBtnGroup'
import { async } from 'q'

const memberId = sessionStorage.getItem('memberId')

class ArticlePage extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.match.params.id)
    this.state = {
      thisId: props.match.params.id, //該篇連結id = id
      articleInfo: [], //該篇的資料
      isMarked: false, // boolean
      markCounter: 0,
      isLiked: false,
      likeCounter: 0,
      viewCounter: 0,
      articleComment: [], // 該篇文章的留言
      memberAllData: [],
      memberInfo: [], //會員的收藏文章編號
      inputText: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMarkClick = this.handleMarkClick.bind(this)
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      // console.log(data[0].data);

      // 所有文章的資料
      const pageData = data

      //將該篇資料倒入狀態
      const page = pageData.find(item => item.id === this.state.thisId)
      console.log('page')
      console.log(page)
      this.setState({ articleInfo: page })
      this.setState({ viewCounter: page.viewCounter })

      //該篇文章按讚的會員ID
      const likeSid = page.likeId
      console.log(likeSid)
      //該篇有按讚的會員ID 是否等於目前登入的ID
      const isLiked = page.likeId.find(item => item === memberId) ? true : false

      // 按讚人數
      this.setState({ isLiked: isLiked })
      this.setState({ likeCounter: likeSid.length })
    } catch (err) {
      console.log(err)
    }

    // 倒入留言的資料
    try {
      const res = await fetch(
        'http://localhost:5555/articleComment?_sort=id&_order=DESC',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const dataC = await res.json()

      // 撈出全部留言中   針對目前thisId這篇文章的留言　　↓部分留言
      var commentData = dataC.filter(item => item.aid === +this.state.thisId)
      var commentDataId = commentData.id
      console.log(commentData)
      console.log(commentDataId)
      // 將部分留言倒入狀態
      this.setState({ articleComment: commentData })
    } catch (err) {
      console.log(err)
    }

    // 倒入會員資料
    if (memberId) {
      try {
        // 這邊先寫死 取快樂碼農資料
        const memberRes = await fetch(
          'http://localhost:5555/member/' + memberId,
          {
            method: 'GET',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const memberData = await memberRes.json()
        console.log(memberData)
        const memberInfo = memberData.collectArticle
        this.setState({ memberAllData: memberData }) //全部資料
        this.setState({ memberInfo: memberInfo }) //收藏文章序號
        console.log(memberInfo) //快樂碼農
        console.log(this.state.memberInfo) //快樂碼農

        //判斷收藏該篇的名單中 有沒有該會員 (獨立狀態) 目前會員是快樂瑪儂
        const isMarked = memberData.collectArticle.find(
          item => item === this.state.articleInfo.id
        )
          ? true
          : false

        // 資料倒入狀態 是否收藏
        this.setState({ isMarked: isMarked }) //boolean
        // this.setState({ isLiked: isLiked })
      } catch (err) {
        console.log(err)
      }
    }
  }
  // 偵測留言
  handleChange = event => {
    this.setState({ inputText: event.target.value })
  }

  // 留言送出
  goComment = async () => {
    if (memberId) {
      alert('回應成功!!!SID:' + this.state.thisId)
      let newRes = {
        aid: +this.state.thisId,
        date: new Date().toDateString(),
        authorID: memberId,
        author: this.state.memberAllData.nickname,
        avatar: this.state.memberAllData.avatar,
        content: this.state.inputText,
      }
      try {
        const res = await fetch('http://localhost:5555/articleComment', {
          method: 'POST',
          body: JSON.stringify(newRes),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        const newComment = await res.json()
        // console.log(newComment)
        // const newCommentData = newComment.filter(
        //   item => item.aid === +this.state.thisId
        // )
        // fetch新資料後的判斷渲染套餐
        const newI = this.state.articleComment.find(
          item => +item.id === +newComment.id
        )
          ? true
          : // ? this.setState({ articleComment: this.state.articleComment })
            this.setState({
              articleComment: [newComment, ...this.state.articleComment],
            })

        console.log(newComment)
        console.log(newI)
        // 清空輸入框
        document.querySelector('#commentInput').value = []
      } catch (err) {
        console.log(err)
      }
      // this.forceUpdate()
    } else {
      alert('請先登入')
    }
  }

  // -----------------------收藏套餐------------------------
  handleMarkClick = async () => {
    if (memberId) {
      console.log(this.state.memberAllData)
      // var newMark = []
      var newMark = [...this.state.memberInfo]

      // const Marked = newMark.find(item => item === this.state.thisId)

      this.setState({ isMarked: !this.state.isMarked })

      if (this.state.isMarked) {
        newMark = newMark.filter(element => {
          return element !== this.state.thisId
        })
      } else {
        newMark = [this.state.thisId, ...this.state.memberInfo]
        console.log(typeof this.state.thisId + ':' + this.state.thisId)
        console.log('false')
        console.log(newMark)
      }

      // 新的會員資訊 (更新收藏文章項目)
      let newMemberData = {
        id: this.state.memberAllData.id,
        name: this.state.memberAllData.name,
        nickname: this.state.memberAllData.nickname,
        gender: this.state.memberAllData.gender,
        mobile: this.state.memberAllData.mobile,
        birth: this.state.memberAllData.birth,
        email: this.state.memberAllData.email,
        pwd: this.state.memberAllData.pwd,
        avatar: this.state.memberAllData.avatar,
        city: this.state.memberAllData.city,
        address: this.state.memberAllData.address,
        fav_type: this.state.memberAllData.fav_type,
        career: this.state.memberAllData.career,
        join_date: this.state.memberAllData.join_date,
        permission: this.state.memberAllData.permission,
        collectFilm: this.state.memberAllData.collectFilm,
        collectCinema: this.state.memberAllData.collectCinema,
        collectArticle: newMark,
        collectActivity: this.state.memberAllData.collectActivity,
        collectActivityJoin: this.state.memberAllData.collectActivityJoin,
        collectForum: this.state.memberAllData.collectForum,
        markList: this.state.memberAllData.markList,
      }

      const data = newMemberData

      try {
        const res = await fetch(
          'http://localhost:5555/member/' + this.state.memberAllData.id,
          {
            method: 'PUT',
            body: JSON.stringify(data), //新的會員收藏資料
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const newMarkData = await res.json()
        const newMarkA = newMarkData.collectArticle
        console.log(newMarkData)
        console.log('Aid:')
        console.log(newMarkA)
        // fetch新資料後的判斷渲染套餐(收藏)
        // const MarkYN

        this.shouldComponentUpdate()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('please login')
    }
  }

  // ----------------------按讚套餐--------------------------
  handleLikeClick = async () => {
    if (memberId) {
      alert('按讚成功!!!')
      console.log(this.state.memberAllData.id)
      // 按讚清單所用的新資料  原本陣列 memberAllData
      let newLikeData = {
        id: this.state.articleInfo.id,
        title: this.state.articleInfo.title,
        author: this.state.articleInfo.author,
        avatar: this.state.articleInfo.avatar,
        date: this.state.articleInfo.date,
        content: this.state.articleInfo.content,
        image: this.state.articleInfo.image,
        link: this.state.articleInfo.link,
        markId: this.state.articleInfo.markId,
        likeId: [memberId, ...this.state.articleInfo.likeId],
        viewCounter: this.state.articleInfo.viewCounter,
      }

      const data = newLikeData

      try {
        const res = await fetch(
          'http://localhost:5555/articleCardData/' + this.state.thisId,
          {
            method: 'PUT',
            body: JSON.stringify(newLikeData),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const newALpage = await res.json() //新的文章資料(加入按讚ID後)
        console.log(newALpage)
        // fetch新資料後的判斷渲染套餐
        const LikeYN = this.state.articleInfo.likeId.find(
          item => item.likeId === memberId
        )
          ? true
          : false
        this.setState({ isLiked: !LikeYN })
        this.setState({ likeCounter: newALpage.likeId.length })
        console.log(LikeYN)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('please login')
    }
  }

  render() {
    return (
      <>
        <div className="container-fuild viewPage">
          <div>
            {/* 內容頁 右邊按鈕群 */}
            <ArticleBtnGroup
              handleMarkClick={this.handleMarkClick}
              handleLikeClick={this.handleLikeClick}
            />
          </div>
          <Row className="">
            {/* 真正的文章資訊塊 */}
            <ViewPage
              sid={this.state.articleInfo.id}
              title={this.state.articleInfo.title}
              author={this.state.articleInfo.author}
              content={this.state.articleInfo.content}
              date={this.state.articleInfo.date}
              pageImg={'/images//article/' + this.state.articleInfo.image}
              isMarked={this.state.isMarked}
              markCounter={this.state.markCounter}
              isLiked={this.state.isLiked}
              likeCounter={this.state.likeCounter}
              viewCounter={this.state.viewCounter}
              handleMarkClick={this.handleMarkClick}
              handleRender={this.handleRender}
              handleChange={this.handleChange}
              goComment={this.goComment}
              inputText={this.inputText}
            />
          </Row>

          {/* 回覆文章區塊 */}

          {/* 網友評論區塊 */}
          <div className="col-md-5 text-center my-4">
            <h4 className="text-light">網友評論</h4>
          </div>
          <div>
            {this.state.articleComment.map((item, index) => (
              <ArticleComment
                className="d-flex"
                sid={item.id}
                authorID={item.authorID}
                author={item.author}
                avatar={item.avatar}
                date={item.date}
                content={item.content}
                memberId={memberId}
                // res={item.resComment}
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}
// handleClick = value => () => {
//   // const newInfo = [...this.state.articleInfo];
//   this.setState({ viewCounter: +this.state.viewCounter + value });
// };

export default ArticlePage
