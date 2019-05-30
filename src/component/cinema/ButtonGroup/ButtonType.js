import React from 'react'
class ButtonType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  click = event => {
    if (
      // 選取全部
      event.target.id === 't0' &&
      event.target.className === 'btn btn-outline-warning'
    ) {
      document.querySelector('#t0').className = 'btn btn-warning'
      document.querySelector('#t1').className = 'btn btn-warning'
      document.querySelector('#t2').className = 'btn btn-warning'
      document.querySelector('#t3').className = 'btn btn-warning'
      document.querySelector('#t4').className = 'btn btn-warning'
      document.querySelector('#t5').className = 'btn btn-warning'
      this.props.TypeSearchClick(event.target.value, 'allplus')
    } else if (
      event.target.id === 't0' &&
      event.target.className === 'btn btn-warning'
    ) {
      document.querySelector('#t0').className = 'btn btn-outline-warning'
      document.querySelector('#t1').className = 'btn btn-outline-warning'
      document.querySelector('#t2').className = 'btn btn-outline-warning'
      document.querySelector('#t3').className = 'btn btn-outline-warning'
      document.querySelector('#t4').className = 'btn btn-outline-warning'
      document.querySelector('#t5').className = 'btn btn-outline-warning'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.TypeSearchClick(event.target.value, 'alldel')
    } else if (
      event.target.id !== 't0' &&
      event.target.className === 'btn btn-outline-warning'
    ) {
      // 判斷是否為按下狀態
      //先改變按鈕狀態
      document.querySelector('#t0').className = 'btn btn-outline-warning'
      document.querySelector('#' + event.target.id).className =
        'btn btn-warning'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.TypeSearchClick(event.target.value, 'plus')
    } else {
      //先改變按鈕狀態
      document.querySelector('#t0').className = 'btn btn-outline-warning'
      document.querySelector('#' + event.target.id).className =
        'btn btn-outline-warning'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.TypeSearchClick(event.target.value, 'del')
    }
  }
  render() {
    return (
      <>
        <button
          id="t0"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="全選"
        >
          全選
        </button>
        <button
          id="t1"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="藝廊"
        >
          藝廊
        </button>
        <button
          id="t2"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="酒吧"
        >
          酒吧
        </button>
        <button
          id="t3"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="餐廳"
        >
          餐廳
        </button>
        <button
          id="t4"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="影院"
        >
          影院
        </button>
        <button
          id="t5"
          type="button"
          class="btn btn-warning"
          onClick={this.click}
          value="咖啡廳"
        >
          咖啡廳
        </button>
      </>
    )
  }
  // 在元件完成載入時fetch cinema的資料撈進來丟到state
  // cinema.json的資料為
  async componentDidMount() {}
}
export default ButtonType
