import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './article.css'
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaRegBookmark,
} from 'react-icons/fa'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const memberId = sessionStorage.getItem('memberId')

class ArticleCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberInfo: [], //被收藏的文章id
      articleInfo: [], //文章的資訊
    }
  }
  async componentDidMount() {
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
      //   this.setState({ memberAllData: memberData }) //全部資料
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

    // 倒入會員資料
  }
  render() {
    return (
      <>
        <Row className="my-3 articleCard">
          <Col className="justify-content-center" xs={12} md={9}>
            213
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleCard
