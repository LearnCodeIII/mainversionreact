import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'

class Movie extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動。',
      smallSlogan: '開始找尋',
      heroSectionPic:
        'https://images.unsplash.com/photo-1506512420485-a28339abb3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    }
  }

  render() {
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Movie
