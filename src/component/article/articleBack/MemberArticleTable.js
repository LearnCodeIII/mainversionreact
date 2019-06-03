import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
class MemberArticleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thisData: 0,
      thisCollectArticleData: 0,
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
  //   let stateToBeReturned = null
  //   if (prevState.thisData == 0 || prevState.thisCollectArticleData == 0) {
  //     stateToBeReturned = {
  //       ...prevState,
  //       thisData: nextProps.thisData,
  //       thisCollectArticleData: nextProps.thisCollectArticleData,
  //     }
  //   }
  //   console.log(nextProps)
  //   console.log(prevState)
  //   console.log(stateToBeReturned)
  //   return stateToBeReturned
  // }

  render() {
    // if (this.props.thisData == 0) {
    //   return <></>
    // }
    return (
      <>
        {/* {this.state.thisCollectArticleData.length == 0 ? (
          <h5 className="text-center text-mywhite mx-auto">
            尚無紀錄，趕快
            <a href="/article" style={{ color: '#ffa510' }}>
              前往文章
            </a>
            添加你的收藏吧！
          </h5>
        ) : ( */}
        <table class="table table-borderless text-center h5">
          <thead>
            <tr
              className="text-center"
              style={{ border: '2px solid #ffa510 ', color: '#ffa510' }}
            >
              <th style={{ width: '60px' }}>#</th>
              <th scope="col-lg-6">文章標題</th>
              <th scope="col-lg-4">作者</th>
              <th scope="col-lg-3">發布日期</th>
              <th scope="col-lg-3">操作</th>
            </tr>
          </thead>
          <tbody className="bg-back-table text-mywhite">
            {this.props.thisCollectArticleData.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: '2px solid #2B333D',
                }}
              >
                <th scope="row">{index + 1}</th>
                <td
                  style={{
                    borderLeft: '2px solid #2B333D',
                    borderRight: '2px solid #2B333D',
                  }}
                >
                  <a href={'/article/' + item.id}>{item.title}</a>
                </td>
                <td
                  style={{
                    borderLeft: '2px solid #2B333D',
                    borderRight: '2px solid #2B333D',
                  }}
                >
                  {item.author}
                </td>
                <td
                  style={{
                    borderLeft: '2px solid #2B333D',
                    borderRight: '2px solid #2B333D',
                  }}
                >
                  {item.date}
                </td>
                <td
                  style={{
                    borderLeft: '2px solid #2B333D',
                    borderRight: '2px solid #2B333D',
                  }}
                >
                  <FaTrash
                    onClick={this.props.handleMarkClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* )} */}
      </>
    )
  }
}
export default MemberArticleTable
