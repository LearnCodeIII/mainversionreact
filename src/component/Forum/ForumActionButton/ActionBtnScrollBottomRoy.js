import React from 'react'

const ActionBtnScrollBottomRoy = props => (
  <button
    type="button"
    className="btn m-0  btn-outline-warning w-100 d-flex align-content-center justify-content-center"
    style={{ height: '30px' }}
    onClick={props.handleScrollBottom}
  >
    <i class="fas fa-chevron-down" />
  </button>
)

export default ActionBtnScrollBottomRoy
