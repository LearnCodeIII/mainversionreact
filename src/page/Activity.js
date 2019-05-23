import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivitySearchbar from '../component/activity/ActivitySearchbar/ActivitySearchbar'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'

import { LinkContainer } from 'react-router-bootstrap'

class Activity extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動',
      smallSlogan: '開始找尋',
      heroSectionPic:
        'https://images.unsplash.com/photo-1506512420485-a28339abb3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title1: '搜尋活動',
      activityCardData: [],
    }
  }

  async componentDidMount() {
    try {
      console.log('teset')
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      this.setState({ activityCardData: data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <div className="container-fuild position-relative">
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
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title1}
                className="content-title"
              />
            </div>
            <div className="col-md-12 p-0 fix-inline-content">
              <ActivitySearchbar />
            </div>
            {this.state.activityCardData.map(data => (
              <LinkContainer to={'/activity/' + data.id}>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">
                  <ActivityCard
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={data.imgSrc}
                    collectOpen
                    isCollect={data.isCollect}
                  />
                </div>
              </LinkContainer>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Activity
