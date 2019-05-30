import React from 'react'

const MovieContent = props => (
  <>
    <div
      className=""
      style={{
        fontSize: '18px ',
      }}
    >
      <p>活動戲院：　　{props.theater}</p>
      <p>活動名稱：　　{props.title}</p>
      <p>報名地點：　　{props.theaterMap}</p>
      <p>活動內容：　　{props.content}</p>
      <p>活動方法：　　{props.joinContent}</p>
      <p>報名狀況：　　{props.joinContentCurrentPeople}</p>
    </div>
  </>
)

export default MovieContent
