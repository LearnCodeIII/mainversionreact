import React from 'react'

const MoviePageCard = props => (
  <>
    <div
      class="activityInfoCard card mb-3"
      style={{
        maxWidth: '800px',
        height: '400px',
        maxHeight: '1200px',
        margin: 'auto',
        border: 'none',
        background: '#2B333D',
        boxShadow: '0 2px 6px #191C20',
      }}
    >
      <div
        class="row no-gutters"
        style={{
          maxWidth: '800px',
          height: '100%',
        }}
      >
        <img class="card-img-left fit-image" src={props.imgSrc} alt="" />
        <div class="card-body">
          <p class="card-text ">戲院名稱：　{props.theater}</p>
          <p class="card-text ">地址：　　　{props.theaterMap}</p>
          <p class="card-text">電話：　　　{props.phone}</p>
          <p class="card-text">統一編號：　{props.GUINumber}</p>
          <p class="card-text">官方網站：　{props.website}</p>
          <p class="card-text">電子信箱：　{props.email}</p>
        </div>
      </div>
    </div>
  </>
)

export default MoviePageCard
