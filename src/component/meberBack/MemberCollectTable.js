import React from 'react'

class MemberCollectTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thisData: 0,
      thisCollectArticleData: 0,
    }
  }

  async componentDidMount() {}
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('childDerived')
    // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
    let stateToBeReturned = null
    if (prevState.thisData == 0 || prevState.thisCollectArticleData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        thisCollectArticleData: nextProps.thisCollectArticleData,
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
            </tr>
          </thead>
          <tbody className="bg-back-table text-mywhite">
            {this.state.thisCollectArticleData.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: '2px solid #2B333D',
                }}
              >
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={'/article/' + item.id}>{item.title}</a>
                </td>
                <td>{item.author}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}
export default MemberCollectTable
