import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import ArticleCard from '../component/article/ArticleList'
import ArticleSlider from '../component/article/ArticleList/ArticleSlider/ArticleSlider'
// import ContactForm from '../component/article/ArticleMail/send'

const memberId = sessionStorage.getItem('memberId')

class Article extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '專業的影評人分析與影視消息',
      midSlogan: '汲取新知與品味。',
      smallSlogan: '開始瀏覽',
      heroSectionPic: 'https://cdn.hipwallpaper.com/i/3/95/r4wFeW.jpg',
      articleData: [], //content  sid author
      pagination: 0, //int
      viewCounter: 0,
      SliderData: [],
    }
    this.byNew = this.byNew.bind(this)
    this.byHot = this.byHot.bind(this)
  }

  async componentDidMount() {
    try {
      // 倒入文章資訊
      const res = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      // 該頁的文章為  第1~5
      const articleData = data.slice(0, 7)
      const SliderData = data.slice(0, 6)

      // 全部資料的長度除以 per page 並且無條件進位
      const paginationData = Math.ceil(data.length / 5)
      console.log('pages:' + paginationData)
      this.setState({ articleData: articleData })
      this.setState({ SliderData: SliderData })
      this.setState({ pagination: paginationData })
    } catch (err) {
      console.log(err)
    }
  }
  byNew() {
    const byNewArray = this.state.articleData.reverse()
    console.log(byNewArray)
    this.setState({ articleData: byNewArray })
  }

  byHot() {
    let byHotArray = this.state.articleData.sort(function(a, b) {
      return b.viewCounter - a.viewCounter
    })
    this.setState({ articleData: byHotArray })
  }

  render() {
    // if (this.state.articleData.markId === undefined) {
    //   return <></>
    // }
    return (
      <>
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivitySection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
              />
              {/* <ArricleList image={this.state.imgSrc}/> */}
            </div>
          </div>
          <Row className="pt-3 my-4 ml-5 pl-5">
            <div className="mx-3 text-center border-bottom border-light">
              <h4 className="text-light">.Movieee精選</h4>
            </div>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={11}>
              <ArticleSlider SliderData={this.state.SliderData} />
            </Col>
          </Row>
          <div className="mycontainer">
            {/* <ContactForm /> */}
            <Row className="mb-4 ml-5 pl-5">
              <div
                className="mx-3 text-center border-bottom border-light"
                onClick={this.byNew}
              >
                <h4 className="text-light">最新消息</h4>
              </div>
              <div
                className="mx-3 text-center border-bottom border-light"
                onClick={this.byHot}
              >
                <h4 className="text-light">熱門文章</h4>
              </div>
              {/* <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">影評專欄</h4>
              </div> */}
            </Row>

            <Row>
              {/* articleData = 最初設定的state名稱 */}
              {this.state.articleData.map(element => (
                <>
                  {/* {console.log(element.memberInfo.collectArticle)} */}
                  {/* {console.log(this.state.memberInfo[1])} */}
                  {console.log('info')}
                  {console.log(this.state.articleData.author)}
                  {/* {console.log(element.markId.find(item => item === memberId))} */}
                  <ArticleCard
                    key={element.id}
                    // 需再設定一個值給Link
                    sid={element.id}
                    author={element.author}
                    cardImg={'/images/article/' + element.image}
                    cardTitle={element.title}
                    cardText={element.content}
                    handleMark={this.handleMark}
                  />
                </>
              ))}
            </Row>

            {/* <Row className="justify-content-center">
              <Pagination totalPages={this.state.pagination} />
            </Row> */}
          </div>
        </div>
      </>
    )
  }
}

export default Article
