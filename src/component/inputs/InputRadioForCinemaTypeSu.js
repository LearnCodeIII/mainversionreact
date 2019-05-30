import React from 'react'
import { Row } from 'react-bootstrap'
const handleClick = id => event => {
  let thisRadio = document.querySelector('#' + id)
  let RadiosBtn = [...document.getElementsByName('radio-btn')]
  //   console.log(thisRadio)
  //   console.log(RadiosBtn)

  thisRadio.click()
  RadiosBtn.map(
    btn =>
      (btn.className =
        'px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite mytransition5')
  )
  event.target.className =
    'px-2 position-absolute rounded border border-warning bg-orange text-darkblue mytransition5'
}
const InputRadio_Su = props => {
  return (
    <>
      <Row className="mx-0 px-0 col-lg-12 d-flex justify-content-between align-items-center">
        {props.selectOptions.map(item => (
          <>
            <div
              key={item.id}
              // className="custom-control custom-radio custom-control-inline col-2 mx-0 pr-0"
              className={
                'custom-control custom-radio custom-control-inline mx-0 pr-0  ' +
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

              <label className="custom-control-label" htmlFor={item.id} />
              {props.value === item.id ? (
                <button
                  name="radio-btn"
                  className="px-2 position-absolute rounded border border-warning bg-orange text-darkblue mytransition5"
                  style={{
                    width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                    height: `${props.inputHeight}`,
                    left: '-1px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  {item.name}
                </button>
              ) : (
                <button
                  name="radio-btn"
                  className="px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite mytransition5"
                  style={{
                    width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                    height: `${props.inputHeight}`,
                    left: '-1px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  {item.name}
                </button>
              )}
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
            </div>
          </>
        ))}
      </Row>

      {/* <div className="custom-control custom-radio custom-control-inline col-3">
        <input
          type="radio"
          id="customRadioInline2"
          name="customRadioInline1"
          className="custom-control-input"
        />

        <label className="custom-control-label" htmlFor="customRadioInline2" />
        <button
          name="radio-btn"
          className="px-3 position-absolute rounded border border-warning bg-darkblue font-c-primary"
          style={{
            height: `${props.inputHeight}`,
            left: '-14px',
          }}
          onClick={handleClick('customRadioInline2')}
        >
          我是按紐222
        </button>
      </div> */}
    </>
  )
}

export default InputRadio_Su
