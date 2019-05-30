import React from 'react'

const InputSelect_Su = props => {
  return (
    <>
      <div
        class="position-absolute d-flex align-items-center border-0 rounded"
        style={{
          width: '100%',
          height: '100%',
          background: '#1F242A',
        }}
      >
        <i
          class={props.iconRight + ' position-absolute'}
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
        className="custom-select  border border-warning rounded p-0"
        style={{
          width: '100%',
          background: 'rgba(0,0,0,0)',
          color: '#FFA510',
          textAlign: 'center',
          textAlignLast: 'center',
          height: `${props.inputHeight}`,
          zIndex: '10',
        }}
        onChange={props.handleInputTextChange}
      >
        {props.selectOptions.map(item => (
          <option
            key={item.id}
            value={item.id}
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
