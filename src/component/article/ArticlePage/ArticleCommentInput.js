import React from 'react'
import { Row, Col } from 'react-bootstrap'

class ArticleCommentInput extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   inputText: '',
    // }
    // this.handleChange = this.handleChange.bind(this)
  }

  //   handleChange = event => {
  //     this.setState({ inputText: event.target.value })
  //   }

  //   handleChange = event => this.setState({ inputText: event.target.value })

  //   goComment = async () => {
  //     // alert('回應成功!!!SID:' + this.props.sid)
  //     let newRes = {
  //       aid: +this.props.sid,
  //       date: new Date().toString().substr(0, 10),
  //       author: '測試留言區塊',
  //       content: this.state.inputText,
  //     }
  //     try {
  //       const res = await fetch('http://localhost:5555/articleComment', {
  //         method: 'POST',
  //         body: JSON.stringify(newRes),
  //         headers: new Headers({
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         }),
  //       })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  render() {
    return (
      <>
        <div className="d-flex my-4">
          <input
            id="commentInput"
            onChange={this.props.handleChange}
            value={this.props.inputText}
            type="text"
            className="form-control"
            placeholder="請輸入留言"
            aria-label="請輸入留言"
            aria-describedby="button-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-warning nomarginBtn col"
              type="button"
              id="button-addon2"
              onClick={this.props.goComment}
            >
              送出留言
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default ArticleCommentInput
