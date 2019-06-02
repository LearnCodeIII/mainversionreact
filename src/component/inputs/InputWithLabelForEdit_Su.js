import React from 'react'
import { Row, Col } from 'react-bootstrap'
import InputText_Su from './InputText_Su'
import InputSelectForEdit_Su from './InputSelectForEdit_Su'
import InputFile_Su from './InputFile_Su'
import InputRadio_Su from './InputRadio_Su'
import InputRadioForGenderSu from './InputRadioForGenderSu'
import InputRadioForCinemaTypeSu from './InputRadioForCinemaTypeSu'

//=====InputText_Su、InputSelect_Su、InputFile_Su=====
//----------------使用說明----------------
// 引入該元件的父母層需傳送的props有：(類型皆為String)
// id : 該元件的id
// inputWidth : 設定整個input的寬，ex: '300px'，設定''則為容器寬
// inputWidth : 設定整個input的寬，ex: '300px'，設定''則為容器寬
// inputHeight: 設定整個input的高，ex: '48px'，設定''則會被內容自動撐高
// inputType : 輸入框的類型，目前有3種有效的值:'text'、'selector'、'file'
// inputLabel : 輸入框對應的Label文字
// placeholder: 預設顯示在input內的文字，ex: '我是placeholder'
// iconLeft : input內左側的icon，需代入fontawesome，ex: 'fas fa-envelope'
// iconLeftSiz : input內左側的icon大小，ex: '30px' (有使用icon必填)
// iconRight : input內右側的icon(設定同iconLeft)
// iconRightSize : input內右側的icon大小(設定同iconLeftSize)
// selectOptions : select底下的option選項，(輸入框類型為'selector'的才需要)，值為Object，格式為{ id: String , name : String}

//----------------注意事項----------------
//每個input需使用容器裝起來 (這裡帶入是使用Row-Col)，一個Row為一組input，Col則用來控制input佔比寬
//Row須設定className="my-4"，用來撐開行高
//Col需設定className:
//InputText_Su的左、右icon只能擇一使用
//InputSelect_Su固定使用右icon

//----------------我是分隔線----------------
//=====以下是 Label (col-lg-3) + Input (col-lg-8) 的組合元件======

const InputWithLabelForEdit_Su = props => {
  return (
    <>
      <Row className="my-4">
        <Col // 這裡是lable的col
          lg={3}
          className="d-flex align-items-center justify-content-center"
        >
          <label className="m-0" htmlFor={props.id}>
            {props.inputLabel}
          </label>
        </Col>
        <Col // 這裡是input的col
          lg={8}
          className="p-0 border-0  rounded d-flex flex-nowrap align-items-center"
          // style={{ width: `${props.inputWidth}` }}
        >
          {/* 根據傳入的type來判斷要使用哪一種input */}
          {props.inputType === 'text' ? (
            <InputText_Su
              id={props.id}
              name={props.id}
              placeholder={props.placeholder}
              inputWidth={props.inputWidth}
              inputHeight={props.inputHeight}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              iconRight={props.iconRight}
              iconRightSize={props.iconRightSize}
              onChange={props.onChange}
              value={props.thisData[props.id]}
              thisData={props.thisData}
            />
          ) : props.inputType === 'password' ? (
            <InputText_Su
              id={props.id}
              type="password"
              name={props.id}
              placeholder={props.placeholder}
              inputHeight={props.inputHeight}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              iconRight={props.iconRight}
              iconRightSize={props.iconRightSize}
              onChange={props.onChange}
              value={props.thisData[props.id]}
              thisData={props.thisData}
            />
          ) : props.inputType === 'selector' ? (
            <>
              <InputSelectForEdit_Su
                iconRight={props.iconRight}
                iconRightSize={props.iconRightSize}
                id={props.id}
                name={props.id}
                inputHeight={props.inputHeight}
                selectOptions={props.selectOptions}
                onChange={props.onChange}
                value={props.thisData[props.id]}
                thisData={props.thisData}
              />
            </>
          ) : props.inputType === 'file' ? (
            <InputFile_Su
              inputHeight={props.inputHeight}
              id={props.id}
              name={props.id}
              placeholder={props.placeholder}
              onChange={props.onChange}
              thisData={props.thisData}
              multiple={props.multiple}
              iconRight={props.iconRight ? props.iconRight : "fas fa-upload"}
              iconRightSize={props.iconRightSize}

            />
          ) : props.inputType === 'radio' ? (
            <InputRadio_Su
              inputWidth={props.inputWidth}
              inputHeight={props.inputHeight}
              id={props.id}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              name={props.id}
              selectOptions={props.selectOptions}
              onChange={props.onChange}
              col={props.col}
              value={props.thisData[props.id]}
              thisData={props.thisData}
            />
          ) : props.inputType === 'radioGender' ? (
            <InputRadioForGenderSu
              inputWidth={props.inputWidth}
              inputHeight={props.inputHeight}
              id={props.id}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              name={props.id}
              selectOptions={props.selectOptions}
              onChange={props.onChange}
              col={props.col}
              value={props.thisData[props.id]}
              thisData={props.thisData}
            />
          ) : props.inputType === 'radioCinemaType' ? (
            <InputRadioForCinemaTypeSu
              inputWidth={props.inputWidth}
              inputHeight={props.inputHeight}
              id={props.id}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              name={props.id}
              selectOptions={props.selectOptions}
              onChange={props.onChange}
              col={props.col}
              value={props.thisData[props.id]}
              thisData={props.thisData}
            />
          ) : props.inputType === 'date' ? (
            <InputText_Su
              inputWidth={props.inputWidth}
              inputHeight={props.inputHeight}
              id={props.id}
              iconLeft={props.iconLeft}
              iconLeftSize={props.iconLeftSize}
              name={props.id}
              selectOptions={props.selectOptions}
              onChange={props.onChange}
              col={props.col}
              value={props.thisData[props.id]}
              thisData={props.thisData}
              type="date"
            />
          ) : (
            '找不到符合的input類型'
          )}
        </Col>
      </Row>
    </>
  )
}

export default InputWithLabelForEdit_Su
