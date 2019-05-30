import React from 'react'

//blacklist  general vip cinema
const AvatarOne = props => {
  let purview = ''
  switch (props.purview) {
    case 'generalMember':
      purview = '一般會員'
      break
    case 'vipMember':
      purview = '高級會員'
      break
    case 'blacklistMember':
      purview = '黑名單'
      break
    default:
      purview = '劇院會員'
      break
  }
  return (
    <>
      <div className="d-flex col-lg-6 col-md-12 col-sm-12 p-0  justify-content-center align-items-center">
        {/* 左邊圖片 */}
        <div className="col-lg-6 justify-content-center d-flex">
          <div
            className="overflow-hidden p-0 photoAvatar"
            style={{
              borderRadius: '50%',
              width: '220px',
              height: '220px',
            }}
          >
            <img
              className=" h-100"
              src={props.img}
              alt="..."
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        {/* 右邊文字 */}
        <div className="col-lg w-100 h-50 flex-column d-flex justify-content-around mt-3">
          <div className="col d-flex align-items-center mb-1">
            <div
              className="px-4 py-2 d-flex justify-content-center align-items-center"
              style={{
                border: '2px solid #ffa510',
                borderRadius: '3px',
              }}
            >
              <h5 className="m-0" style={{ color: '#ffa510' }}>
                {purview}
              </h5>
            </div>
          </div>
          <div className="col d-flex align-items-center my-1">
            <h5>{props.name}</h5>
          </div>
          <div className="col d-flex align-items-center mt-1 flex-wrap">
            <h5>入會日期:</h5>
            <h5 className="ml-1">{props.SignUpDate}</h5>
          </div>
        </div>
      </div>
    </>
  )
}
export default AvatarOne
