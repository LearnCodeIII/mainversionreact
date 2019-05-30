import React from 'react'
import { Row } from 'react-bootstrap'

const InputRadio_Su = props => {
  const handleNameClick = id => event => {
    console.log('123')
    // console.log(props.thisData)
    event.target.previousSibling.click(id)
    //   document.querySelector('#' + id).click()
  }
  const handleClick = id => event => {
    let thisRadio = document.querySelector('#' + id)
    let RadiosBtn = [...document.getElementsByName('radio-btn')]
    // console.log(thisRadio)
    // console.log(RadiosBtn)
    // console.log(event.target)
    // console.log(event.target.parentNode)
    // console.log(event.target.value)
    thisRadio.click()
    RadiosBtn.map(
      btn =>
        (btn.className =
          'ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-darkblue text-mywhite mytransition5')
    )
    if (event.target.name !== 'radio-btn') {
      event.target.parentNode.className =
        'ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-orange text-darkblue mytransition5'
    } else {
      event.target.className =
        'ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-orange text-darkblue mytransition5'
    }
  }
  return (
    <>
      <Row className="mx-0 px-0 col-lg-12 d-flex justify-content-between align-items-center">
        {props.selectOptions.map(item => (
          <>
            <div
              // className="custom-control custom-radio custom-control-inline col-2 mx-0 pr-0"
              key={item.id}
              className={
                'custom-control custom-radio custom-control-inline mx-0 pr-0 align-items-center ' +
                (props.col ? props.col : 'col-2')
              }
              style={{
                height: `${props.inputHeight}`,
              }}
            >
              <input
                type="radio"
                id={item.id}
                name={props.id}
                onChange={props.onChange}
                className="custom-control-input"
                display="none"
              />
              <label className="custom-control-label ml-1" htmlFor={item.id} />
              {/* <button
                name="radio-btn"
                className="px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite"
                style={{
                  width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                  height: `${props.inputHeight}`,
                  left: '-1px',
                }}
                onClick={handleClick(`${item.id}`)}
              >
                {item.name}
              </button> */}
              {props.value === item.id ? (
                <button
                  name="radio-btn"
                  className="ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-orange text-darkblue mytransition5"
                  style={{
                    width: '48px',
                    height: '48px',
                    left: '-20px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  <i
                    className={item.iconL}
                    style={{ fontSize: `${item.iconLS}` }}
                  />
                </button>
              ) : (
                <button
                  name="radio-btn"
                  className="ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-darkblue text-mywhite mytransition5"
                  style={{
                    width: '48px',
                    height: '48px',
                    left: '-20px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  <i
                    className={item.iconL}
                    style={{ fontSize: `${item.iconLS}` }}
                  />
                </button>
              )}
              {/* <button
                name="radio-btn"
                className="ml-3 px-3 py-2 position-absolute border border-warning rounded-circle bg-darkblue text-mywhite"
                style={{
                  width: '48px',
                  height: '48px',
                  left: '-20px',
                }}
                onClick={handleClick(`${item.id}`)}
              >
                <i className={item.iconL} style={{ fontSize: `${item.iconLS}` }} />
              </button> */}
              <span
                className="pl-5"
                style={{ cursor: 'pointer' }}
                onClick={handleNameClick(`${item.id}`)}
              >
                {item.name}
              </span>
            </div>
          </>
        ))}
      </Row>
    </>
  )
}

export default InputRadio_Su
