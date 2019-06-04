import React from 'react'
//Import SweetAlert2
import Swal from 'sweetalert2'

class AcitivityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionState: ['active'],
      typeState: ['active'],
      formData: {},
      place: [],
      file: '',
    }
  }

  componentDidMount = async () => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    this.setState({ type: ['北部', '影院'] })
    data.place = '北部,影院'
    data.cinemaId = sessionStorage.getItem('cinemaId')
    data.id = 'a' + +new Date()
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  handleRegionButtonOnClick = (index, keyword) => {
    //
    let stateData = []
    if (stateData[index] == 'active') {
      stateData[index] = ''
    } else {
      stateData[index] = 'active'
    }
    this.setState({ regionState: stateData })

    //
    let typeData = JSON.parse(JSON.stringify(this.state.type))
    typeData[0] = keyword
    this.setState({ place: typeData }, () => {
      //
      let typeDataToString = JSON.parse(
        JSON.stringify(this.state.place)
      ).toString()

      let data = JSON.parse(JSON.stringify(this.state.formData))
      data.place = typeDataToString
      this.setState({ formData: data }, () => console.log(this.state.formData))
    })
  }
  handleTypeButtonOnClick = (index, keyword) => {
    //
    let stateData = []
    if (stateData[index] == 'active') {
      stateData[index] = ''
    } else {
      stateData[index] = 'active'
    }
    this.setState({ typeState: stateData })

    //
    let typeData = JSON.parse(JSON.stringify(this.state.type))
    typeData[1] = keyword
    this.setState({ place: typeData }, () => {
      //
      let typeDataToString = JSON.parse(
        JSON.stringify(this.state.place)
      ).toString()

      let data = JSON.parse(JSON.stringify(this.state.formData))
      data.place = typeDataToString
      this.setState({ formData: data }, () => console.log(this.state.formData))
    })
  }

  inputTitleOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.title = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputImgOnChange = event => {
    let imgFile = event.target.files[0]
    let imgFileName = event.target.files[0].name
    let formData = new FormData()
    formData.append('myfile', imgFile)
    fetch('http://localhost:3001/api/activity-upload-single', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(obj => {
        console.log(obj)
        if (obj.success == true) {
          const data = JSON.parse(JSON.stringify(this.state.formData))
          data.imgSrc = obj.filename
          this.setState({ formData: data }, () =>
            console.log(this.state.formData)
          )
        }
      })
  }
  inputContentOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.content = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputtheaterMapOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.theaterMap = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }

  inputjoinContentOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.joinContent = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputjoinContentCurrentPeopleOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.joinContentCurrentPeople = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  sendFile = () => {
    if (this.state.formData.theaterMap) {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          this.state.formData.theaterMap +
          '&key=AIzaSyABvTY8JdjI-UKYsJ-if4LJTkmjJr-mPSU',
        {
          method: 'GET',
        }
      )
        .then(res => {
          return res.json()
        })
        .then(res => {
          const data = JSON.parse(JSON.stringify(this.state.formData))
          data.lat = res.results[0].geometry.location.lat.toString()
          data.lng = res.results[0].geometry.location.lng.toString()
          this.setState({ formData: data }, () =>
            console.log(this.state.formData)
          )
          let cinemaId = sessionStorage.getItem('cinemaId')
          let cinemaDBdata = {}
          let cinemaDBdataForCard = {}
          try {
            fetch('http://localhost:5555/cinema/' + cinemaId, {
              method: 'GET',
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
            })
              .then(res => res.json())
              .then(obj => {
                cinemaDBdataForCard = JSON.parse(JSON.stringify(obj))
                this.setState({ cinemaDBdataForCard: cinemaDBdataForCard })
                cinemaDBdata = JSON.parse(JSON.stringify(obj))
                cinemaDBdata.cinemaActivity.push(this.state.formData)
                try {
                  fetch('http://localhost:5555/cinema/' + cinemaId, {
                    method: 'PUT',
                    body: JSON.stringify(cinemaDBdata),
                    headers: new Headers({
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }),
                  })
                    .then(res => res.json())
                    .then(obj => {
                      let cardData = {
                        id: this.state.formData.id,
                        theater: this.state.cinemaDBdataForCard.cinemaName,
                        title: this.state.formData.title,
                        content: this.state.formData.content,
                        imgSrc: this.state.formData.imgSrc,
                        theaterMap: this.state.formData.theaterMap,
                        GUINumber: this.state.cinemaDBdataForCard.cinemaTaxid,
                        website: this.state.cinemaDBdataForCard.cinemaWeb,
                        email: this.state.cinemaDBdataForCard.cinemaEmail,
                        phone: this.state.cinemaDBdataForCard.cinemaPhone,
                        lat: this.state.formData.lat,
                        lng: this.state.formData.lng,
                        joinContent: this.state.formData.joinContent,
                        joinContentCurrentPeople: this.state.formData
                          .joinContentCurrentPeople,
                        place: this.state.formData.place,
                        joinMember: '',
                      }
                      try {
                        fetch('http://localhost:5555/activityCardData/', {
                          method: 'POST',
                          body: JSON.stringify(cardData),

                          headers: new Headers({
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          }),
                        })
                          .then(res => res.json())
                          .then(obj => {
                            // alert('已上架完成')
                            Swal.fire({
                              // position: 'top-end',
                              type: 'success',
                              title:
                                '<span style="color:#d4d1cc">已上架完成</span>',
                              showConfirmButton: false,
                              buttonsStyling: false,
                              background: '#242b34',
                              timer: 1000,
                            }).then(
                              setTimeout(
                                () =>
                                  (window.location.pathname =
                                    '/CinemaBackMainpage/cinema-activity-inprogress'),
                                3000
                              )
                            )
                          })
                      } catch (e) {
                        console.log(e)
                      }
                    })
                } catch (e) {
                  console.log(e)
                }
              })
          } catch (e) {
            console.log(e)
          }
        })
    } else {
      // alert('請填寫活動地址')
      Swal.fire({
        type: 'error',
        title: '<span style="color:#d4d1cc">請填寫活動地址</span>',
        showConfirmButton: true,
        confirmButtonClass: 'btn btn-warning',
        confirmButtonColor: '#ffa510',
        buttonsStyling: false,
        background: '#242b34',
      })
    }
  }
  render() {
    return (
      <>
        <form class="activityForm">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">
              活動標題
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                placeholder="標題必填，最多二十五字"
                value={this.state.formData.title}
                onChange={event => this.inputTitleOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label class="col-sm-2 col-form-label">活動圖片</label>
            <div class="col-sm-10 ">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imgSrc"
                  name="imgSrc"
                  style={{ background: '#1f242a' }}
                  onChange={event => this.inputImgOnChange(event)}
                  required
                />
                <label
                  class="custom-file-label"
                  for="imgSrc"
                  style={{
                    background: '#1f242a',
                    border: '1px solid #ffa510',
                    color: '#ffa310b0',
                  }}
                >
                  {this.state.formData.imgSrc
                    ? this.state.formData.imgSrc
                    : '上傳圖片'}
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="content" class="col-sm-2 col-form-label">
              活動內容
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="content"
                name="content"
                placeholder="內容必填，最多一百個字"
                rows="4"
                cols="50"
                value={this.props.textValue}
                onChange={event => this.inputContentOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="theaterMap" class="col-sm-2 col-form-label">
              活動地址
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="theaterMap"
                name="theaterMap"
                placeholder="地址必填"
                value={this.state.formData.theaterMap}
                onChange={event => this.inputtheaterMapOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              活動地區
            </label>
            <div class="col-sm-10">
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[0]
                }
                onClick={() => this.handleRegionButtonOnClick(0, '北部')}
              >
                北部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[1]
                }
                onClick={() => this.handleRegionButtonOnClick(1, '中部')}
              >
                中部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[2]
                }
                onClick={() => this.handleRegionButtonOnClick(2, '南部')}
              >
                南部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[3]
                }
                onClick={() => this.handleRegionButtonOnClick(3, '東部')}
              >
                東部
              </button>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              場所類型
            </label>
            <div class="col-sm-10">
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[0]
                }
                onClick={() => this.handleTypeButtonOnClick(0, '影院')}
              >
                影院
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[1]
                }
                onClick={() => this.handleTypeButtonOnClick(1, '學校')}
              >
                學校
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[2]
                }
                onClick={() => this.handleTypeButtonOnClick(2, '文創園區')}
              >
                文創園區
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[3]
                }
                onClick={() => this.handleTypeButtonOnClick(3, '咖啡廳')}
              >
                咖啡廳
              </button>
            </div>
          </div>

          <div class="form-group row mt-5">
            <label for="joinContent" class="col-sm-2 col-form-label">
              報名資訊
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="joinContent"
                name="joinContent"
                placeholder="報名方式"
                value={this.props.textValue}
                onChange={event => this.inputjoinContentOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label
              for="joinContentCurrentPeople"
              class="col-sm-2 col-form-label"
            >
              報名名額
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="joinContentCurrentPeople"
                name="joinContentCurrentPeople"
                placeholder="報名人數"
                value={this.props.textValue}
                onChange={event =>
                  this.inputjoinContentCurrentPeopleOnChange(event)
                }
                required
              />
            </div>
            <div class="col-sm-10 mt-5">
              <button
                type="button"
                onClick={this.sendFile}
                class="btn btn-warning mb-2"
              >
                新增活動
              </button>
            </div>
          </div>
        </form>
      </>
    )
  }
}

export default AcitivityForm
