import React from 'react'
import { Row, Col } from 'react-bootstrap'
import MovieTitle from '../component/movie/MovieTitle/MovieTitle'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import MovieCard from '../component/movie/MovieCard/MovieCard'
import ArticleSlider from '../component/movie/MovieSlider/ArticleList/ArticleSlider/ArticleSlider'

class MovieInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      movietitle: '找尋電影',
      movieListtitle: '影片清單',
      moviesearchttl: '搜尋影片',
      MovieCardCntTtl: '詳細資訊',
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動。',
      smallSlogan: '開始找尋',
      heroSectionPic: 'http://localhost:3000/images/filmbg.png',
      filmData: [],
      tableData: [],
      // tableTtlTxt: [{}],
      // tableData: [{}],
      movietableData: [],
      movieitemData: [],
    }
  }

  async componentDidMount() {
    //  filmData
    try {
      const res = await fetch('http://localhost:5555/filmData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const filmdata = await res.json()
      // console.log(filmdata)
      this.setState({ filmData: filmdata })
    } catch (err) {
      console.log(err)
    }

    //  tableData
    try {
      const res2 = await fetch('http://localhost:5555/movietableData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const movietableData = await res2.json()
      console.log(movietableData)
      this.setState({ movietableData: movietableData })
    } catch (err) {
      console.log(err)
    }

    //  movieitemData
    try {
      const res3 = await fetch('http://localhost:5555/movieitemData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const movieitemData = await res3.json()
      console.log(movieitemData)
      this.setState({ movieitemData: movieitemData })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        {/* 看版圖 */}
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12 p-0 ">
              <ActivitySection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
              />
            </div>

            {/* 內文卡片 */}
            {/* <div className="row">
              <div className="col-md-12 p-0">
                <MovieTitle title={this.state.MovieCardCntTtl} />
              </div>
            </div> */}

            {/*  滑動圖片劇照 */}
            <Row className="justify-content-md-center">
              <Col md={11}>
                <ArticleSlider SliderData={this.state.filmdata} />
              </Col>
            </Row>

            {/* 電影列表卡片 */}
            <div className="col-12 container justify-content-center">
              <div className=" p-0">
                <MovieTitle title={this.state.movietitle} />
              </div>
              <div className="p-0 d-flex ">
                {this.state.filmData.map(element => (
                  <MovieCard
                    key={element.id}
                    id={element.id}
                    title={element.name_tw}
                    subtitle={element.name_en}
                    img={'http://localhost:3000/images/' + element.movie_pic}
                    link={'/movie/' + element.id}
                    collectionIcon
                    collection={true / false}
                    ollectionClick={this.handleClick}
                  />
                ))}
              </div>
            </div>

            {/* 推薦電影列表卡片 */}
            <div className="col-12 container justify-content-center">
              <div className=" p-0">
                <MovieTitle title={this.state.movietitle} />
              </div>
              <div className="p-0 d-flex ">
                {this.state.filmData.map(element => (
                  <MovieCard
                    key={element.id}
                    id={element.id}
                    title={element.name_tw}
                    subtitle={element.name_en}
                    img={'http://localhost:3000/images/' + element.movie_pic}
                    link={'/movie/' + element.id}
                    collectionIcon
                    collection={true / false}
                    ollectionClick={this.handleClick}
                  />
                ))}
              </div>
            </div>

            {/* 資訊表格 */}
            {/* <div className="row">
              <div className="col-md-12 p-0">
                <MovieTitle title={this.state.movieListtitle} />
              </div>
              <div className="col-md-12 p-2">
                {this.state.movietableData.map(items => (
                  <MovieTable
                    title={items.tableTtlTxt}
                    data={items.tableData}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </>
    )
  }
}

export default MovieInfo
