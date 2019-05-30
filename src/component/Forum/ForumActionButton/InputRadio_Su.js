import React from 'react'
import { Row } from 'react-bootstrap'
const handleClick = id => event => {
  let thisRadio = document.querySelector('#' + id)
  let RadiosBtn = [...document.getElementsByName('radio-btn')]
  //   console.log(thisRadio)
  //   console.log(RadiosBtn)
  //   console.log(event.target)
  thisRadio.click()
  RadiosBtn.map(
    btn =>
      (btn.className =
        'px-2 position-absolute rounded border border-warning bg-darkblue font-c-primary')
  )
  event.target.className =
    'px-2 position-absolute rounded border border-warning bg-orange font-c-darkblue'
}
const InputRadio_Su = props => {
  return (
    <>
      <Row className="mx-0 px-0 col-12 d-flex justify-content-between">
        {props.selectOptions.map(item => (
          <div
            class="custom-control custom-radio custom-control-inline col-2 mx-0 pr-0"
            style={{
              height: `${props.inputHeight}`,
            }}
          >
            <input
              type="radio"
              id={item.id}
              name={props.id}
              onChange={props.onChange}
              class="custom-control-input"
            />

            <label class="custom-control-label" for={item.id} />
            <button
              name="radio-btn"
              className="px-2 position-absolute rounded border border-warning bg-darkblue font-c-primary"
              style={{
                height: `${props.inputHeight}`,
                left: '-1px',
              }}
              onClick={handleClick(`${item.id}`)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </Row>

      {/* <div class="custom-control custom-radio custom-control-inline col-3">
        <input
          type="radio"
          id="customRadioInline2"
          name="customRadioInline1"
          class="custom-control-input"
        />

        <label class="custom-control-label" for="customRadioInline2" />
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
