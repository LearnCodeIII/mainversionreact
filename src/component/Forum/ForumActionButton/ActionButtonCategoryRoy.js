import React from 'react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonCategoryRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '排序', iconType: 'fas fa-filter ' }
  }

  render() {
    return (
      <>
        <ActionButtonRoy
          variant="outline-success"
          buttonText={this.state.buttonType}
          buttonIcon={this.state.iconType}
          className="m-0"
        />
      </>
    )
  }
}

export default ActionButtonCategoryRoy
