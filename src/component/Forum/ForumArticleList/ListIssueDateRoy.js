import React from 'react'

const ListIssueDateRoy = props => {
  return (
    <>
      {/* 發文時間 */}
      <h5 className="text-light my-0 text-left">
        {/* 把秒數切掉保留前段年日月時分 */}
        {props.listforumCreateDate.split(' ')[0]}
      </h5>
    </>
  )
}

export default ListIssueDateRoy
