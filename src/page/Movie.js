import React from 'react'
import MovieSection from '../component/movie/MovieSection/MovieSection'
import MovieTitle from '../component/movie/MovieTitle/MovieTitle'
import MovieSearchbarTitle from '../component/movie/MovieSearchbar/MovieSearchbarTitle'
import MovieSearchbarContent from '../component/movie/MovieSearchbar/MovieSearchbarContent'
import MovieSearchbarInput from '../component/movie/MovieSearchbar/MovieSearchbarInput'
import MovieCard from '../component/movie/MovieCard/MovieCard'

class Movie extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '耐人尋味，細細品嚐',
      midSlogan: '探索不一樣的小城故事',
      smallSlogan: '尋找好片',
      heroSectionPic:
        'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
      title: ['活動列表'],
      movieCardData: [],
      movieCardDataResult: 0,
      searchbarRegion: ['全部', '北部', '中部', '南部', '東部'],
      searchbarType: [
        '全部',
        '動作片',
        '動畫片',
        '喜劇片',
        '偵探片',
        '紀錄片',
        '戲劇片',
        '英雄片',
        '恐怖片',
        '武俠片',
        '靈異片',
        '文藝片',
        '警匪片',
        '科幻片',
        '懸疑片',
        '驚悚片',
        '戰爭片',
        '愛情片',
      ],
      searchbarRegionState: ['active', '', '', '', ''],
      searchbarTypeState: [
        'active',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      searchText: '',
      collectMovie: '',
    }
  }

  async componentDidMount() {
    try {
      this.setState({ movieCardDataResult: 1 })
      const res = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ movieCardData: data })
    } catch (err) {
      console.log(err)
    }

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
        const data = await res.json()
        this.setState({ collectMovie: data.collectMovie })
      } catch (err) {
        console.log(err)
      }
    }
  }

  searchbarOnClick = async (id, searchName, searchKeyWord) => {
    this.setState({ movieCardDataResult: 1 })
    let data = []
    switch (searchName) {
      case 'searchbarRegion':
        data = ['', '', '', '', '']
        data[id] === '' ? (data[id] = 'active') : (data[id] = '')
        this.setState({ searchbarRegionState: data })
        break
      case 'searchbarType':
        data = [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ]
        data[id] === '' ? (data[id] = 'active') : (data[id] = '')
        this.setState({ searchbarTypeState: data })
        break
      default:
        break
    }
    try {
      const res = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      let data = await res.json()

      // console.log(searchKeyWord)
      switch (searchKeyWord) {
        case '動作片':
          data = data.filter((el, id) => el['type'].indexOf('動作片') >= 0)
          break
        case '動畫片':
          data = data.filter((el, id) => el['type'].indexOf('動畫片') >= 0)
          break
        case '喜劇片':
          data = data.filter((el, id) => el['type'].indexOf('喜劇片') >= 0)
          break
        case '偵探片':
          data = data.filter((el, id) => el['type'].indexOf('偵探片') >= 0)
          break
        case '紀錄片':
          data = data.filter((el, id) => el['type'].indexOf('紀錄片') >= 0)
          break
        case '戲劇片':
          data = data.filter((el, id) => el['type'].indexOf('戲劇片') >= 0)
          break
        case '學校':
          data = data.filter((el, id) => el['type'].indexOf('學校') >= 0)
          break
        case '英雄片':
          data = data.filter((el, id) => el['type'].indexOf('英雄片') >= 0)
          break
        case '恐怖片':
          data = data.filter((el, id) => el['type'].indexOf('恐怖片') >= 0)
          break
        case '武俠片':
          data = data.filter((el, id) => el['type'].indexOf('武俠片') >= 0)
          break
        case '靈異片':
          data = data.filter((el, id) => el['type'].indexOf('靈異片') >= 0)
          break
        case '文藝片':
          data = data.filter((el, id) => el['type'].indexOf('文藝片') >= 0)
          break
        case '警匪片':
          data = data.filter((el, id) => el['type'].indexOf('警匪片') >= 0)
          break
        case '科幻片':
          data = data.filter((el, id) => el['type'].indexOf('科幻片') >= 0)
          break
        case '懸疑片':
          data = data.filter((el, id) => el['type'].indexOf('懸疑片') >= 0)
          break
        case '驚悚片':
          data = data.filter((el, id) => el['type'].indexOf('驚悚片') >= 0)
          break
        case '戰爭片':
          data = data.filter((el, id) => el['type'].indexOf('戰爭片') >= 0)
          break
        case '愛情片':
          data = data.filter((el, id) => el['type'].indexOf('愛情片') >= 0)
          break
        default:
          break
      }
      if (data.length === 0) {
        this.setState({ movieCardDataResult: 0 })
        this.setState({ searchbarRegionState: ['active', '', '', '', ''] })
        this.setState({
          searchbarTypeState: [
            'active',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ],
        })
        // this.searchbarOnClick(0,searchName,"全部")
      }
      this.setState({ searchText: '' })
      console.log(data)
      console.log(typeof data)
      this.setState({ movieCardData: data })
    } catch (err) {
      console.log(err)
    }
  }
  SearchBarOnChange = async event => {
    const searchText = event.target.value
    this.setState({ searchText: searchText })
  }
  SearchBarOnKeyDown = async event => {
    const searchText = event.target.value
    this.setState({ searchText: searchText })
    if (event.which === 13) {
      this.setState({ movieCardDataResult: 1 })
      try {
        const res = await fetch('http://localhost:5555/movieCardData', {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        let data = await res.json()
        data = data.filter(
          item =>
            item.theater.indexOf(searchText) > -1 ||
            item.title.indexOf(searchText) > -1
        )
        if (data.length === 0) {
          this.setState({ movieCardDataResult: 0 })
          this.setState({ searchbarRegionState: ['active', '', '', '', ''] })
          this.setState({
            searchbarTypeState: [
              'active',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
          })
        }
        this.setState({ movieCardData: data })
      } catch (err) {
        console.log(err)
      }
    }
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
        <div className="container-fluid position-relative">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieSection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
                section={'#test'}
                pagename={'/movie'}
                pageid={'#search'}
              />
            </div>
          </div>
          <div
            className="position-absolute"
            id="search"
            style={{ bottom: '72px' }}
          />
        </div>
        <div className="container-fluid fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-md-12 p-0 fix-inline-content">
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <MovieSearchbarTitle spanClass="mr-5 w-100" title={'類型'} />
                </div>
                <div>
                  {this.state.searchbarType.map((data, id) => (
                    <MovieSearchbarContent
                      className={this.state.searchbarTypeState[id]}
                      handleOnClick={() =>
                        this.searchbarOnClick(id, 'searchbarType', data)
                      }
                      content={data}
                    />
                  ))}
                </div>
              </div>
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <MovieSearchbarTitle spanClass="mr-4" title={'關鍵字'} />
                </div>
                <div>
                  <MovieSearchbarInput
                    value={this.state.searchText}
                    placeholder="請輸入關鍵字"
                    handleOnChange={this.SearchBarOnChange}
                    handleOnKeyDown={this.SearchBarOnKeyDown}
                  />
                </div>
              </div>
            </div>
            {this.state.movieCardDataResult === 0 ? (
              <div className="col-md-12 p-0">
                <div className="text-center">
                  <button
                    onClick={() => this.searchbarOnClick('清空')}
                    className="btn btn-warning"
                  >
                    沒有符合此條件的活動，請重新搜尋
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
            {this.state.movieCardData.map(data => (
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

export default Movie
