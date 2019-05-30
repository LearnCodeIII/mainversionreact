import React from 'react'

const InputText_Su = props => {
  return (
    <>
      <div
        className="position-absolute d-flex align-items-center border-0 rounded"
        style={{
          // width: '100%',
          width: `${props.inputWidth ? props.inputWidth : '100%'}`,
          height: '100%',
          background: `${
            props.iconLeft
              ? '#1F242A'
              : props.iconRight
              ? 'rgba(0,0,0,0)'
              : '#1F242A'
          }`,
        }}
      >
        <i
          className={props.iconLeft + ' position-absolute'}
          style={{
            background: '#1F242A',
            color: '#FFA510',
            fontSize: `${props.iconLeftSize}`,
            left: `${props.iconLeftSize}`,
            zIndex: `${props.iconLeft ? '0' : '-10'}`,
          }}
        />
      </div>
      <div
        className="position-absolute d-flex align-items-center border-0 rounded"
        style={{
          width: `${props.inputWidth ? props.inputWidth : '100%'}`,
          // width: '100%',
          height: '100%',
          background: `${
            props.iconRight
              ? '#1F242A'
              : props.iconLeft
              ? 'rgba(0,0,0,0)'
              : '#1F242A'
          }`,
        }}
      >
        <i
          className={props.iconRight + ' position-absolute'}
          style={{
            background: '#1F242A',
            color: '#FFA510',
            fontSize: `${props.iconRightSize}`,
            right: `${props.iconRightSize}`,
            zIndex: `${props.iconRight ? '0' : '-10'}`,
          }}
        />
      </div>
      <input
        id={props.id}
        name={props.id}
        type={props.type ? props.type : 'text'}
        onChange={props.onChange}
        className="form-control border border-warning rounded"
        placeholder={props.placeholder}
        autoComplete="off"
        style={{
          background: 'rgba(0,0,0,0)',
          color: '#FFA510',
          textAlign: 'center',
          height: `${props.inputHeight}`,
          width: `${props.inputWidth ? props.inputWidth : '100%'}`,
          zIndex: '10',
        }}
        value={props.value}
      />
    </>
  )
}
export default InputText_Su
