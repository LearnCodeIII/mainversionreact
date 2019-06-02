import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ForumBackPageButtonComment from '../component/Forum/ForumBackMainPage/ForumBackPageButtonComment'
class ForumBackComment extends React.Component {
  constructor() {
    super()
    this.state = {
      // 所有符合SESSION ID的陣列
      myForumComment: [],
      // 對應上面每筆陣列的索引值，與上面陣列的長度會相同
      // 因為同時將當筆陣列與當筆索引值分開儲存
      // Map時可利用相同index的特性去分別撈到當篇符合SESSION的留言是第幾筆
      myForumCommentIndex: [],

      ForumTotalPages: 0,
      cuerrenPageFirstData: [],
      forumBackArticlePages: 0,
      BackCurrentPage: 0,
      // 放被slice過後的10筆陣列
      forumBackReverse: [],
      // 透過myForumCommentIndex根據切換不同頁回傳的pageNUm去slice要撈出來的10筆索引陣列
      currentSwitchIndex: [],
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

      // 建立兩個陣列分別同時丟入符合seesion的文章與該邊文章留言的索引值所在
      const commentOfArticle = []
      const cIndex = []
      for (let i = 0; i < data.length; i++) {
        // 每老一筆上層文章往下丟一層
        const filterOne = data[i]
        // console.log(filterOne)

        for (let j = 0; j < filterOne.forumCommentArea.length; j++) {
          // 將上層文章內的留言陣列一筆一筆往下判斷是否有符合session
          const filterTwo = filterOne.forumCommentArea[j]
          // console.log(filterTwo)
          if (
            filterTwo.forumCommentUserId === sessionStorage.getItem('memberId')
          ) {
            // 符合得馬上push進陣列
            // 因每一筆篩下來當下是相同索引值
            // 用這特性存如陣列，後續在map的時候拿文章陣列往下篩到流言陣列後再用map的索引值去撈這裡存好的索引值
            commentOfArticle.push(filterOne)
            cIndex.push(j)
            // console.log(filterOne)
          }
        }
      }

      // TODO:因為原本是用全部陣列索引現在改成一次指頭10頁就會有問題
      // 用點選頁碼回傳把myForumCommentIndex這陣列也slice切割到對應索引值預設可以0-10
      // 當點選分頁按鈕後控制回傳的值去改變slice索引
      // console.log(commentOfArticle)
      // AWAIT否則後面會MAP出錯
      const maxIndexLength = cIndex.length
      console.log(maxIndexLength)
      await this.setState({
        // myForumComment: commentOfArticle,
        // 因為資料是反著倒的所以要reverse方便後續使用
        myForumCommentIndex: cIndex,
        currentSwitchIndex: cIndex.slice(
          0,
          maxIndexLength < 10 ? maxIndexLength : 10
        ),
      })

      // console.log(cIndex.slice(0, 10))
      // console.log(this.state.currentSwitchIndex)
      await this.setState({
        myCommentRecord: commentOfArticle,
        forumBackArticlePages: commentOfArticle.length,
      })
      console.log(this.state.myCommentRecord)
      // 如果初始最後一頁長度不足10筆就要判斷顯示單頁上限的slice值不然會有問題
      const maxSlice = this.state.myCommentRecord.length
      console.log(maxSlice)
      const listdatareverse = this.state.myCommentRecord
        .reverse()
        .slice(0, maxSlice < 10 ? maxSlice : 10)
      // console.log(commentOfArticle.length % 10)
      // console.log(listdatareverse)

      // 如果初始最後一頁長度不足10筆就要判斷顯示單頁上限的slice值不然會有問題
      // 對應的索引陣列也一樣
      const maxSliceIndex = cIndex
        .reverse()
        .slice(0, maxIndexLength < 10 ? maxIndexLength : 10)
      console.log(cIndex.length % 10)

      // 用來裝目前要顯示左側列表的資料
      await this.setState({
        forumBackReverse: listdatareverse,
        currentSwitchIndex: maxSliceIndex,
      })
      console.log(this.state.forumBackReverse)

      console.log(this.state.currentSwitchIndex)
    } catch (err) {
      console.log(err)
    }
  }

  handleNowPageNumber = async e => {
    // 可從handleNowPageNumber去撈到動做
    console.log(e.target)

    // innerText一定要先定義否則會抓到null
    // const noewPageNumber = Number(e.target.innerText)

    // 抓到目前點選button的頁碼轉為數字
    // 偵測目前總共資料筆數/10後變成每頁10比後去改變渲染資料左邊列表每次顯示比數
    // 再用handleNowPageNumber FUNCTION去撈到ForumPage偷渡回來的目前頁面數字最後可以帶入下方計算用
    // 抓到當下頁面就存進state給選擇一頁下一頁參照用
    await this.setState({ BackCurrentPage: Number(e.target.innerText) })

    console.log(this.state.BackCurrentPage)

    // -------------------------------------------------------留言陣列切換start
    // 計算陣列複製起始索引用來接下slice
    // 陣列起始索引
    const pagesideListDataStart = (this.state.BackCurrentPage - 1) * 10
    // 陣列結束索引
    const pagesideListDataEnd = pagesideListDataStart + 10
    console.log(pagesideListDataStart)
    console.log(pagesideListDataEnd)
    // 計算陣列結束索引用來接下slice

    // this.setState({

    const maxEndlength = this.state.myCommentRecord.length
    // 這邊不像didmount相同要reverse，因為頁碼產生的數值是從1開始
    // 對應到的10筆資料會是從前面開始，這樣render頁面資訊就會反過來變成最舊的擺最前面
    // 所以取消reverse讓他頁碼1對照的是最後10筆資料
    // console.log(maxEndlength)
    // 如果總比數的數量小於pagesideListDataEnd最後中的數字就會產生陣列撈到是空的，因此當最後一頁的時候是撈總資料的長度當最後斷點
    const listdatareverse = this.state.myCommentRecord.slice(
      pagesideListDataStart,
      maxEndlength < pagesideListDataEnd ? maxEndlength : pagesideListDataEnd
    )
    // console.log(listdatareverse)
    // console.log(listdatareverse[0].id)
    // alert('123')
    this.setState({
      forumBackReverse: listdatareverse,
      BacknowIDdata: listdatareverse[0],
    })
    console.log(this.state.forumBackReverse)
    // -------------------------------------------------------留言陣列切換end

    const indexStart = pagesideListDataStart
    const indexEnd = indexStart + 10
    // 判斷資料長度有沒有超過可以slice的範圍
    console.log(this.state.myForumCommentIndex.length)
    const indexOnPageButtonClick = this.state.myForumCommentIndex.slice(
      indexStart,
      this.state.myForumCommentIndex.length < indexEnd
        ? this.state.myForumCommentIndex.length
        : indexEnd
    )
    console.log(indexOnPageButtonClick)
    this.setState({ currentSwitchIndex: indexOnPageButtonClick })
    console.log(indexStart)
    // console.log(indexOnPageButtonClick)
    // 用來裝目前要顯示左側列表的資料

    console.log(this.state.currentSwitchIndex)
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

      const maxEndlength = this.state.myCommentRecord.length
      const listdatareverse = this.state.myCommentRecord.slice(
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
    const maxPages = Math.ceil(this.state.myCommentRecord.length / 10)
    console.log(this.state.myCommentRecord)
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

      const maxEndlength = this.state.myCommentRecord.length
      const listdatareverse = this.state.myCommentRecord.slice(
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
          <div
            className={
              this.state.myForumCommentIndex.length === 0
                ? ' d-flex align-items-center'
                : ''
            }
            style={{ height: '450px' }}
          >
            {this.state.myForumCommentIndex.length === 0 ? (
              <h5 className="text-center text-mywhite mx-auto">
                尚無紀錄，趕快
                <a href="/forum" style={{ color: '#ffa510' }}>
                  前往論壇
                </a>
                留言吧！
              </h5>
            ) : (
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col" style={thStyle}>
                      留言文章編號
                    </th>
                    <th scope="col" style={thStyle}>
                      文章標題
                    </th>
                    {/* <th scope="col" style={thStyle}> */}
                    {/* 留言日期 */}
                    {/* </th> */}
                    {/* <th scope="col" style={thStyle}> */}
                    {/* 推數 */}
                    {/* </th> */}
                    {/* <th scope="col" style={thStyle}> */}
                    {/* 噓數 */}
                    {/* </th> */}
                    <th scope="col" style={thStyle}>
                      前往該留言
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.forumBackReverse.map((e, index) => (
                    <>
                      {/* {console.log(this.state.forumBackReverse)} */}
                      {console.log(e)}
                      {/* {console.log(this.state.currentSwitchIndex[index])} */}
                      {/* key藥用唯一的。 */}
                      <tr
                        className="text-center"
                        key={e.forumCreateDateInSecond}
                      >
                        <th scope="row" style={tdStyle}>
                          {e.id}
                        </th>
                        <td className="" style={tdStyle}>
                          {e.headline}
                        </td>
                        {/* <td className="" style={tdStyle}> */}
                        {/* 如撈資料時所描述利用目前map索引值當index去撈之前存好陣列的索引值，再帶入這裡當索引值 */}
                        {/* { */}
                        {/* e.forumCommentArea[ */}
                        {/* this.state.currentSwitchIndex[index] */}
                        {/* ].forumCommentCreateTimeDate */}
                        {/* } */}
                        {/* </td> */}
                        {/* <td className="" style={tdStyle}> */}
                        {/* {e.forumCommentArea.forumCommentLike} */}
                        {/* </td> */}
                        {/* <td className="" style={tdStyle}> */}
                        {/* {e.forumCommentArea.forumCommentDislike} */}
                        {/* </td> */}
                        <td className="" style={tdStyle}>
                          <div className="m-0 p-0 d-flex justify-content-center">
                            <Link
                              to={'/forum/' + e.id}
                              className=" mr-2 p-0"
                              style={{ color: '#FFA510' }}
                              onClick={this.forumArticleId}
                            >
                              <i class="fas fa-eye" />
                            </Link>
                            {/* <Link
                          to="/forum/"
                          className=" ml-2 p-0"
                          style={{ color: '#FFA510' }}
                        >
                          <i class="fas fa-trash-alt" />
                        </Link> */}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="d-flex justify-content-between  m-0 w-100">
            <div className="m-5 p-0  d-flex justify-content-center w-100">
              <ForumBackPageButtonComment
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
export default ForumBackComment
