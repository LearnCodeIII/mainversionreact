import React from 'react'
import { Button, Modal, InputGroup, FormControl, Row } from 'react-bootstrap'
import InputWithLabelForEdit_Su from '../inputs/InputWithLabelForEdit_Su'
import CheckboxMultiForCinemaFilmTypeEditSu from '../inputs/CheckboxMultiForCinemaFilmTypeEditSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'
const CinemaFilmEditModal = props => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="xl"
        // dialogClassName='m'
      >
        <Modal.Header
          closeButton
          className="bg-second-darkblue d-flex justify-content-center"
        >
          <Modal.Title>
            影片資訊 {props.disableIdField ? '編輯' : '新增'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="cinemaFilmEditModal bg-second-darkblue">
          <div
            className="d-flex justify-content-center"
            style={{ overflow: 'hidden' }}
          >
            {props.thisData.imgSrc !== '' &&
            props.thisData.imgSrc !== undefined ? (
              <img
                src={
                  props.thisData.imgSrc.indexOf('http') == 0
                    ? props.thisData.imgSrc
                    : '/images/movieImg/' + props.thisData.imgSrc
                }
                style={{ width: '250px', height: '355px', objectFit: 'cover' }}
              />
            ) : (
              ''
            )}
          </div>
          <Row>
            <div className="col-lg-6 mt-3 h5">
              {props.inputmsg.map(item => (
                <>
                  <InputWithLabelForEdit_Su
                    key={item.id}
                    id={item.id}
                    inputWidth={item.w}
                    inputHeight={props.inputH}
                    // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                    inputType={item.inputType}
                    inputLabel={item.inputLabel}
                    iconLeft={item.iconL}
                    iconLeftSize={item.iconLS}
                    placeholder={item.placeholder}
                    iconRight={item.iconR}
                    iconRightSize={item.iconRS}
                    selectOptions={item.selectOptions}
                    thisData={props.thisData}
                    onChange={props.handleInputTextChange}
                  />
                  <small
                    id={item.id + 'help'}
                    className="form-text text-danger text-center"
                  />
                </>
              ))}
            </div>
            <div className="col-lg-6 my-4 h5">
              <p className="h5 my-4">影片摘要</p>
              <textarea
                name="intro"
                className="border border-warning bg-back-input rounded text-orange"
                placeholder="請輸入影片簡介..."
                style={{
                  width: '100%',
                  height: '135px',
                }}
                onChange={props.handleInputTextChange}
              >
                {props.thisData.intro}
              </textarea>
              <p className="h5 my-4">影片介紹</p>
              <textarea
                name="fullIntro"
                className="border border-warning bg-back-input rounded text-orange"
                placeholder="請輸入影片完整內容介紹..."
                style={{
                  width: '100%',
                  height: '355px',
                }}
                onChange={props.handleInputTextChange}
                // cols="50"
                // rows="5"
              >
                {props.thisData.fullIntro}
              </textarea>
            </div>
          </Row>
          <div className="row mt-5 mb-3 d-flex">
            <div className="col-md-12 p-0">
              <ActivityTitle title={'時刻表'} className="content-title" />
              <button
                className="btn btn-warning ml-4 rounded-circle addFilmSchedule mytransition5"
                onClick={props.handleAddSchedule}
              >
                <i className="fas fa-plus text-darkblue" />
              </button>
              <button
                className="btn btn-danger ml-4 rounded-circle addFilmSchedule mytransition5"
                onClick={props.handleDelSchedule}
              >
                <i className="fas fa-minus text-darkblue" />
              </button>
            </div>
          </div>
          <Row>
            {props.scheduleCount
              ? props.scheduleCount.map((item, index) => (
                  <>
                    <div className="col-lg-6 d-flex align-items-center">
                      <p
                        className="h5 d-flex align-items-center mx-3"
                        style={{ height: '40px' }}
                      >
                        {item}.
                      </p>
                      <input
                        type="date"
                        id={'schedule' + item + 'Date'}
                        className="h5 my-4 border border-warning bg-back-input rounded text-orange text-center"
                        style={{
                          width: '40%',
                          height: '40px',
                        }}
                        value={
                          props.thisData.schedule
                            ? [index] < props.thisData.schedule.length
                              ? props.thisData.schedule[index].split(' ')[0]
                              : null
                            : null
                        }
                        onChange={props.handleScheduleTime('schedule' + item)}
                      />
                      <input
                        type="time"
                        id={'schedule' + item + 'Time'}
                        className="h5 my-4 border border-warning bg-back-input rounded text-orange text-center"
                        style={{
                          width: '40%',
                          height: '40px',
                        }}
                        value={
                          props.thisData.schedule
                            ? [index] < props.thisData.schedule.length
                              ? props.thisData.schedule[index].split(' ')[1]
                              : null
                            : null
                        }
                        onChange={props.handleScheduleTime('schedule' + item)}
                      />
                      <p
                        id={'schedule' + item}
                        name="schedule"
                        className="h5 d-none align-items-center"
                        style={{ height: '40px' }}
                      >
                        {props.thisData.schedule
                          ? props.thisData.schedule[index]
                          : ''}
                      </p>
                    </div>
                  </>
                ))
              : ''}
          </Row>
          <div className="row mt-5 mb-3">
            <div className="col-md-12 p-0">
              <ActivityTitle title={'影片類型'} className="content-title" />
            </div>
          </div>
          <Row>
            {props.typeOptions.map(item => (
              <CheckboxMultiForCinemaFilmTypeEditSu
                // thisData={this.state.thisData}
                inputName="type"
                optionId={item.id}
                optionName={item.name}
                thisType={props.thisType}
                onChange={props.handleInputTextChange}
              />
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-second-darkblue d-flex justify-content-center">
          <Button variant="secondary" onClick={props.handleClose}>
            關閉
          </Button>
          <Button className="btn btn-warning" onClick={props.handleModalSave}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CinemaFilmEditModal
