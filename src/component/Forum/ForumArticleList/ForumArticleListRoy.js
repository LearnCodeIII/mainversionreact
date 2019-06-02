import React from 'react'
import ListSpoilersIconRoy from './ListSpoilersIconRoy'
import ListIssueDateRoy from './ListIssueDateRoy'
import ListTitleRoy from './ListTitleRoy'
import ListAvatarRoy from './ListAvatarRoy'
import ListViewsRoy from './ListViewsRoy'

const ForumArticleListRoy = props => {
  // console.log(props)
  return (
    <>
      <div
        id={'listHover' + props.currentId}
        // type="button"
        className=" px-4 p-2  my-2 mx-1"
        onClick={props.onClick}
        style={{
          border: 'none',
          background: '#242B34',
          boxShadow: ' 0px 2px 6px #000000',
        }}
      >
        {/* 列表上排 */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          <ListTitleRoy listheadline={props.listheadline} />
          <ListSpoilersIconRoy listforumSpoilers={props.listforumSpoilers} />
        </div>
        {/* 列表下排 */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          {/* 個人頭像，包含名稱與照片 */}
          <div className="col-5 p-0">
            <ListAvatarRoy
              listforumName={props.listforumName}
              listforumAvatar={props.listforumAvatar}
              // 圖片路徑前墜
              avatarPath={props.avatarPath}
            />
          </div>
          {/* 發文時間 */}
          <div className="col-5 p-0">
            <ListIssueDateRoy listforumCreateDate={props.listforumCreateDate} />
          </div>
          {/* 觀看次數 */}
          <div className="col-2 p-0 d-flex justify-content-end">
            <ListViewsRoy
              // 共用排序傳遞的數據，根據不同STATE引入帶入不同值
              listforumViews={props.listforumViews}
              // 切換列表顯示的圖片是根據哪種排序
              listFilterAccorddingPic={props.listFilterAccorddingPic}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumArticleListRoy
