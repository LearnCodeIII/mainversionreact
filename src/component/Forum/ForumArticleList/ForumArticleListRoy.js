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
        // type="button"
        className=" px-4 p-2  my-2"
        onClick={props.onClick}
        style={{
          border: 'none',
          background: 'none',
          boxShadow: '0 2px 6px #191C20',
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
          <div className="col-6 p-0">
            <ListAvatarRoy
              listforumName={props.listforumName}
              listforumAvatar={props.listforumAvatar}
              // 圖片路徑前墜
              avatarPath={props.avatarPath}
            />
          </div>
          {/* 發文時間 */}
          <div className="col-6 p-0">
            <ListIssueDateRoy listforumCreateDate={props.listforumCreateDate} />{' '}
          </div>
          {/* 觀看次數 */}
          {/* <div className="col-3 p-0 d-flex justify-content-end">
            <ListViewsRoy listforumViews={props.listforumViews} />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ForumArticleListRoy
