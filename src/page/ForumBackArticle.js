import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ForumBackPageButton from '../component/Forum/ForumBackMainPage/ForumBackPageButton'
class ForumBackMainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      myPostRecord: [],
      ForumTotalPages: 0,
      cuerrenPageFirstData: [],
      forumBackArticlePages: 0,
      BackCurrentPage: 0,
      forumBackReverse: [],
      BacknowIDdata: {},
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const PostRecord = data.filter(
        item => item.forumNameId === sessionStorage.getItem('memberId')
      )

      // console.log(data)
      // console.log(PostRecord)
      this.setState({
        myPostRecord: PostRecord,
        forumBackArticlePages: PostRecord.length,
      })

      const listdatareverse = this.state.myPostRecord.reverse().slice(0, 10)
      // console.log(listdatareverse)

      // 用來裝目前要顯示左側列表的資料
      await this.setState({ forumBackReverse: listdatareverse })
      console.log(this.state.forumBackReverse)
    } catch (err) {
      console.log(err)
    }
  }

  handleNowPageNumber = async e => {
    // 可從handleNowPageNumber去撈到動做
    console.log(+e.target.innerText)
    // 抓到目前點選button的頁碼轉為數字
    // 偵測目前總共資料筆數/10後變成每頁10比後去改變渲染資料左邊列表每次顯示比數
    // 再用handleNowPageNumber FUNCTION去撈到ForumPage偷渡回來的目前頁面數字最後可以帶入下方計算用

    // 抓到當下頁面就存進state給選擇一頁下一頁參照用
    this.setState({ BackCurrentPage: Number(e.target.innerText) })

    // 計算陣列複製起始索引用來接下slice
    // 陣列起始索引
    const pagesideListDataStart = Number(e.target.innerText - 1) * 10
    // 陣列結束索引
    const pagesideListDataEnd = pagesideListDataStart + 10
    // console.log(pagesideListDataStart)
    // 計算陣列結束索引用來接下slice

    // this.setState({

    const maxEndlength = this.state.myPostRecord.length
    // 這邊不像didmount相同要reverse，因為頁碼產生的數值是從1開始
    // 對應到的10筆資料會是從前面開始，這樣render頁面資訊就會反過來變成最舊的擺最前面
    // 所以取消reverse讓他頁碼1對照的是最後10筆資料
    // console.log(maxEndlength)
    // 如果總比數的數量小於pagesideListDataEnd最後中的數字就會產生陣列撈到是空的，因此當最後一頁的時候是撈總資料的長度當最後斷點
    const listdatareverse = this.state.myPostRecord.slice(
      pagesideListDataStart,
      maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
    )
    // console.log(listdatareverse)
    // console.log(listdatareverse[0].id)

    // 用來裝目前要顯示左側列表的資料
    await this.setState({
      forumBackReverse: listdatareverse,
      BacknowIDdata: listdatareverse[0],
    })
    console.log(this.state.forumBackReverse)
    console.log(this.state.BacknowIDdata)
    // await this.setState({
    //   currentcommentApi: listdatareverse[0].forumCommentArea,
    // })
  }

  handlePrevPage = async e => {
    // 控制頁數小於1產生錯誤
    if (this.state.BackCurrentPage > 1) {
      const newCurrentPage = this.state.BackCurrentPage - 1
      console.log(newCurrentPage)

      // 因為資料室反握來到的所以第一筆資料應該是往回加，待確認邏輯
      // const newCurrentPageLastdataId = this.state.BackCurrentPage + 1

      // 點了上一頁馬上存入state
      await this.setState({
        // 如果頁面=0就顯示1
        BackCurrentPage: newCurrentPage,
      })
      // 這次已經有參照newCurrentPagr可以丟了
      const pagesideListDataStart = (newCurrentPage - 1) * 10
      const pagesideListDataEnd = pagesideListDataStart + 10

      const maxEndlength = this.state.myPostRecord.length
      const listdatareverse = this.state.myPostRecord.slice(
        pagesideListDataStart,
        maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
      )
      await this.setState({
        forumBackReverse: listdatareverse,
        BacknowIDdata: listdatareverse[0],
        // currentLastDataId: +listdatareverse[0].id,
      })
    }
  }
  handleNextvPage = async e => {
    // 點了下一頁馬上存入state
    // 計算總頁數
    const maxPages = Math.ceil(this.state.myPostRecord.length / 10)
    console.log(this.state.myPostRecord)
    // 總頁數有筆目前頁碼大才可執行
    if (this.state.BackCurrentPage < maxPages) {
      const newCurrentPage = this.state.BackCurrentPage + 1

      // 因為資料室反握來到的所以第一筆資料應該是往回加，待確認邏輯
      // const newCurrentPageLastdataId = this.state.BackCurrentPage - 1

      await this.setState({
        // 如果頁面=0就顯示1
        BackCurrentPage: newCurrentPage,
        // / 目前資料頁最後一筆ID拿來連接設定LINKID，待確認邏輯
        // currentLastDataId: newCurrentPageLastdataId,
      })
      // 這次已經有參照newCurrentPagr可以丟了
      const pagesideListDataStart = (newCurrentPage - 1) * 10
      const pagesideListDataEnd = pagesideListDataStart + 10

      const maxEndlength = this.state.myPostRecord.length
      const listdatareverse = this.state.myPostRecord.slice(
        pagesideListDataStart,
        maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
      )
      await this.setState({
        forumBackReverse: listdatareverse,
        BacknowIDdata: listdatareverse[0],
      })
    }
  }

  render() {
    const tdStyle = {
      // 下方style轉放scss
      borderBottom: 'solid 4px',
      borderLeft: 'solid 4px',
      borderColor: '#2B333D',
      color: '#D4D1CC',
      padding: '8px 16px',
      borderTop: '0px,',
    }
    const thStyle = {
      // 下方style轉放scss
      borderTop: 'solid 2px',
      borderBottom: 'solid 0px',
      borderLeft: ' 2px transparent',
      borderColor: '#FFA510',
      color: '#FFA510',
      // backgroundColor: 'rgba(0,0,0,1)',
      backgroundColor: '#2B333D',
      textAlign: 'center',
      padding: '8px 16px',
      // margin: '3px auto',
      zIndex: '10',
    }
    return (
      <>
        <div className="col-md-12 p-0 my-5">
          <div className="" style={{ height: '450px' }}>
            <table className="table table-dark m-0 border-0 ">
              <thead className=" border-0">
                <tr className="mb-5 border-0">
                  <th scope="col" style={thStyle}>
                    文章編號
                  </th>
                  <th scope="col" style={thStyle}>
                    標題
                  </th>
                  <th scope="col" style={thStyle}>
                    發文日期
                  </th>
                  <th scope="col" style={thStyle}>
                    留言數
                  </th>
                  <th scope="col" style={thStyle}>
                    推數
                  </th>
                  <th scope="col" style={thStyle}>
                    前往文章
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.forumBackReverse.map((e, index) => (
                  <tr className="text-center" key={e.id}>
                    <th scope="row" style={tdStyle}>
                      {e.id}
                    </th>
                    <td className="" style={tdStyle}>
                      {e.headline}
                    </td>
                    <td className="" style={tdStyle}>
                      {e.forumCreateDate}
                    </td>
                    <td className="" style={tdStyle}>
                      {e.forumCommentCount}
                    </td>
                    <td className="" style={tdStyle}>
                      {e.forumViews}
                    </td>

                    <td className="" style={tdStyle}>
                      <div className="m-0 p-0 d-flex justify-content-center">
                        <Link
                          to={'/forum/' + e.id}
                          className=" mr-2 p-0"
                          style={{ color: '#FFA510' }}
                        >
                          <i class="fas fa-eye" />
                        </Link>
                        {/* <Link
                        to=""
                        className=" ml-2 p-0"
                        style={{ color: '#FFA510' }}
                      >
                        <i class="fas fa-trash-alt" />
                      </Link> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between  m-0 w-100">
            <div className="m-5 p-0  d-flex justify-content-center w-100">
              <ForumBackPageButton
                forumBackArticlePages={this.state.forumBackArticlePages}
                ForumTotalPages={this.state.ForumTotalPages}
                // 將目前頁數的資料傳下去給button偵測回傳的路徑為哪個id

                handleNowPageNumber={this.handleNowPageNumber}
                // 上一頁功能
                handlePrevPage={this.handlePrevPage}
                // 下一頁功能
                handleNextvPage={this.handleNextvPage}
                // 目前頁面，寫判斷式用
                forumBackReverse={this.state.forumBackReverse}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ForumBackMainpage
