import React from 'react'
import CinemaSectionImg from './CinemaSectionImg'
import CinemaSectionContent from './CinemaSectionContent'

const ActivitySection = props => (
  <>
    <div className="position-relative">
      <CinemaSectionImg pictureSrc={props.pictureSrc} />
      <div
        className="position-absolute d-flex flex-column align-items-center justify-content-center"
        style={{
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          textShadow: '0 0 10px black',
        }}
      >
        <CinemaSectionContent
          bigSlogan={props.bigSlogan}
          midSlogan={props.midSlogan}
          smallSlogan={props.smallSlogan}
          pagename={props.pagename}
          pageid={props.pageid}
        />
      </div>
    </div>
  </>
)

export default ActivitySection
