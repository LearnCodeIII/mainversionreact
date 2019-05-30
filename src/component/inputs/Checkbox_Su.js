import React from 'react'
//單選專用，回傳值為一個字串
const Checkbox_Su = props => {
  return (
    <>
      <div className="form-check my-4">
        <input
          name={props.id}
          className="form-check-input mr-3 my-0"
          type="checkbox"
          value={props.id}
          onChange={props.onChange}
          id={props.id}
          style={{
            height: '100%',
          }}
          // required
        />
        <label className="form-check-label" htmlFor={props.id}>
          {props.text}
        </label>
        {/* <div className="invalid-feedback">{props.checkRemind}</div> */}
      </div>
    </>
  )
}

export default Checkbox_Su
