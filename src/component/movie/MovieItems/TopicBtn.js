import React from 'react'
import './TopicBtnCss.css'

class TopicBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // btnText: [],
      isPressed: true,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({
      isPressed: !state.isPressed,
    }))
  }

  render() {
    if (this.state.isPressed) {
      return (
        <button
          onClick={this.handleClick}
          type="button"
          className="btn light btn-outline active"
        >
          {this.props.btnText}
        </button>
      )
    } else {
      return (
        <button
          onClick={this.handleClick}
          type="button"
          className="btn dark btn-outline active"
        >
          {this.props.btnText}
        </button>
      )
    }
  }
}

export default TopicBtn
