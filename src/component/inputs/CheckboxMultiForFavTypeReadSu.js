import React from 'react'
//多選專用
const checkedClass =
  'ml-n3 px-3 py-2 border border-warning rounded bg-orange text-darkblue'
const uncheckedClass =
  'ml-n3 px-3 py-2 border border-warning rounded bg-darkblue text-orange'

const CheckboxMultiForFavTypeReadSu = props => {
  // console.log('fav!!!')
  // console.log(props.thisfavType)
  // if (props.thisfavType === undefined) {
  //   return <></>
  // }
  return (
    <>
      <div className="form-check my-3 col-sm-5 col-md-2 d-flex justify-content-center">
        <input
          name={props.inputName}
          className="form-check-input mr-3 ml-1 my-0"
          type="checkbox"
          value={props.optionId}
          id={props.optionId}
          style={{
            height: '100%',
            zIndex: -1,
          }}
          checked={
            props.thisfavType == undefined
              ? false
              : props.thisfavType.find(item => item === props.optionName)
              ? 'true'
              : false
          }
          onChange={props.onChange}
        />
        {/* {props.thisfavType.find(item => item === props.optionName) ? (
          <label className="form-check-label h5" htmlFor={props.optionId}>
            <button
              className={'btn mytransition5 ' + checkedClass}
              onClick={handleCilck(props.optionId)}
            >
              {props.optionName}
            </button>
          </label>
        ) : (
          <label className="form-check-label h5" htmlFor={props.optionId}>
            <button
              className={'btn mytransition5 ' + uncheckedClass}
              onClick={handleCilck(props.optionId)}
            >
              {props.optionName}
            </button>
          </label>
        )} */}
        {props.thisfavType == undefined ? (
          <label className="form-check-label h5" htmlFor={props.optionId}>
            <button className={uncheckedClass} style={{ cursor: 'default' }}>
              {props.optionName}
            </button>
          </label>
        ) : props.thisfavType.find(item => item === props.optionName) ? (
          <label className="form-check-label h5" htmlFor={props.optionId}>
            <button className={checkedClass} style={{ cursor: 'default' }}>
              {props.optionName}
            </button>
          </label>
        ) : (
          <label className="form-check-label h5" htmlFor={props.optionId}>
            <button className={uncheckedClass} style={{ cursor: 'default' }}>
              {props.optionName}
            </button>
          </label>
        )}
      </div>
    </>
  )
}

export default CheckboxMultiForFavTypeReadSu
