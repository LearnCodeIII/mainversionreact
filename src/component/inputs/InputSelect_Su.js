import React from 'react'

const InputSelect_Su = props => {
  return (
    <>
      <div
        className="position-absolute d-flex align-items-center border-0 rounded"
        style={{
          width: `${props.inputWidth ? props.inputWidth : '100%'}`,
          height: '100%',
          background: '#1F242A',
        }}
      >
        <i
          className={(props.iconRight ? props.iconRight : "fas fa-caret-square-down") + ' position-absolute'}
          style={{
            background: '#1F242A',
            color: '#FFA510',
            fontSize: `${props.iconRightSize}`,
            right: `${props.iconRightSize}`,
            zIndex: '0',
          }}
        />
      </div>
      <select
        id={props.id}
        name={props.id}
        className="custom-select  border border-warning rounded p-0 inputFontSizeSu"
        style={{
          width: `${props.inputWidth ? props.inputWidth : '100%'}`,
          background: 'rgba(0,0,0,0)',
          color: '#FFA510',
          textAlign: 'center',
          textAlignLast: 'center',
          height: `${props.inputHeight}`,
          zIndex: '10',
        }}
        onChange={props.onChange}
      >
        {props.selectOptions.map(item => (
          <option
            key={item.id}
            value={item.id}
            className="inputFontSizeSu"
            style={{ textAlign: 'center', background: '#1F242A' }}
          >
            {item.name}
          </option>
        ))}
      </select>
    </>
  )
}
export default InputSelect_Su
