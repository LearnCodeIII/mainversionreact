import React from 'react'
class ButtonCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  click = event => {
    if (
      // 選取全部
      event.target.id == 'b0' &&
      event.target.className == 'btn btn-outline-warning mr-2'
    ) {
      document.querySelector('#b0').className = 'btn btn-warning mr-2'
      document.querySelector('#b1').className = 'btn btn-warning mr-2'
      document.querySelector('#b2').className = 'btn btn-warning mr-2'
      document.querySelector('#b3').className = 'btn btn-warning mr-2'
      document.querySelector('#b4').className = 'btn btn-warning mr-2'
      this.props.CitySearchClick(event.target.value, 'allplus')
    } else if (
      event.target.id == 'b0' &&
      event.target.className == 'btn btn-warning mr-2'
    ) {
      document.querySelector('#b0').className = 'btn btn-outline-warning mr-2'
      document.querySelector('#b1').className = 'btn btn-outline-warning mr-2'
      document.querySelector('#b2').className = 'btn btn-outline-warning mr-2'
      document.querySelector('#b3').className = 'btn btn-outline-warning mr-2'
      document.querySelector('#b4').className = 'btn btn-outline-warning mr-2'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.CitySearchClick(event.target.value, 'alldel')
    } else if (
      event.target.id !== 'b0' &&
      event.target.className == 'btn btn-outline-warning mr-2'
    ) {
      // 判斷是否為按下狀態
      //先改變按鈕狀態
      document.querySelector('#b0').className = 'btn btn-outline-warning mr-2'
      document.querySelector('#' + event.target.id).className =
        'btn btn-warning mr-2'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.CitySearchClick(event.target.value, 'plus')
    } else {
      document.querySelector('#b0').className = 'btn btn-outline-warning mr-2'
      //先改變按鈕狀態
      document.querySelector('#' + event.target.id).className =
        'btn btn-outline-warning mr-2'
      //然後傳按下去的那個按鈕的值回老闆層 給他一個加或減的屬性
      this.props.CitySearchClick(event.target.value, 'del')
    }
  }

  render() {
    return (
      <div className="flex-wrap">
        <button
          id="b0"
          type="button"
          class="btn btn-warning mr-2"
          onClick={this.click}
          value="全選"
        >
          全選
        </button>
        <button
          id="b1"
          type="button"
          class="btn btn-warning mr-2"
          onClick={this.click}
          value="北部"
        >
          北部
        </button>
        <button
          id="b2"
          type="button"
          class="btn btn-warning mr-2"
          onClick={this.click}
          value="中部"
        >
          中部
        </button>
        <button
          id="b3"
          type="button"
          class="btn btn-warning mr-2"
          onClick={this.click}
          value="南部"
        >
          南部
        </button>
        <button
          id="b4"
          type="button"
          class="btn btn-warning mr-2"
          onClick={this.click}
          value="東部"
        >
          東部
        </button>
      </div>
    )
  }
  // 在元件完成載入時fetch cinema的資料撈進來丟到state
  // cinema.json的資料為
  async componentDidMount() {}
}
export default ButtonCity
