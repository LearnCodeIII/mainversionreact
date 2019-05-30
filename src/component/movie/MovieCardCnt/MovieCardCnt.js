import React from 'react'
import MovieCardCntTxt from './MovieCardCntTxt'

const MovieSectionContent = props => ({
  render: function() {
    console.log(props.filmData)

    return (
      <div className="row">
        <div className="col-md-6">
          {/* 外框＋底圖 */}
          <div
            className="card text-center flex-column border-0"
            style={{
              backgroundImage: `url(${props.img})`,
              // 下方style轉放scss
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '698px',
              overflow: 'hidden',
            }}
          />
        </div>

        <div className="col-md-6">
          <MovieCardCntTxt dtC={props.filmData} ddC={props.filmData} />
        </div>
      </div>
    )
  },
})

export default MovieSectionContent
