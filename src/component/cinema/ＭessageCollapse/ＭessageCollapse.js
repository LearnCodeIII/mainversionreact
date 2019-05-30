import React from 'react'
import { Collapse } from 'react-bootstrap'
import MessageCinemna from '../MessageSM/MessageCinema'

class ＭessageCollapse extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      //  collapse預設參數:有幾月這裡就要有幾個
      open3: false,
    }
  }

  // 寫一個function限制留言區只能有幾筆
  // 把筆數上傳到this.state
  // 然後顯示更多onClick就改變this.state的筆數進而渲染

  render() {
    // collapse預設參數:建立open變數裝this.state
    const { open3 } = this.state
    // 1.對留言資料做map塞進新的array-1中, 同時對留言時間數字做月份轉換, 取得該留言是幾月留的言
    // 2.對每筆留言的月份做map, 丟到setState上(先丟一筆) 如果接下來有資料不等於setState月的任何一筆 就新增一筆set上去
    //   這樣就算取得擁有的全部月份, 來map建立collapse需要的const和控制列與內容列以及this,state
    //   但是this.state裡面的月份要一開始就建立, 正在考慮上一層也做一次月份計算然後把它包成object傳進來
    //   又或者是打從一開始新增的時候就先getMonth()+1存到資料庫一個欄位, 然候就可以判斷如果有留言月份的欄位不重覆就setState上去
    //   大概是這樣setState({月份：[ {留言資料包成的物件} , {留言資料包成的物件} , {留言資料包成的物件} ]})
    // 3.對array-1裡面全部留言做find找到是哪個月份的留言然後在map進該月的內容列

    // 月份轉換
    // 撈資料運算有幾個月份
    // 判斷資料的月份並進行分類
    // 把留言時間數字塞進new Date(數字)然後用個變數裝 取得可閱讀模樣
    // 然後對可閱讀模樣的變數做getMonth()+1即可取得月份
    // 然後限制最多顯示六個月 超過的資料就不要 可用三元運算子來過濾
    // 先前寫的資料筆數限制邏輯如下
    // const newData = []
    // this.state.cardData.map((item, index) => {
    //     if (index < 4) newData.push(item)
    // })

    // 留言筆數計算
    // 用上面的this.state的比數運算能顯示幾筆(搭配上面的function)
    return (
      <>
        {/*  collapse預設參數:每個月份都有自己的控制列 */}
        <div
          onClick={() => this.setState({ open3: !open3 })}
          aria-controls="messageMonth3"
          aria-expanded={open3}
          style={{ height: '50px', fontSize: '30px' }}
          className="text-center bg-warning text-dark"
        >
          月份
        </div>
        {/*  collapse預設參數:每個月份也都有自己的內容列
                所以算出有幾個月份然後塞控制列跟內容列進來顯示幾列
                最多顯示6個月 */}
        <Collapse in={this.state.open3}>
          <div
            className=" p-0 d-flex flex-wrap overflow-hidden"
            id="messageMonth3"
          >
            {/* 對該月份留言區進行map吧
                        上面一定要先運算到資料只有6筆
                        若是總筆數超過就按顯示更多來啟動function增加this.state的筆數
                        進而改變運算結果變成資料有12筆讓這邊map出來
                        請參考上方的資料筆數限制邏輯 */}
            <MessageCinemna
              img="http://localhost:3000/images/cinemaImg/asian.jpg"
              message="嘎嘎嘎我要留爆這邊"
              name="東尼大木"
              awesome="54"
              boo="897867"
              time="1558494913221"
            />
          </div>
        </Collapse>
      </>
    )
  }
}

export default ＭessageCollapse
