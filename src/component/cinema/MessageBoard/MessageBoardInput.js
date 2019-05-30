import React from 'react'

class MessageBoardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textAreaValue: '',
    }
  }

  handleChange = event => {
    console.log(event.target)
    this.setState({ textAreaValue: event.target.value })
  }

  handleSave = () => {
    this.props.MessageBoardSave(this.state.textAreaValue)
    this.setState({ textAreaValue: '' })
  }
  render() {
    return (
      <>
        <div class="form-group">
          <div className="d-flex justify-content-center mt-3">
            <label
              for="exampleFormControlTextarea1"
              style={{ fontSize: '25px' }}
            >
              發表評論
            </label>
          </div>
          <textarea
            onChange={this.handleChange}
            value={this.state.textAreaValue}
            class="form-control  col-10 mx-auto mt-2"
            style={{ height: '200px' }}
            id="exampleFormControlTextarea1"
            rows="3"
          />
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleSave}
            >
              送出
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default MessageBoardInput
