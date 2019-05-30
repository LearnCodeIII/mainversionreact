import React from 'react'

const ListSpoilersIconRoy = props => {
  return (
    <>
      <div
        // 三源運算確認是否有暴雷有則顯示否則不顯示
        className={
          props.listforumSpoilers === false
            ? 'border border-warning rounded text-warning px-3 py-2'
            : 'border border-warning rounded text-warning px-3 py-2 d-none'
        }
      >
        爆雷
      </div>
    </>
  )
}

export default ListSpoilersIconRoy
