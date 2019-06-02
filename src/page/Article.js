import React from 'react'
import ArticleSection from '../component/article/ArticleSection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import ArticleCard from '../component/article/ArticleCard'
import ArticleSlider from '../component/article/ArticleList/ArticleSlider/ArticleSlider'
import { async } from 'q'
// import ContactForm from '../component/article/ArticleMail/send'

const memberId = sessionStorage.getItem('memberId')
var data

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
      width: 0,
      inputText: '',
      isSeached: true,
    }
    this.byNew = this.byNew.bind(this)
    this.byHot = this.byHot.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleScrollToElement = this.handleScrollToElement.bind(this)
    this.myRef = React.createRef()
  }

  async componentDidMount() {
    // 偵聽視窗寬度
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    try {
      // 倒入文章資訊
      const res = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      data = await res.json()
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

  // 偵聽寬度
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  byNew() {
    const byNewArray = data.reverse()
    console.log(byNewArray)
    this.setState({ articleData: byNewArray })
  }

  byHot() {
    let byHotArray = data.sort(function(a, b) {
      return b.viewCounter - a.viewCounter
    })
    this.setState({ articleData: byHotArray })
  }

  // --------------------------------搜尋套餐--------------------------------
  handleSearch = event => {
    const search = document.querySelector('#articleSerch').value
    // alert(search)
    console.log(search)
    const searchContent = data.filter(
      item => item.content.includes(search) || item.title.includes(search)
    )

    if (searchContent.length !== 0) {
      // addElement()
      this.setState({
        // 將右半邊顯示
        articleData: searchContent,
        isSeached: true,
      })
      // 重新渲染畫面
      // this.setState({ listdataReverse: serchResultArray })
      // await this.setState({
      //   nowIDdata: this.state.listdataReverse[0],
      //   currentcommentApi: this.state.listdataReverse[0].forumCommentArea,
      // })
    } else {
      this.setState({
        isSeached: false,
      })
    }
  }

  // 捲動套餐

  handleScrollToElement() {
    window.scrollTo(0, this.myRef.current.offsetTop)
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
              <ArticleSection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
                // pagename={'/article'}
                handleScrollToElement={this.handleScrollToElement}
              />
              {/* <ArricleList image={this.state.imgSrc}/> */}
            </div>
          </div>
          {this.state.width < 1024 ? (
            ''
          ) : (
            <>
              <Row className="px-5">
                <div
                  className="col-md-11 d-flex mt-5 pt-5 mb-3"
                  ref={this.myRef}
                >
                  <h4 className="text-lighttext-center border-bottom border-light">
                    .Movieee精選
                  </h4>
                </div>
              </Row>

              <Row className="justify-content-md-center">
                <Col md={11}>
                  <ArticleSlider
                    SliderData={this.state.SliderData}
                    id="slider"
                  />
                </Col>
              </Row>
            </>
          )}

          <div className="mycontainer">
            {/* <ContactForm /> */}
            <Row className="mb-4 d-flex justify-content-between px-5">
              {/* <Col md={}className=""> */}
              <Col className="d-flex my-2" sm={6} md={'auto'}>
                <div
                  className="text-center border-bottom border-light"
                  onClick={this.byNew}
                >
                  <h4 className="text-light" style={{ cursor: 'pointer' }}>
                    最新消息
                  </h4>{' '}
                </div>
                <div
                  className="mx-3 text-center border-bottom border-light"
                  onClick={this.byHot}
                >
                  <h4 className="text-light" style={{ cursor: 'pointer' }}>
                    熱門文章
                  </h4>
                </div>
                {/* <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">影評專欄</h4>
              </div> */}
              </Col>
              <Col
                sm={6}
                md={'auto'}
                className="my-2 justify-content-start d-flex"
              >
                <div className="input-group pr-4" style={{ width: 360 }}>
                  <input
                    type="text"
                    className="form-control inp_email"
                    placeholder="請輸入關鍵字"
                    id="articleSerch"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn_Subscribe nomarginBtn"
                      onClick={this.handleSearch}
                    >
                      搜尋
                    </button>
                  </div>
                </div>
              </Col>
              {/* </Col> */}
            </Row>

            <Row>
              {this.state.isSeached === true ? (
                <>
                  {this.state.articleData.map(element => (
                    <ArticleCard
                      key={element.index}
                      // 需再設定一個值給Link
                      sid={element.id}
                      cardImg={'/images/article/' + element.image}
                      cardTitle={element.title}
                      date={element.date}
                      author={element.author}
                      cardText={element.content}
                      viewCounter={element.viewCounter}
                      handleClick={this.handleClick}
                    />
                  ))}
                </>
              ) : (
                <Col md={10} className="text-center">
                  找不到相關文章
                </Col>
              )}
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
