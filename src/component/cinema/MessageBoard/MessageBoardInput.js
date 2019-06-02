import React from 'react'

class MessageBoardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TextBig: false,
      textAreaValue: '',
      disabled: true,
    }
  }

  TextAreaFocus = () => this.setState({ TextBig: true })
  TextAreaBlur = () => this.setState({ TextBig: false })

  onChange = e => {
    this.setState({ textAreaValue: e.target.value })
    const length = e.target.value.length
    if (length >= 2) {
      this.setState(() => ({ disabled: false }))
    } else if (!this.state.disabled) {
      this.setState(() => ({ disabled: true }))
    }
  }

  handleSave = () => {
    this.props.MessageBoardSave(this.state.textAreaValue)
    this.setState({ textAreaValue: '', disabled: true })
  }

  render() {
    const label = this.state.disabled ? '寫點東西吧' : '送出！'
    return (
      <>
        {/* <div class="form-group"> */}
        <div className="d-flex justify-content-center mt-3">
          <label for="exampleFormControlTextarea1" style={{ fontSize: '25px' }}>
            發表評論
          </label>
        </div>
        {/* <textarea
            onChange={(this.handleChange, this.onChange)}
            value={this.state.textAreaValue}
            class="form-control  col-10 mx-auto mt-2"
            style={({ height: '200px' }, styles.input)}
            id="exampleFormControlTextarea1"
            rows="3"
          /> */}
        {/* <div className="d-flex justify-content-center mt-4"> */}
        {/* <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleSave}
              style={Object.assign(
                {},
                styles.button,
                !this.state.disabled && styles.buttonEnabled
              )}
            > */}
        <div className="App d-flex flex-column align-items-center">
          {this.state.TextBig === false ? (
            <textarea
              onFocus={this.TextAreaFocus}
              onBlur={this.TextAreaBlur}
              style={styles.textarea}
              onChange={this.onChange}
              value={this.state.textAreaValue}
            />
          ) : (
            <textarea
              onFocus={this.textareaFocus}
              onBlur={this.TextAreaBlur}
              style={styles.textareaFocus}
              onChange={this.onChange}
              value={this.state.textAreaValue}
            />
          )}
          <button
            onClick={this.handleSave}
            style={Object.assign(
              {},
              styles.button,
              !this.state.disabled && styles.buttonEnabled
            )}
            disabled={this.state.disabled}
          >
            {label}
          </button>
        </div>
        {/* 送出
            </button> */}
        {/* </div> */}
        {/* </div> */}
      </>
    )
  }
}

const styles = {
  textarea: {
    width: '70%',
    height: 200,
    borderRadius: '5px',
    outline: 'none',
    fontSize: 20,
    padding: 10,
    border: 'none',
    backgroundColor: '#ddd',
    marginTop: 10,
    boxShadow: '0 0 10px #111',
    transition: '.5s',
  },
  button: {
    margin: '20px 0 0 0',
    width: 180,
    height: 50,
    border: 'none',
    borderRadius: 4,
    fontSize: 20,
    cursor: 'pointer',
    transition: '.25s all',
  },
  buttonEnabled: {
    backgroundColor: '#ffc107',
    width: 220,
  },
  textareaFocus: {
    width: '75%',
    height: 220,
    borderRadius: '5px',
    outline: 'none',
    fontSize: 20,
    padding: 10,
    border: 'none',
    backgroundColor: '#ddd',
    marginTop: 10,
    boxShadow: '0 0 20px #000',
    transition: '.5s',
  },
}
export default MessageBoardInput
