import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './article.css'
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaEye,
  FaRegBookmark,
} from 'react-icons/fa'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ReadMore from './ArticleList/ArticleButton/ReadMore'

const memberId = sessionStorage.getItem('memberId')

class ArticleCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberAllData: [],
      memberInfo: [],
    }
    this.handleClick = this.handleClick.bind(this)
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
        this.setState({ memberAllData: memberData })
        this.setState({ memberInfo: memberInfo })
      } catch (err) {
        console.log(err)
      }
    }
  }

  handleClick = async () => {
    // alert('1324')
    if (memberId) {
      console.log(this.state.memberAllData)
      // var newMark = []
      var newMark = [...this.state.memberInfo]

      // const Marked = newMark.find(item => item === this.state.thisId)

      this.setState({ isMarked: !this.state.isMarked })

      if (this.state.isMarked) {
        newMark = newMark.filter(element => {
          return element !== this.props.sid
        })
      } else {
        newMark = [this.props.sid, ...this.state.memberInfo]
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
        this.setState({ memberInfo: newMarkA })
        console.log(newMarkData)
        console.log('Aid:')
        console.log(newMarkA)
        // fetch新資料後的判斷渲染套餐(收藏)
        // const MarkYN

        // this.shouldComponentUpdate()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('請先登入會員')
    }
  }
  render() {
    return (
      <>
        <Row className="my-3 articleCard justify-content-center">
          <Col className="justify-content-center" xs={12} md={11}>
            <div className="mb-3 article-card">
              {this.state.memberInfo.find(item => item === this.props.sid) ? (
                <div type="" className="">
                  <FaBookmark
                    className="mr-1 righ-mark text-warning"
                    onClick={this.handleClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              ) : (
                <div type="" className="">
                  <FaRegBookmark
                    className="mr-1 righ-mark shadowBtn"
                    onClick={this.handleClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}

              <div className="row no-gutters d-flex cardWrap">
                <div className="col-md-4 article_pic d-flex justify-content-center">
                  <img
                    src={this.props.cardImg}
                    className="img56 card-img"
                    alt="..."
                  />
                  <div className="bigDarkBG" />
                </div>

                <div className="col-md-8">
                  <Link to={'/article/' + this.props.sid} className="link-a">
                    <div className="card-body d-flex row mt-4 mx-4 px-2">
                      <h5 className="card-title">
                        {/* 設定標題字串只取前28個字 */}
                        {this.props.cardTitle.substr(0, 24) + ''}
                      </h5>
                      <span className="contentText mb-5">
                        <p className="">
                          <small className="mr-4">{this.props.author}/文</small>
                          <small>{this.props.date}</small>
                          <small className="mx-4">
                            <FaEye className="mx-1" />
                            {this.props.viewCounter}
                          </small>
                        </p>
                        {/*.replace(/(<([^>]+)>)/ig,"")
                   設定內容字串，replace HTML 標籤，且只取前100個字，並加上'.......' */}
                        {this.props.cardText
                          .replace(/(<([^>]+)>)/gi, '')
                          .substr(0, 120) + '......'}
                        <ReadMore
                          className="link_orange"
                          sid={this.props.sid}
                        />
                      </span>
                      <div className="btn-mygroup d-flex align-items-end justify-content-end bottomBtn">
                        {/* <ArticleMark onClick={this.props.handleMark} />
                        <ArticleShare /> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleCard
