import React from 'react'
import { Row, Accordion, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const SidenavMenu_Su = props => {
  //   var path = window.location.pathname.slice(1)
  //   var show = false
  const handleLinkClick = id => event => {
    const AllOptions = [...document.getElementsByName('option-items')] //取得所有option的橘線div
    const AllOptionRows = [...document.getElementsByName('option-row')] //取得所有option的容器row
    const thisOptionLine = document.querySelector('#' + id) //取得目前點擊的option的橘線
    // console.log(AllOptions)
    // console.log(thisOptionLine)
    console.log(AllOptionRows)

    AllOptionRows.map(
      item => (item.style.background = '#30363D') //將所有option容器背景設為預設值
    )
    AllOptions.map(item => (item.style.opacity = 0)) //將所有option的橘線設為不顯示
    AllOptions.map(item => (item.style.margin = '0')) //將所有option的橘線設為不顯示
    thisOptionLine.style.opacity = 1 //將目前點擊的option橘線顯示
    thisOptionLine.style.marginLeft = '48px' //將目前點擊的option橘線顯示(設定margin)
    thisOptionLine.style.marginRight = '-16px' //將目前點擊的option橘線顯示(設定margin)
    // console.log(thisOptionLine.parentNode)
    thisOptionLine.parentNode.parentNode.style.background =
      'rgba(255,255,255,.3)' //取得目前點擊的option的父層(該option的容器Row)，設定背景為50%白

    // if(path===id)
    //  show = (path===id ? '4px': '0px')
    // console.log(path)
  }
  // console.log(props)
  // console.log(window)
  return (
    <>
      <Card className="text-center bg-darkblue h5">
        <Accordion.Toggle as={Card.Header} eventKey={props.id}>
          {props.title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.id}>
          <Card.Body className="py-0 px-0 h6">
            {props.options.map(item =>
              item.id === 'cinema-info-preview' ? (
                <Row
                  className="mytransition5"
                  name="option-row"
                  style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                >
                  {/* <div className="col-3" /> */}
                  <div className="py-3">
                    <div
                      name="option-items"
                      id={item.id}
                      className="mytransition5"
                      style={{
                        width: '4px',
                        height: '24px',
                        opacity: 1,
                        marginLeft: '0px',
                        background: '#ffa510',
                      }}
                    />
                  </div>
                  <Link
                    className="text-center col py-3"
                    to={'/CinemaBackMainpage/' + item.id}
                    onClick={handleLinkClick(item.id)}
                    // style={{width:'100%'}}
                  >
                    {item.name}
                  </Link>
                </Row>
              ) : (
                <Row
                  className="mytransition5"
                  name="option-row"
                  style={{ background: '#30363D' }}
                >
                  {/* <div className="col-3" /> */}
                  <div className="py-3">
                    <div
                      name="option-items"
                      id={item.id}
                      className="mytransition5"
                      style={{
                        width: '4px',
                        height: '24px',
                        opacity: 0,
                        marginLeft: '0px',
                        background: '#ffa510',
                      }}
                    />
                  </div>
                  <Link
                    className="text-center col py-3"
                    to={'/CinemaBackMainpage/' + item.id}
                    onClick={handleLinkClick(item.id)}
                    // style={{width:'100%'}}
                  >
                    {item.name}
                  </Link>
                </Row>
              )
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

export default SidenavMenu_Su
