import React from 'react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonFilterRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '分類', iconType: 'fas fa-list-alt' }
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

export default ActionButtonFilterRoy
