import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivitySearchbarTitle from '../component/activity/ActivitySearchbar/ActivitySearchbarTitle'
import ActivitySearchbarContent from '../component/activity/ActivitySearchbar/ActivitySearchbarContent'
import ActivitySearchbarInput from '../component/activity/ActivitySearchbar/ActivitySearchbarInput'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import Swal from 'sweetalert2'
class Activity extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動',
      smallSlogan: '3,2,1,Action!',
      heroSectionPic:
        'https://images.unsplash.com/photo-1558953669-e58e1c99995f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
      title: ['活動列表'],
      activityCardData: [],
      activityCardDataResult: 0,
      searchbarRegion: ['全部', '北部', '中部', '南部', '東部'],
      searchbarPlace: ['全部', '影院', '學校', '文創園區', '咖啡廳'],
      searchbarRegionState: ['active', '', '', '', ''],
      searchbarPlaceState: ['active', '', '', '', ''],
      searchText: '',
      collectActivity: '',
    }
  }

  async componentDidMount() {
    try {
      this.setState({ activityCardDataResult: 1 })
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ activityCardData: data })
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
        this.setState({ collectActivity: data.collectActivity })
      } catch (err) {
        console.log(err)
      }
    }
  }

  searchbarOnClick = async (id, searchName, searchKeyWord) => {
    this.setState({ activityCardDataResult: 1 })
    let data = []
    switch (searchName) {
      case 'searchbarRegion':
        data = ['', '', '', '', '']
        data[id] === '' ? (data[id] = 'active') : (data[id] = '')
        this.setState({ searchbarRegionState: data })
        break
      case 'searchbarPlace':
        data = ['', '', '', '', '', '']
        data[id] === '' ? (data[id] = 'active') : (data[id] = '')
        this.setState({ searchbarPlaceState: data })
        break
      default:
        break
    }
    try {
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      let data = await res.json()

      // console.log(searchKeyWord)
      switch (searchKeyWord) {
        case '北部':
          data = data.filter((el, id) => el['place'].indexOf('北部') >= 0)
          break
        case '中部':
          data = data.filter((el, id) => el['place'].indexOf('中部') >= 0)
          break
        case '南部':
          data = data.filter((el, id) => el['place'].indexOf('南部') >= 0)
          break
        case '東部':
          data = data.filter((el, id) => el['place'].indexOf('東部') >= 0)
          break
        case '咖啡廳':
          data = data.filter((el, id) => el['place'].indexOf('咖啡廳') >= 0)
          break
        case '影院':
          data = data.filter((el, id) => el['place'].indexOf('影院') >= 0)
          break
        case '學校':
          data = data.filter((el, id) => el['place'].indexOf('學校') >= 0)
          break
        case '文創園區':
          data = data.filter((el, id) => el['place'].indexOf('文創園區') >= 0)
          break
        default:
          break
      }
      if (data.length === 0) {
        this.setState({ activityCardDataResult: 0 })
        this.setState({ searchbarRegionState: ['active', '', '', '', ''] })
        this.setState({ searchbarPlaceState: ['active', '', '', '', ''] })
        // this.searchbarOnClick(0,searchName,"全部")
      }
      this.setState({ searchText: '' })
      console.log(data)
      console.log(typeof data)
      this.setState({ activityCardData: data })
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
      this.setState({ activityCardDataResult: 1 })
      try {
        const res = await fetch('http://localhost:5555/activityCardData', {
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
          this.setState({ activityCardDataResult: 0 })
          this.setState({ searchbarRegionState: ['active', '', '', '', ''] })
          this.setState({ searchbarPlaceState: ['active', '', '', '', ''] })
        }
        this.setState({ activityCardData: data })
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
        let isCollect = data.collectActivity.indexOf(id) > -1

        if (isCollect) {
          data.collectActivity = data.collectActivity
            .split(id)
            .toString()
            .replace(/,/g, '')
          // alert('已取消收藏')
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: '<span style="color:#d4d1cc">已取消收藏</span>',
            showConfirmButton: false,
            buttonsStyling: false,
            background: '#242b34',
          })
        } else {
          data.collectActivity += id
          // alert('已加入收藏')
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: '<span style="color:#d4d1cc">已加入收藏</span>',
            showConfirmButton: false,
            buttonsStyling: false,
            background: '#242b34',
          })
        }
        this.setState({ collectActivity: data.collectActivity })
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
              <ActivitySection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
                section={'#test'}
                pagename={'/activity'}
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
              <ActivityTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-md-12 p-0 fix-inline-content">
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <ActivitySearchbarTitle spanClass="mr-5" title={'地區'} />
                </div>

                <div>
                  {this.state.searchbarRegion.map((data, id) => (
                    <ActivitySearchbarContent
                      className={this.state.searchbarRegionState[id]}
                      handleOnClick={() =>
                        this.searchbarOnClick(id, 'searchbarRegion', data)
                      }
                      content={data}
                    />
                  ))}
                </div>
              </div>
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <ActivitySearchbarTitle spanClass="mr-5" title={'場所'} />
                </div>
                <div>
                  {this.state.searchbarPlace.map((data, id) => (
                    <ActivitySearchbarContent
                      className={this.state.searchbarPlaceState[id]}
                      handleOnClick={() =>
                        this.searchbarOnClick(id, 'searchbarPlace', data)
                      }
                      content={data}
                    />
                  ))}
                </div>
              </div>
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <ActivitySearchbarTitle spanClass="mr-4" title={'關鍵字'} />
                </div>
                <div>
                  <ActivitySearchbarInput
                    value={this.state.searchText}
                    placeholder="請輸入關鍵字"
                    handleOnChange={this.SearchBarOnChange}
                    handleOnKeyDown={this.SearchBarOnKeyDown}
                  />
                </div>
              </div>
            </div>
            {this.state.activityCardDataResult === 0 ? (
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
            {this.state.activityCardData.map(data => (
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">
                {sessionStorage.getItem('memberId') !== null ? (
                  <ActivityCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={
                      data.imgSrc.indexOf('http') == 0
                        ? data.imgSrc
                        : '/images/activityImg/' + data.imgSrc
                    }
                    collectOpen
                    isCollect={
                      this.state.collectActivity.indexOf(data.id) > -1
                        ? true
                        : false
                    }
                  />
                ) : (
                  <ActivityCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={
                      data.imgSrc.indexOf('http') == 0
                        ? data.imgSrc
                        : '/images/activityImg/' + data.imgSrc
                    }
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

export default Activity
