import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import PieClass from './ActivityD3'
import ActivityTitle from '../ActivityTitle/ActivityTitle'

class ActivityD3root extends React.Component {
  constructor() {
    super()
    this.state = {
      totalCountData: [
        { cinemaD3guessLook: 0, value: 0 },
        { cinemaD3memberLook: 0, value: 0 },
        { cinemaD3memberJoin: 0, value: 0 },
        { cinemaD3memberCancel: 0, value: 0 },
      ],
      totalPercentData: [
        { cinemaD3guessLook: 0, value: 0 },
        { cinemaD3memberLook: 0, value: 0 },
        { cinemaD3memberJoin: 0, value: 0 },
        { cinemaD3memberCancel: 0, value: 0 },
      ],
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:5555/cinema/' + sessionStorage.getItem('cinemaId'))
      .then(res => res.json())
      .then(res => {
        let data = JSON.parse(JSON.stringify(this.state.totalCountData))
        let newData = JSON.parse(JSON.stringify(res))
        let totalValue =
          newData.cinemaD3guessLook +
          newData.cinemaD3memberLook +
          newData.cinemaD3memberJoin +
          newData.cinemaD3memberCancel
        totalValue = JSON.parse(JSON.stringify(totalValue))
        console.log(totalValue)
        data[3].value = newData.cinemaD3guessLook / totalValue
        data[2].value = newData.cinemaD3memberLook / totalValue
        data[1].value = newData.cinemaD3memberJoin / totalValue
        data[0].value = newData.cinemaD3memberCancel / totalValue
        this.setState({ totalPercentData: data })
      })
    fetch('http://localhost:5555/cinema/' + sessionStorage.getItem('cinemaId'))
      .then(res => res.json())
      .then(res => {
        let data = JSON.parse(JSON.stringify(this.state.totalCountData))
        let newData = JSON.parse(JSON.stringify(res))
        data[3].value = newData.cinemaD3guessLook
        data[2].value = newData.cinemaD3memberLook
        data[1].value = newData.cinemaD3memberJoin
        data[0].value = newData.cinemaD3memberCancel
        this.setState({ totalCountData: data })
      })
  }

  render() {
    return (
      <div id="root">
        <div className="row">
          <div className="col-md-12 p-0">
            <ActivityTitle title="歷史總活動流量" />
          </div>
          <div className="col-md-5 mt-5">
            <PieClass
              data={this.state.totalPercentData}
              width={450}
              height={450}
              innerRadius={40}
              outerRadius={160}
            />
          </div>
          <div className="col-md-7 mt-5">
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#9ecae1',
                }}
              />
              <span style={{ fontSize: '24px' }}>
                訪客觀看人次：
                {`${this.state.totalCountData[3].value}
                   人，約( 
                  ${Math.round(this.state.totalPercentData[3].value * 100)} 
                  % )`}
              </span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#c6dbef',
                }}
              />
              <span style={{ fontSize: '24px' }}>
                會員觀看人次：
                {`${this.state.totalCountData[2].value}
                   人，約( 
                  ${Math.round(this.state.totalPercentData[2].value * 100)} 
                  % )`}
              </span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#deebf7',
                }}
              />
              <span style={{ fontSize: '24px' }}>
                會員報名人次：
                {`${this.state.totalCountData[1].value}
                   人，約( 
                  ${Math.round(this.state.totalPercentData[1].value * 100)} 
                  % )`}
              </span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#f7fbff',
                }}
              />
              <span style={{ fontSize: '24px' }}>
                報名取消人次：
                {`${this.state.totalCountData[0].value}
                   人，約( 
                  ${Math.round(this.state.totalPercentData[0].value * 100)} 
                  % )`}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<ActivityD3root />, rootElement)
export default ActivityD3root
