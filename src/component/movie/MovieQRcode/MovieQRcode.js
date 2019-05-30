import React from 'react'

const MovieQRcode = props => (
  <>
    <img
      src={
        'https://chart.googleapis.com/chart?chs=150x150&cht=qr&choe=UTF-8&chl=' +
        props.imgSrc
      }
      alt=""
    />
    <p>分享QRCODE邀請朋友</p>
  </>
)

export default MovieQRcode
