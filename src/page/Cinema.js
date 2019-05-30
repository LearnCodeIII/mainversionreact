import React from 'react'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import ButtonCity from '../component/cinema/ButtonGroup/ButtonCity'
import ButtonType from '../component/cinema/ButtonGroup/ButtonType'
import TitleKaga from '../component/cinema/TitleKaga'
//撈目前已登陸的會員資料
const memberId = sessionStorage.getItem('memberId')
class Cinema extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AllCinemaData: [],
      memberThisData: '',
      CinemaCardData: [],
      CitySearchText: [
        '台北',
        '新北',
        '桃園',
        '新竹',
        '苗栗',
        '台中',
        '彰化',
        '雲林',
        '南投',
        '嘉義',
        '台南',
        '高雄',
        '屏東',
        '宜蘭',
        '花蓮',
        '台東',
      ],
      TypeSearchText: ['gallery', 'bar', 'restaurant', 'theater', 'cafe'],
      MiddleCData: [],
    }
  }

  // 在元件完成載入時fetch cinema的資料撈進來丟到state
  // cinema.json的資料為
  async componentDidMount() {
    try {
      const resCinema = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataCinema = await resCinema.json()
      this.setState({ AllCinemaData: dataCinema })
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
      this.setState({ memberThisData: memberThisData })
      // 製作小卡專用資料
      // 收藏資料放在會員裡面 所以去裡面找到相關資料
      const CinemaCardData = dataCinema.map(item => ({
        key: item.id,
        id: item.id,
        title: item.cinemaName,
        subtitle: item.cinemaCity + '/' + item.cinemaArea,
        img: item.cinemaHeroImg,
        // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
        link: '/cinema/' + item.id,
        star: item.cinemaStar,
        type: item.cinemaType, //搜尋用
        area: item.cinemaCity, //搜尋用
        // 如果沒登陸就給他空字串防止跳錯
        collection: memberId
          ? memberThisData.collectCinema.find(item1 => item1 === item.id)
            ? 'true'
            : 'false'
          : [],
      }))
      this.setState({ CinemaCardData: CinemaCardData })
    } catch (err) {
      console.log(err)
    }
  }

  collectionClickMovie = async (id, val) => {
    // 找到符合id的這比電影資料
    let newCollectionData = []
    if (val === 'false') {
      // 如果回傳是false 等等要裝進去的資料就是拿掉此影片以外的所有收藏id
      newCollectionData = this.state.memberThisData.collectCinema.filter(
        item => item !== id
      )
    } else {
      // 如果回傳是true 就加上去
      newCollectionData = [...this.state.memberThisData.collectCinema, id]
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
      collectFilm: this.state.memberThisData.collectFilm,
      collectCinema: newCollectionData,
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
    console.log(jsonObject)
    // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    const CinemaCardData = this.state.CinemaCardData.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      link: item.link,
      star: item.star,
      // 如果id是回傳的id 代表要改的就是這筆！！  讓他吃val的值  其他筆就照舊吧
      collection: item.id === id ? val : item.collection,
    }))
    await this.setState({
      CinemaCardData: CinemaCardData,
      memberThisData: NewMemberData,
    })
  }

  CitySearchClick = async (changeText, plusDel) => {
    let north = ['台北', '新北', '桃園', '新竹']
    let middle = ['苗栗', '台中', '彰化', '雲林', '南投']
    let Southern = ['嘉義', '台南', '高雄', '屏東']
    let east = ['宜蘭', '花蓮', '台東']

    //先複製一份目前的出來
    let newChangeText = this.state.CitySearchText

    if (plusDel === 'allplus') {
      await this.setState({
        CitySearchText: north.concat(east, Southern, middle),
      })
    }
    if (plusDel === 'alldel') {
      await this.setState({ CitySearchText: [] })
    }
    if (plusDel === 'plus') {
      if (changeText === '北部') {
        await this.setState({ CitySearchText: newChangeText.concat(north) })
      }
      if (changeText === '中部') {
        await this.setState({ CitySearchText: newChangeText.concat(middle) })
      }
      if (changeText === '南部') {
        await this.setState({ CitySearchText: newChangeText.concat(Southern) })
      }
      if (changeText === '東部') {
        await this.setState({ CitySearchText: newChangeText.concat(east) })
      }
    }
    if (plusDel === 'del') {
      if (changeText === '北部') {
        for (let i = 0; i < north.length; i++) {
          newChangeText = newChangeText.filter(item => item !== north[i])
          await this.setState({ CitySearchText: newChangeText })
        }
      }
      if (changeText === '中部') {
        for (let i = 0; i < middle.length; i++) {
          newChangeText = newChangeText.filter(item => item !== middle[i])
          await this.setState({ CitySearchText: newChangeText })
        }
      }
      if (changeText === '南部') {
        for (let i = 0; i < Southern.length; i++) {
          newChangeText = newChangeText.filter(item => item !== Southern[i])
          await this.setState({ CitySearchText: newChangeText })
        }
      }
      if (changeText === '東部') {
        for (let i = 0; i < east.length; i++) {
          newChangeText = newChangeText.filter(item => item !== east[i])
          await this.setState({ CitySearchText: newChangeText })
        }
      }
    }

    let MiddleCData = []
    // 跟城市關鍵字比對
    for (let i = 0; i < this.state.CitySearchText.length; i++) {
      let a = this.state.AllCinemaData.filter(
        item => item.cinemaCity === this.state.CitySearchText[i] + '市'
      )
      // 他會跑很多次...如果item抓到長度不是0的代表裡面有值就新增進MiddleCData 最後把陣列裡面的陣列都展開
      if (a.length !== 0) {
        MiddleCData = [...MiddleCData, a].flat()
      }
    }

    //如果是這邊要先pushtype的再刪掉city的
    //反之如果是city那邊就要先pushcity再刪掉type的
    let newData = []
    for (let i = 0; i < this.state.TypeSearchText.length; i++) {
      let b = MiddleCData.filter(item => {
        return item.cinemaType === this.state.TypeSearchText[i]
      })
      // 他會跑很多次...如果item抓到長度不是0的代表裡面有值就新增進MiddleCData
      if (b.length !== 0) {
        newData = [...newData, b].flat()
      }
    }

    // 然後把比對完的資料做成card格式
    const newCinemaCardData = []
    await newData.map(item =>
      newCinemaCardData.push({
        key: item.id,
        id: item.id,
        title: item.cinemaName,
        subtitle: item.cinemaCity + '/' + item.cinemaArea,
        img: item.cinemaHeroImg,
        link: '/cinema/' + item.id,
        star: item.cinemaStar,
        type: item.cinemaType,
        area: item.cinemaCity,
        collection: memberId
          ? this.state.memberThisData.collectCinema.find(
              item1 => item1 === item.id
            )
            ? 'true'
            : 'false'
          : [],
      })
    )
    await this.setState({ CinemaCardData: newCinemaCardData })
  }

  TypeSearchClick = async (changeText, plusDel) => {
    //先複製一份目前的出來
    let newChangeText = this.state.TypeSearchText

    if (plusDel === 'allplus') {
      await this.setState({
        TypeSearchText: ['gallery', 'bar', 'restaurant', 'theater', 'cafe'],
      })
    }
    if (plusDel === 'alldel') {
      await this.setState({ TypeSearchText: [] })
    }
    if (plusDel === 'plus') {
      if (changeText === '藝廊') {
        await this.setState({
          TypeSearchText: [...this.state.TypeSearchText, 'gallery'],
        })
      }
      if (changeText === '酒吧') {
        await this.setState({
          TypeSearchText: [...this.state.TypeSearchText, 'bar'],
        })
      }
      if (changeText === '餐廳') {
        await this.setState({
          TypeSearchText: [...this.state.TypeSearchText, 'restaurant'],
        })
      }
      if (changeText === '影院') {
        await this.setState({
          TypeSearchText: [...this.state.TypeSearchText, 'theater'],
        })
      }
      if (changeText === '咖啡廳') {
        await this.setState({
          TypeSearchText: [...this.state.TypeSearchText, 'cafe'],
        })
      }
    }
    if (plusDel === 'del') {
      if (changeText === '藝廊') {
        await this.setState({
          TypeSearchText: newChangeText.filter(item => item !== 'gallery'),
        })
      }
      if (changeText === '酒吧') {
        await this.setState({
          TypeSearchText: newChangeText.filter(item => item !== 'bar'),
        })
      }
      if (changeText === '餐廳') {
        await this.setState({
          TypeSearchText: newChangeText.filter(item => item !== 'restaurant'),
        })
      }
      if (changeText == '影院') {
        await this.setState({
          TypeSearchText: newChangeText.filter(item => item !== 'theater'),
        })
      }
      if (changeText === '咖啡廳') {
        await this.setState({
          TypeSearchText: newChangeText.filter(item => item !== 'cafe'),
        })
      }
    }

    // 拿完整的資料跟剛放上state的文字做比對
    // let newCinemaData = []

    let MiddleCData = []
    // 跟城市關鍵字比對
    for (let i = 0; i < this.state.CitySearchText.length; i++) {
      let a = this.state.AllCinemaData.filter(
        item => item.cinemaCity === this.state.CitySearchText[i] + '市'
      )
      // 他會跑很多次...如果item抓到長度不是0的代表裡面有值就新增進MiddleCData 最後把陣列裡面的陣列都展開
      if (a.length !== 0) {
        MiddleCData = [...MiddleCData, a].flat()
      }
    }

    //如果是這邊要先pushtype的再刪掉city的
    //反之如果是city那邊就要先pushcity再刪掉type的
    let newData = []
    for (let i = 0; i < this.state.TypeSearchText.length; i++) {
      let b = MiddleCData.filter(item => {
        return item.cinemaType === this.state.TypeSearchText[i]
      })
      // 他會跑很多次...如果item抓到長度不是0的代表裡面有值就新增進MiddleCData
      if (b.length !== 0) {
        newData = [...newData, b].flat()
      }
    }

    // 然後把比對完的資料做成card格式
    const newCinemaCardData = []
    await newData.map(item =>
      newCinemaCardData.push({
        key: item.id,
        id: item.id,
        title: item.cinemaName,
        subtitle: item.cinemaCity + '/' + item.cinemaArea,
        img: item.cinemaHeroImg,
        link: '/cinema/' + item.id,
        star: item.cinemaStar,
        type: item.cinemaType,
        area: item.cinemaCity,
        collection: memberId
          ? this.state.memberThisData.collectCinema.find(
              item1 => item1 === item.id
            )
            ? 'true'
            : 'false'
          : [],
      })
    )
    await this.setState({ CinemaCardData: newCinemaCardData })
  }
  render() {
    return (
      <>
        <ActivitySection
          pictureSrc="http://localhost:3000/images/cinemaImg/cinemaSearch.jpg"
          bigSlogan="為每位影人找尋落腳角落"
          midSlogan="探詢簡潔優雅的閱聽地點"
          smallSlogan="開始瀏覽"
        />
        <div className="row justify-content-center">
          <div
            className=" d-flex flex-wrap col-lg-10"
            style={{
              height: '100%',
              weight: '100%',
              overflow: 'hidden',
            }}
          >
            <div className="col-12" style={{ height: '30px' }} />
            <div className="col-12 d-flex flex-column mt-4">
              <div className="ml-3 my-3">
                <TitleKaga title="篩選資訊" />
              </div>
              <div className="col d-flex align-items-center my-4">
                <h4 className="col-1">地區</h4>
                <ButtonCity CitySearchClick={this.CitySearchClick} />
              </div>
              <div className="col d-flex align-items-center mb-3">
                <h4 className="col-1">類型</h4>
                <ButtonType TypeSearchClick={this.TypeSearchClick} />
              </div>
            </div>
            <div className="col-12" style={{ height: '30px' }} />
            {memberId
              ? this.state.CinemaCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost:3000/images/cinemaImg/' + item.img}
                    link={item.link}
                    collectionIcon
                    collectionClick={this.collectionClickMovie}
                    collection={item.collection} //判斷初始狀態是否為已收藏 收藏資料都放在會員的json裡面
                    starIcon
                    star={item.star}
                    AVGStar
                  />
                ))
              : this.state.CinemaCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost:3000/images/cinemaImg/' + item.img}
                    link={item.link}
                    starIcon
                    star={item.star}
                    AVGStar
                  />
                ))}
          </div>
        </div>
      </>
    )
  }
}
export default Cinema
