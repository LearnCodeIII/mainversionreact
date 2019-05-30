import React from 'react'

const DataBoxSM = props => {
  return (
    <>
      <div className="col d-flex justify-content-center">
        <div
          className="col-9 d-flex align-items-center justify-content-center"
          style={{
            maxWidth: '600px',
            height: '100px',
            border: '2px solid #ffa510',
            color: '#ffa510',
            borderRadius: '5px',
          }}
        >
          <div className="flex-column col text-center">
            <h3>{props.collection}</h3>
            <h5>{props.member ? '收藏影片' : '訂閱人數'}</h5>
          </div>
          <div className="flex-column col text-center">
            <h3>{props.Awesome}</h3>
            <h5>{props.member ? '收藏文章' : '按讚人數'}</h5>
          </div>
          <div className="flex-column col text-center">
            <h3>{props.PageViews}</h3>
            <h5>{props.member ? '發文篇數' : '瀏覽數'}</h5>
          </div>
        </div>
      </div>
    </>
  )
}
export default DataBoxSM
