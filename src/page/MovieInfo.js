import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MoviePageSection from '../component/movie/MoviePageSection/MoviePageSection'
import MovieTitle from '../component/movie/MovieTitle/MovieTitle'
import MoviePageCard from '../component/movie/MoviePageCard/MoviePageCard'
import MovieContent from '../component/movie/MovieContent/MovieContent'
import MovieQRcode from '../component/movie/MovieQRcode/MovieQRcode'
import MovieCard from '../component/movie/MovieCard/MovieCard'

class MovieInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ['影片資訊', '活動資訊', '相關活動', '相關影片'],
      moviePageData: [],
      moviePageOtherData: [],
      streetView: false,
      collectMovie: '',
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const moviePageData = data.find(
        item => item.id === this.props.match.params.id
      )
      const moviePageOtherData = data.filter(
        item => item.id !== this.props.match.params.id
      )
      console.log(moviePageData)
      this.setState({ moviePageData: moviePageData })
      this.setState({ moviePageOtherData: moviePageOtherData })
      this.setState({ movieHeroImage: moviePageData.imgSrc })
    } catch (err) {
      console.log(err)
    }

    const memberId = sessionStorage.getItem('memberId')
    try {
      const res = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ collectMovie: data.collectMovie })
    } catch (err) {
      console.log(err)
    }
  }
  handleOnClick = () => {
    this.setState({ moviePageData: [] })
    const res = fetch('http://localhost:5555/movieCardData', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const data = res.json()
    const moviePageData = data.find(
      item => item.id === this.props.match.params.id
    )
    const moviePageOtherData = data.filter(
      item => item.id !== this.props.match.params.id
    )

    console.log(moviePageData)
    this.setState({ moviePageData: moviePageData })
    this.setState({ moviePageOtherData: moviePageOtherData })
    this.setState({ movieHeroImage: moviePageData.imgSrc })
  }
  handleCollect = async id => {
    const memberId = sessionStorage.getItem('memberId')
    if (memberId !== null) {
      try {
        const res = await fetch('http://localhost:5555/member/' + memberId, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        let data = await res.json()
        let isCollect = data.collectMovie.indexOf(id) > -1

        if (isCollect) {
          data.collectMovie = data.collectMovie
            .split(id)
            .toString()
            .replace(/,/g, '')
        } else {
          data.collectMovie += id
        }
        this.setState({ collectMovie: data.collectMovie })
        try {
          const res = await fetch('http://localhost:5555/member/' + memberId, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
          console.log('修改完成')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <MoviePageSection
                theater={this.state.moviePageData.theater}
                title={this.state.moviePageData.title}
                content={this.state.moviePageData.content}
                HeroImage={this.state.moviePageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              <MoviePageCard
                theater={this.state.moviePageData.theater}
                theaterMap={this.state.moviePageData.theaterMap}
                phone={this.state.moviePageData.phone}
                GUINumber={this.state.moviePageData.GUINumber}
                website={this.state.moviePageData.website}
                email={this.state.moviePageData.email}
                imgSrc={this.state.moviePageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle
                title={this.state.title[1]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-9 mt-5">
              <MovieContent
                theater={this.state.moviePageData.theater}
                title={this.state.moviePageData.title}
                theaterMap={this.state.moviePageData.theaterMap}
                content={this.state.moviePageData.content}
                joinContent={this.state.moviePageData.joinContent}
                joinContentCurrentPeople={
                  this.state.moviePageData.joinContentCurrentPeople
                }
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-5">
              <MovieQRcode imgSrc={window.location.href} />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle
                title={this.state.title[2]}
                className="content-title"
              />
            </div>
            {this.state.moviePageOtherData.map(data => (
              <div className="col-12 col-sm-12 col-md-6 col-lg-2 mt-5">
                {sessionStorage.getItem('memberId') !== null ? (
                  <MovieCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={data.imgSrc}
                    collectOpen
                    isCollect={
                      this.state.collectMovie.indexOf(data.id) > -1
                        ? true
                        : false
                    }
                  />
                ) : (
                  <MovieCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={data.imgSrc}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default MovieInfo
