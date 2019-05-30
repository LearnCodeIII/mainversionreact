import React from 'react'
import MovieMap from './MovieMap'

const MoviePageCard = props => (
  <>
    <div
      class="activityInfoCard card mb-3"
      style={{
        maxWidth: '1200px',
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
          maxWidth: '1200px',
          height: '100%',
        }}
      >
        <div class="col-md-7">
          <MovieMap
            lat={props.lat}
            lng={props.lng}
            streetView={props.streetView}
          />
        </div>
        <div class="col-md-5">
          <div
            className="card-body d-flex flex-column justify-content-center"
            style={{
              fontSize: '18px ',
              height: '100%',
            }}
          >
            <div>
              <p class="card-text ">戲院名稱：　{props.theater}</p>
              <p class="card-text ">地址：　　　{props.theaterMap}</p>
              <p class="card-text">電話：　　　{props.phone}</p>
              <p class="card-text">統一編號：　{props.GUINumber}</p>
              <p class="card-text">官方網站：　{props.website}</p>
              <p class="card-text">電子信箱：　{props.email}</p>
              <button
                onClick={props.handleOnClickMap}
                type="button"
                style={{
                  background: 'none',
                  borderColor: '#ffa510',
                  borderRadius: '4px',
                  color: '#ffa510',
                }}
                className="btn btn-warning  w-30"
              >
                <i class="fas fa-eye mr-3" />
                顯示現場
              </button>
              <button
                onClick={props.handleOnClickMaplocal}
                type="button"
                style={{
                  background: 'none',
                  borderColor: '#ffa510',
                  borderRadius: '4px',
                  color: '#ffa510',
                }}
                className="btn btn-warning  w-30 ml-3"
              >
                <i class="fas fa-flag mr-3" />
                顯示地圖
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default MoviePageCard
