import React from 'react'
import { Col } from 'react-bootstrap'
import InputCardWrap from './InputCardWrap'
// import { url } from 'inspector'

const BoxWrap = props => {
  // console.log(props.handleLoginClick)
  return (
    <>
      <Col //背景Box的Col
        className={props.classname + ' box p-0'}
        onMouseEnter={props.handleMousein}
        onMouseLeave={props.handleMouseleave}
        onClick={props.handleClick}
        style={
          {
            // background: `url(${props.imgsrc})`,
            // backgroundAttachment: 'fixed',
            // backgroundSize: '100%',
            // backgroundRepeat: 'no-repeat',
          }
        }
      >
        <img
          className={props.filter}
          src={props.imgsrc}
          style={{
            width: '100%',
            height: '100%',
            // background: 'black',
          }}
          alt=""
        />
        <h1 className={props.titleClass}>{props.title}</h1>
      </Col>
      <div //登入&註冊卡片的容器div，因為感應區的問題，不能包在box裡面
        className="position-absolute signboxWrap"
        style={{
          width: '600px',
          height: '650px',
          zIndex: `${props.zIndex}`,
          top: '25%',
          left: `${props.left}`,
          opacity: `${props.show}`,
          transition: '.5s',
          // overflow: 'hidden',
          overflowX: 'hidden',
          // overflowY: 'hidden',
        }}
      >
        {/* <div
          className="position-relative"
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          > */}
        <InputCardWrap
          memberdata={props.memberdata}
          cinemadata={props.cinemadata}
          handleMemberLoginClick={props.handleMemberLoginClick}
          handleCinemaLoginClick={props.handleCinemaLoginClick}
          handleMemberSignup={props.handleMemberSignup}
          handleCinemaSignup={props.handleCinemaSignup}
          title={props.title}
          tabTitle1={props.tabTitle1}
          tabTitle2={props.tabTitle2}
          eventKey1={props.eventKey1}
          eventKey2={props.eventKey2}
        />
      </div>
      {/* </div> */}
    </>
  )
}

export default BoxWrap
