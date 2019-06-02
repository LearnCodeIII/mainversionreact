import React from 'react'

const ListViewsRoy = props => {
  return (
    <>
      <div className="d-flex">
        <div>
          <h5 className="text-light my-0 ml-2">
            {props.listforumViews > 999 ? '999+' : props.listforumViews}
          </h5>
        </div>
        <div className="py-1">
          <i
            className={
              // 控制不同排序形況顯示的圖片
              props.listFilterAccorddingPic
                ? 'fas fa-comment-alt mx-2 text-light'
                : 'fas fa-bookmark mx-2 text-light'
            }
          />
        </div>
      </div>
    </>
  )
}
export default ListViewsRoy
