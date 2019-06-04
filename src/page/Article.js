import React from 'react'
import ArticleSection from '../component/article/ArticleSection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import ArticleCard from '../component/article/ArticleCard'
import ArticleSlider from '../component/article/ArticleList/ArticleSlider/ArticleSlider'
// import ContactForm from '../component/article/ArticleMail/send'

import Swal from 'sweetalert2'

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
      mbemerAllData: [],
      memberInfo: [],
      isHot: false,
      isNew: false,
    }
    this.byNew = this.byNew.bind(this)
    this.byHot = this.byHot.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleScrollToElement = this.handleScrollToElement.bind(this)
    this.myRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    // 偵聽視窗寬度套餐
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

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
        this.setState({ memberAllData: memberData })
        const memberInfo = memberData.collectArticle
        console.log(memberInfo) //快樂碼農
        this.setState({ memberInfo: memberInfo })
        // if (memberInfo.find(item => item == this.this.props.sid)) {
        //   this.setState({ isMarked: true })
        // } else {
        //   this.setState({ isMarked: false })
        // }
      } catch (err) {
        console.log(err)
      }
    }

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
      const articleData = data.slice(0, 10)
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
    // const byNewArray = data.reverse()

    let byNewArray = data.sort(function(a, b) {
      return (
        Date.parse(new Date(b.date)) / 1000 -
        Date.parse(new Date(a.date)) / 1000
      )
    })

    let byOldArray = data.sort(function(a, b) {
      return (
        Date.parse(new Date(b.date)) / 1000 -
        Date.parse(new Date(a.date)) / 1000
      )
    })
    this.setState({ isNew: !this.state.isNew })
    this.setState({ isHot: false })

    if (this.state.isNew) {
      this.setState({ articleData: byOldArray })
      console.log(byOldArray)
      console.log(this.state.isNew)
    } else {
      this.setState({ articleData: byNewArray })
      console.log(byNewArray)
      console.log(this.state.isNew)
    }

    // Date.parse(new Date(b.date))
  }

  byHot() {
    this.setState({ isNew: false })
    this.setState({ isHot: true })
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

  // 收藏套餐
  handleClick = (id, isMarked) => async () => {
    // alert('1324')
    console.log('================')
    console.log(id)
    if (memberId) {
      console.log(this.state.memberAllData)
      // var newMark = []
      var newMark = [...this.state.memberInfo]

      // const Marked = newMark.find(item => item === this.state.thisId)

      // this.setState({ isMarked: !this.state.isMarked })

      if (isMarked) {
        newMark = await newMark.filter(element => {
          return element !== id
        })
        await this.setState({ memberInfo: newMark })
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        })
        Toast.fire({
          type: 'success',
          title: '已移除收藏!!',
        })
      } else {
        newMark = await [id, ...this.state.memberInfo]
        await this.setState({ memberInfo: newMark })
        console.log(typeof this.state.thisId + ':' + this.state.thisId)
        console.log('false')
        console.log(newMark)
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        })
        Toast.fire({
          type: 'success',
          title: '收藏成功!!',
        })
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
        collectMovie: this.state.memberAllData.collectMovie,
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
        // this.setState({ articleData:  })
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
      Swal.fire({
        // position: 'top-end',
        title: '請先登入會員',
        text: '請點選確認繼續或取消離開',
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
          window.location.href = '/LoginSign'
        }
      })
    }
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
                  {this.state.isNew ? (
                    <h4 className="text-warning" style={{ cursor: 'pointer' }}>
                      最新消息
                    </h4>
                  ) : (
                    <h4 className="text-light" style={{ cursor: 'pointer' }}>
                      最新消息
                    </h4>
                  )}
                </div>
                <div
                  className="mx-4 text-center border-bottom border-light"
                  onClick={this.byHot}
                >
                  {this.state.isHot ? (
                    <h4 className="text-warning" style={{ cursor: 'pointer' }}>
                      熱門文章
                    </h4>
                  ) : (
                    <h4 className="text-light" style={{ cursor: 'pointer' }}>
                      熱門文章
                    </h4>
                  )}
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
                      isMarked={this.state.memberInfo.find(
                        item => item == element.id
                      )}
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
