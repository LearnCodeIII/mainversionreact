import React from 'react'

class MemberCollectTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thisData: 0,
      myForumData: 0,
    }
  }

  async componentDidMount() {}
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('childDerived')
    // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
    let stateToBeReturned = null
    if (prevState.thisData == 0 || prevState.myForumData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        myForumData: nextProps.myForumData,
      }
    }

    console.log(nextProps)
    console.log(prevState)
    console.log(stateToBeReturned)
    return stateToBeReturned
  }

  render() {
    // if (this.props.thisData == 0) {
    //   return <></>
    // }
    return (
      <>
        {this.state.myForumData.length == 0 ? (
          <h5 className="text-center text-mywhite mx-auto">
            尚無紀錄，趕快
            <a href="/forum" style={{ color: '#ffa510' }}>
              前往論壇
            </a>
            發表評論吧！
          </h5>
        ) : (
          <table class="table table-borderless text-center h5">
            <thead>
              <tr
                className="text-center"
                style={{ border: '2px solid #ffa510 ', color: '#ffa510' }}
              >
                <th style={{ width: '60px' }}>#</th>
                <th scope="col-lg-5">文章標題</th>
                <th scope="col-lg-2">留言數</th>
                <th scope="col-lg-5">發布日期</th>
              </tr>
            </thead>
            <tbody className="bg-back-table text-mywhite">
              {this.state.myForumData.map((item, index) => (
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
                    <a href={'/forum/' + item.id}>{item.headline}</a>
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                    }}
                  >
                    {item.forumCommentArea.length}
                  </td>
                  <td
                    style={{
                      borderLeft: '2px solid #2B333D',
                      borderRight: '2px solid #2B333D',
                    }}
                  >
                    {item.forumCreateDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    )
  }
}
export default MemberCollectTable
