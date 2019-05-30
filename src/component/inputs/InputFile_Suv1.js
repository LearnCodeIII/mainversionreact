import React from 'react'

const InputFile_Su = props => {
  return (
    <>
      <div
        className="custom-file border-0 rounded"
        style={{
          height: `${props.inputHeight}`,
        }}
      >
        <input
          type="file"
          className="custom-file-input border-0"
          name={props.id}
          id={props.id}
          style={{
            height: `${props.inputHeight}`,
          }}
        />
        <label
          className="custom-file-label border border-warning"
          style={{
            background: '#1F242A',
            color: '#FFA510',
            height: `${props.inputHeight}`,
          }}
          htmlFor={props.id}
          data-browse=""
        >
          {props.placeholder}
        </label>
      </div>
    </>
  )
}
export default InputFile_Su
