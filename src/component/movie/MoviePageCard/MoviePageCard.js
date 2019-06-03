import React from 'react'

const MoviePageCard = props => (
  <>
    <div
      class="activityInfoCard card mb-3"
      style={{
        maxWidth: '1000px',
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
          maxWidth: '1000px',
          height: '100%',
        }}
      >
        <img class="card-img-left fit-image" src={props.imgSrc} alt="" />
        <div class="card-body">
          <p class="card-text ">
            {props.cardTitle1}：　{props.cardContent1}
          </p>
          <p class="card-text ">
            {props.cardTitle2}：　{props.cardContent2}
          </p>
          <p class="card-text ">
            {props.cardTitle3}：　{props.cardContent3}
          </p>
          <p class="card-text ">
            {props.cardTitle4}：　{props.cardContent4}
          </p>
          <p class="card-text ">
            {props.cardTitle5}：　{props.cardContent5}
          </p>
          <p class="card-text ">
            {props.cardTitle6}：　{props.cardContent6}
          </p>
          <p class="card-text ">
            {props.cardTitle7}：　{props.cardContent7}
          </p>
          <p class="card-text ">
            {props.cardTitle8}：　{props.cardContent8}
          </p>
        </div>
      </div>
    </div>
  </>
)

export default MoviePageCard
