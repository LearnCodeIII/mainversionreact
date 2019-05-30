import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import MovieCard from '../component/movie/MovieCard/MovieCard'
import MovieTable from '../component/movie/MovieTable/MovieTable'
import MovieTitle from '../component/movie/MovieTitle/MovieTitle'
import MovieSearchbar from '../component/movie/MovieSearchbar/MovieSearchbar'
import MovieItemThing from '../component/movie/MovieItems/MovieItemThing'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
// import MovieCardCnt from '../component/movie/MovieCardCnt/MovieCardCnt';

//撈目前已登陸的會員資料
const memberId = sessionStorage.getItem('memberId')

class Movie extends React.Component {
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
      memberThisData: '',
      FilmCardData: [],
    }
  }

  async componentDidMount() {
    //  filmData
    try {
      const resFilm = await fetch('http://localhost:5555/filmData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const filmdata = await resFilm.json()
      this.setState({ filmData: filmdata })

      // 撈出目前登錄的會員得資料
      const resMember = await fetch(
        'http://localhost:5555/member/' + memberId,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const memberThisData = await resMember.json()
      console.log('memberThisData')
      console.log(memberThisData)
      this.setState({ memberThisData: memberThisData })
      // 製作小卡專用資料
      // 收藏資料放在會員裡面 所以去裡面找到相關資料
      const FilmCardData = filmdata.map(item => ({
        key: item.id,
        id: item.id,
        title: item.name_tw,
        subtitle: item.name_en,
        img: item.movie_pic,
        // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
        link: '/movie/' + item.id,
        // 如果沒登陸就給他空字串防止跳錯
        collection: memberId
          ? memberThisData.collectFilm.find(item1 => item1 === item.id)
            ? 'true'
            : 'false'
          : '',
      }))
      this.setState({ FilmCardData: FilmCardData })
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
      this.setState({ movieitemData: movieitemData })
    } catch (err) {
      console.log(err)
    }
  }

  collectionClickMovie = async (id, val) => {
    // 找到符合id的這比電影資料

    let newCollectionData = []
    if (val === 'false') {
      // 如果回傳是false 等等要裝進去的資料就是拿掉此影片以外的所有收藏id
      newCollectionData = this.state.memberThisData.collectFilm.filter(
        item => item != id
      )
    } else {
      // 如果回傳是true 就加上去
      newCollectionData = [...this.state.memberThisData.collectFilm, id]
    }
    const NewMemberData = {
      id: this.state.memberThisData.id,
      name: this.state.memberThisData.name,
      nickname: this.state.memberThisData.nickname,
      gender: this.state.memberThisData.gender,
      mobile: this.state.memberThisData.mobile,
      birth: this.state.memberThisData.birth,
      email: this.state.memberThisData.email,
      pwd: this.state.memberThisData.pwd,
      avatar: this.state.memberThisData.avatar,
      city: this.state.memberThisData.city,
      address: this.state.memberThisData.address,
      fav_type: this.state.memberThisData.fav_type,
      career: this.state.memberThisData.career,
      join_date: this.state.memberThisData.permission,
      permission: this.state.memberThisData.permission,
      collectFilm: newCollectionData,
      collectCinema: this.state.memberThisData.collectCinema,
      collectArticle: this.state.memberThisData.collectArticle,
      collectActivity: this.state.memberThisData.collectActivity,
      collectForum: this.state.memberThisData.collectForum,
      markList: this.state.memberThisData.markList,
    }
    // //蓋回去資料庫
    const response = await fetch('http://localhost:5555/member/' + memberId, {
      method: 'PUT',
      body: JSON.stringify(NewMemberData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const jsonObject = await response.json()

    // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    const FilmCardData = this.state.FilmCardData.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      link: item.link,
      // 如果id是回傳的id 代表要改的就是這筆！！  讓他吃val的值  其他筆就照舊吧
      collection: item.id == id ? val : item.collection,
    }))
    await this.setState({
      FilmCardData: FilmCardData,
      memberThisData: NewMemberData,
    })
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

            {/* 搜尋列和電影類別 */}
            <div className="col-12 p-0 container">
              <div className=" p-0">
                <MovieTitle title={this.state.moviesearchttl} />
              </div>
              {this.state.movieitemData.map(item => (
                <MovieItemThing
                  movieitemttl={item.itemTtlTxt}
                  movieitem={item.itemTxt}
                />
              ))}
              <div className="col-3">
                <MovieSearchbar />
              </div>
            </div>

            {/* 電影列表卡片 */}
            <div className="col-12 container justify-content-center">
              <div className=" p-0">
                <MovieTitle title={this.state.movietitle} />
              </div>
              <div className="p-0 d-flex ">
                {memberId
                  ? this.state.FilmCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={'http://localhost:3000/images/' + item.img}
                        link={item.link}
                        collectionIcon
                        collectionClick={this.collectionClickMovie}
                        collection={item.collection} //判斷初始狀態是否為已收藏 收藏資料都放在會員的json裡面
                        star={item.cinemaStar}
                      />
                    ))
                  : this.state.FilmCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={'http://localhost:3000/images/' + item.img}
                        link={item.link}
                      />
                    ))}
              </div>
            </div>

            {/* 資訊表格 */}
            <div className="row">
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
            </div>
            <div className="row">
              <div className="col-md-12 p-0">
                <MovieTitle title={this.state.MovieCardCntTtl} />
              </div>

              {/* <div className="col-md-12 p-2">
                 {this.state.filmData.map(element => (

                <MovieCardCnt
                moviedata={tableData}
                moviedata={this.state.filmData}
                    key={element.id}
                    id={element.id}
    title={element.name_tw}
    subtitle={element.name_en}
    img={ 'http://localhost:3000/images/' + element.movie_pic}
    link={'/movie/' + element.id}
    ollectionClick={this.handleClick}
    
     />
                
                ))}
                
               
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Movie
