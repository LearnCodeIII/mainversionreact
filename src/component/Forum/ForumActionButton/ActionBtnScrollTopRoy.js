import React from 'react'

const ActionBtnScrollTopRoy = props => (
  <button
    type="button"
    className="btn m-0 btn-outline-warning w-100 d-flex align-content-center justify-content-center"
    style={{ height: '30px' }}
    onClick={props.handleScrollTop}
  >
    <i class="fas fa-chevron-up" />
  </button>
)

export default ActionBtnScrollTopRoy
