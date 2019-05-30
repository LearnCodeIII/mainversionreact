import React from 'react'

const InputFile_Su = props => {
  return (
    <>
      <div
        class="custom-file border-0 rounded"
        style={{
          height: `${props.inputHeight}`,
        }}
      >
        <label
          type="button "
          className="rounded d-flex m-0 border border-warning"
          style={{
            background: '#1F242A',
            // color: '#FFA510',
            height: '42px',
          }}
        >
          <input
            type="file"
            className="custom-file-input border-0 "
            name="forumArticlePic"
            // id={props.id}
            style={{
              height: `${props.inputHeight}`,
              display: 'none',
            }}
            onChange={props.handleArticlePicChange}
          />
          <div className="col-10" />
          <div className="col-2 border-left  border-warning justify-content-center align-items-center d-flex">
            上傳
          </div>
        </label>
        {/* <label
          class="custom-file-label border border-warning"
          style={{
            background: '#1F242A',
            // color: '#FFA510',
            height: `${props.inputHeight}`,
          }}
          for={props.id}
          data-browse=""
        >
          {props.placeholder}
        </label> */}
      </div>
    </>
  )
}
export default InputFile_Su
