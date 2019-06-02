import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityPageSection from '../component/activity/ActivityPageSection/ActivityPageSection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivityPageCard from '../component/activity/ActivityPageCard/ActivityPageCard'
import ActivityContent from '../component/activity/ActivityContent/ActivityContent'
import ActivityQRcode from '../component/activity/ActivityQRcode/ActivityQRcode'
import ActivityJoinBtn from '../component/activity/ActivityJoinBtn/ActivityJoinBtn'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import ActivityJoinForm from '../component/activity/ActivityJoinForm/ActivityJoinForm'
import Swal from 'sweetalert2'

class ActivityInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ['戲院資訊', '活動資訊', '報名表單'],
      activityPageData: [],
      activityPageOtherData: [],
      streetView: false,
      memberData: {},
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const activityPageData = data.find(
        item => item.id === this.props.match.params.id
      )
      const activityPageOtherData = data.filter(
        item => item.id !== this.props.match.params.id
      )
      console.log(activityPageData)
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityPageOtherData: activityPageOtherData })
      this.setState({ activityHeroImage: activityPageData.imgSrc })
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
      this.setState({ memberData: data })
    } catch (err) {
      console.log(err)
    }
  }
  handleOnClick = () => {
    this.setState({ activityPageData: [] })
    const res = fetch('http://localhost:5555/activityCardData', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const data = res.json()
    const activityPageData = data.find(
      item => item.id === this.props.match.params.id
    )
    const activityPageOtherData = data.filter(
      item => item.id !== this.props.match.params.id
    )
    console.log(activityPageData)
    this.setState({ activityPageData: activityPageData })
    this.setState({ activityPageOtherData: activityPageOtherData })
    this.setState({ activityHeroImage: activityPageData.imgSrc })
  }
  btnSubmitOnClick = async event => {
    const id = window.location.pathname.slice(15)
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
        let isCollect = data.collectActivityJoin.indexOf(id) > -1

        if (isCollect) {
          // alert('已報名過此活動')
          Swal.fire({
            type: 'error',
            title: '<span style="color:#d4d1cc">已報名過此活動</span>',
            showConfirmButton: true,
            confirmButtonClass: 'btn btn-warning',
            confirmButtonColor: '#ffa510',
            buttonsStyling: false,
            background: '#242b34',
          })
          return false
        } else {
          data.collectActivityJoin += id
          try {
            const res = await fetch(
              'http://localhost:5555/member/' + memberId,
              {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
              }
            )
            console.log('修改完成')
            return true
          } catch (err) {
            console.log(err)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    return (
      <>
        <div className="fix-height" />

        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[1]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              <ActivityContent
                theater={this.state.activityPageData.theater}
                title={this.state.activityPageData.title}
                theaterMap={this.state.activityPageData.theaterMap}
                content={this.state.activityPageData.content}
                joinContent={this.state.activityPageData.joinContent}
                joinContentCurrentPeople={
                  this.state.activityPageData.joinContentCurrentPeople
                }
              />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[2]}
                className="content-title"
              />
            </div>

            <ActivityJoinForm
              memberAccount={this.state.memberData['name']}
              memberEmail={this.state.memberData['email']}
              handleOnSubmit={this.btnSubmitOnClick}
            />
          </div>
        </div>
      </>
    )
  }
}

export default ActivityInfo
