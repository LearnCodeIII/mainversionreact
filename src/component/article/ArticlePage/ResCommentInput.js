import React from 'react'

class ResCommentInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowed: false, //是否顯示留言區塊
    }
  }

  //控制 留言區塊顯示
  handleCommentShow = () => {
    this.setState({ isShowed: !this.state.isShowed })
    console.log(this.state.isShowed)
  }

  render() {
    return (
      <>
        {/* 收縮留言區 */}
        <span
          className="typeBtn"
          role={'button'}
          onClick={this.handleCommentShow}
          style={{ cursor: 'pointer' }}
        >
          回覆
        </span>
        {this.state.isShowed ? (
          <div class="input-group row d-flex my-3" id="myResValue">
            <input
              id="resInput"
              onChange={this.props.handleResChange}
              value={this.props.inputTextRes}
              type="text"
              className="form-control inp_email"
              style={{ backgroundColor: '#bbbbbb' }}
              placeholder="請輸入留言"
              aria-label="請輸入留言"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button
                class="btn btn-warning nomarginBtn"
                type="button"
                id="button-addon2"
                onClick={this.props.goResComment}
              >
                送出留言
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    )
  }
}

export default ResCommentInput
