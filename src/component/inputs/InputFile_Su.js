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
        <label
          className=" d-flex flex-nowrap"
          type="button"
          style={{
            width: `${props.inputWidth ? props.inputWidth : '100%'}`,
            height: `${props.inputHeight}`,
            background: '#1F242A',
            color: '#FFA510',
          }}
        >
          <input
            type="file"
            className="custom-file-input border-0"
            name={props.id}
            id={props.id}
            style={{
              height: `${props.inputHeight}`,
              display: 'none',
            }}
            onChange={props.onChange}
            multiple={props.multiple ? true : false}
          />
          <div
            id={props.id + 'filename'}
            className="col px-0 rounded-left d-flex justify-content-center align-items-center text-center h6 inputFileNameDiv"
            style={{
              height: `${props.inputHeight}`,
              background: '#1F242A',
              // padding: '8px 0',
              overflow:'hidden'
            }}
          >
            <p>{props.placeholder}</p>
          </div>
          <div
            className="rounded-right text-center h6 inputFileChooseBtn"
            style={{
              height: `${props.inputHeight}`,
              background: '#1F242A',
              color: '#FFA510',
              padding: '10px 20px 12px 0',
            }}
          >
            <i className={props.iconRight} style={{fontSize: `${props.iconRightSize}`}}></i>
          </div>
          {/* <label
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
          </label> */}
        </label>
      </div>
    </>
  )
}
export default InputFile_Su
