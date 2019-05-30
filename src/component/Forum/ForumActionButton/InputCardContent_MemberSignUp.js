import React from 'react'
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import InputWithLabel_Su from '../ForumActionButton/InputWithLabel_Su'
// import Checkbox_Su from '../inputs/Checkbox_Su'
// import Captcha from 'captcha-mini' //驗證碼套件
const InputCardContent_MemberSignUp = props => (
  <>
    <button
      variant="primary"
      className="btn m-0 btn-warning  w-100"
      onClick={props.onClick}
    >
      發表評論
    </button>
    <Modal
      show={props.show}
      onHide={props.onhide}
      centered
      // style={{ background: '1000px' }}
      size="lg"
      className="border-0 "
    >
      {/* <Modal.Header className="border-0 px-5" style={{ background: '#1f242a' }}>
        <Modal.Title style={{ background: '#1f242a' }}>
          {props.disableIdField ? '編輯' : '新增'}
          評論
        </Modal.Title>
      </Modal.Header> */}
      <Card
        className="card-box text-center articleInput w-100 border-0  pt-5 pr-5"
        style={{ background: '#1f242a' }}
      >
        <Card.Body className=" articleInput w-100 border-0 p-0 mt-3">
          {props.inputmsg.map(item => (
            <>
              {/* {console.log(item)} */}
              <Row className=" w-100 border-0 p-0 ">
                <Col // 這裡是input的col
                  className="p-0 border-0 rounded d-flex flex-nowrap align-items-center"
                  style={{ width: `${item.w}` }}
                >
                  <InputWithLabel_Su
                    key={item.id}
                    id={item.id}
                    inputWidth={item.w}
                    inputHeight={props.inputH}
                    inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                    iconLeft={item.iconL}
                    iconLeftSize={item.iconLS}
                    placeholder={item.placeholder}
                    iconRight={item.iconR}
                    iconRightSize={item.iconRS}
                    // onChange={props.handleInputTextChange}
                    inputType={item.inputType}
                    inputLabel={item.inputLabel}
                    headline={props.headline}
                    handleModalFormInputChange={
                      props.handleModalFormInputChange
                    }
                  />
                </Col>
              </Row>
              <small id={item.id + 'help'} class="form-text  text-danger" />
              <Row />
            </>
          ))}
          {/* 這裡是驗證碼的Row -- input + canvas */}
          {/* <Row className="my-4 d-flex justify-content-between">
              <input
                className="border border-warning rounded font-c-primary"
                style={{ background: '#1f242a' }}
                name="captchatext"
                type="text"
                placeholder="請輸入右方的驗證碼"
                onChange={this.handleInputTextChange}
              />
              <canvas width="200" height="48" id="captcha2" />
            </Row> */}
          {/* <Checkbox_Su
              id="agree-member-rules"
              name="agree-member-rules"
              text="我已了解並同意.Movieee使用者服務條款"
              // checkRemind="請確認同意服務條款"
              onChange={this.handleInputTextChange}
            /> */}

          {/* <Button
          className="bg-warning border-0 px-5"
          onClick={this.props.handleMemberSignup(
            this.state.usertext,
            this.state.checkok
          )}
        >
          確認送出
        </Button> */}
        </Card.Body>
        {/* 評論內容區 */}
        <InputGroup className="mb-2 ">
          <Col // 這裡是lable的col
            lg={2}
            className="d-flex align-items-center justify-content-center"
          >
            <label className="m-0">評論</label>
          </Col>
          <FormControl
            as="textarea"
            name="forumReview"
            aria-label="With textarea"
            style={{ height: '300px', background: '#1F242A', color: '#FFA510' }}
            onChange={props.handleModalFormInputChange}
            className="border-warning"
            placeholder=""
          />
        </InputGroup>
      </Card>

      <Modal.Footer
        className=" border-0 px-5 pb-5"
        style={{ background: '#1f242a' }}
      >
        <div class="form-check my-4">
          <input
            class="form-check-input mr-3 my-0"
            type="checkbox"
            style={{ height: '100%' }}
            // 要先反轉check
            checked={!props.forumSpoilers}
            // 爆雷偵測套餐
            onChange={props.handleSpoilerChange}
            onClick={props.handleSpoilerToggle}
          />
          <label class="form-check-label">是否爆雷</label>
        </div>
        <Button
          variant="secondary btn-warning"
          className="ml-4 px-3"
          onClick={props.onhide}
        >
          關閉
        </Button>
        <Button
          className="ml-2 px-3"
          variant="primary btn-warning"
          onClick={props.handleModalFormInputSave}
        >
          發送
        </Button>
      </Modal.Footer>
    </Modal>
  </>
)

export default InputCardContent_MemberSignUp
