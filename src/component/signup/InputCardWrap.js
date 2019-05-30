import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import InputCardContent_MemberLogin from './InputCardContent_MemberLogin'
import InputCardContent_MemberSignUp from './InputCardContent_MemberSignUp'
import InputCardContent_CinemaLogin from './InputCardContent_CinemaLogin'
import InputCardContent_CinemaSignUp from './InputCardContent_CinemaSignUp'

const InputCard = props => {
  // console.log(props.memberdata)
  // console.log(props.cinemadata)
  // console.log(props.handleLoginClick)
  return (
    <>
      <Tabs
        justify
        className="tab-box m-0"
        defaultActiveKey={props.eventKey1}
        id="uncontrolled-tab-example"
        style={{ width: '600px', fontSize: '20px' }}
      >
        <Tab //登入TAB
          className="tab-body"
          eventKey={props.eventKey1}
          title={props.tabTitle1}
        >
          {props.title === '會員登入' ? (
            <InputCardContent_MemberLogin
              memberdata={props.memberdata}
              handleMemberLoginClick={props.handleMemberLoginClick}
            />
          ) : (
            <InputCardContent_CinemaLogin
              cinemadata={props.cinemadata}
              handleCinemaLoginClick={props.handleCinemaLoginClick}
            />
          )}
        </Tab>
        <Tab //註冊TAB
          className="tab-body"
          eventKey={props.eventKey2}
          title={props.tabTitle2}
        >
          {props.title === '會員登入' ? (
            <InputCardContent_MemberSignUp
              memberdata={props.memberdata}
              handleMemberSignup={props.handleMemberSignup}
            />
          ) : (
            <InputCardContent_CinemaSignUp
              cinemadata={props.cinemadata}
              handleCinemaSignup={props.handleCinemaSignup}
            />
          )}
        </Tab>
      </Tabs>
    </>
  )
}

export default InputCard
