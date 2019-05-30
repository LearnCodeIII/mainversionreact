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
import ReadMore from './ArticleList/ArticleButton/ReadMore'
import ArticleLike from './ArticleList/ArticleButton/Like'
import ArticleMark from './ArticleList/ArticleButton/Mark'
import ArticleShare from './ArticleList/ArticleButton/Share'
import ArticleComment from './ArticleList/ArticleButton/Comment'
import { isTerminatorless } from '@babel/types'
const memberId = sessionStorage.getItem('memberId')

class ArticleCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberInfo: [],
    }
  }

  async componentDidMount() {
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

        // 全部資料的長度除以 per page 並且無條件進位
        const memberInfo = memberData.collectArticle
        console.log(memberInfo) //快樂碼農
        this.setState({ memberInfo: memberInfo })
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return (
      <>
        <Row className="my-3 articleCard justify-content-center">
          <Col className="justify-content-center" xs={12} md={10}>
            <Link to={'/article/' + this.props.sid} className="link-a">
              <div className="mb-3 article-card">
                {this.state.memberInfo.find(item => item === this.props.sid) ? (
                  <div type="" className="">
                    <FaBookmark className="mr-1 righ-mark text-warning" />
                  </div>
                ) : (
                  <div type="" className="">
                    <FaRegBookmark className="mr-1 righ-mark text-warning" />
                  </div>
                )}

                <div className="row no-gutters d-flex">
                  <div className="col-md-4 article_pic d-flex justify-content-center">
                    <img
                      src={this.props.cardImg}
                      className="img56 card-img"
                      alt="..."
                    />
                    <div className="bigDarkBG" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body d-flex row my-4 mx-4 px-4">
                      <h5 className="card-title">
                        {/* 設定標題字串只取前28個字 */}
                        {/* {this.props.sid} */}
                        {this.props.cardTitle.substr(0, 28) + ''}
                        {this.props.author}
                      </h5>
                      <span className="contentText mb-5">
                        <p>
                          <small>{this.props.author}</small>
                        </p>
                        {/*.replace(/(<([^>]+)>)/ig,"")
                   設定內容字串，replace HTML 標籤，且只取前100個字，並加上'.......' */}
                        {this.props.cardText
                          .replace(/(<([^>]+)>)/gi, '')
                          .substr(0, 120) + '......'}
                        <ReadMore className="" sid={this.props.sid} />
                      </span>
                      <div className="btn-mygroup d-flex align-items-end justify-content-end bottomBtn">
                        {/* <ArticleMark onClick={this.props.handleMark} />
                        <ArticleShare /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleCard
