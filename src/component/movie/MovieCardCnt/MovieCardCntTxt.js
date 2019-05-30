import React from 'react'

const MovieCardCntTxt = props => ({
  render: function() {
    var dtComponents = this.generatedt()
    var ddComponents = this.generatedd()

    return (
        <dl>
        {/* {props.filmData.reduce((acc, item, idx) => {
        	return acc.concat([
          	<dt key={`def-${idx}`}>{item.def}</dt>,
            <dd key={`term-${idx}`}>{item.term}</dd>
          ]);
        }, [])} */}

        {props.filmData.map((mydata , mykey) => {
    return mydata.concat([
      <dt key={props.dtC}>{mykey.dtC}</dt>,
    <dd key={props.ddC}>{mykey.ddC}</dd>
  ]);
})}
      </dl>


      {/* <dl class="row">
      <div class="d-flex">
        {dtComponents}
        {ddComponents}
      </div>
      </dl> */}
    )
  },

  generatedt: function() {
    var dt = this.props.title // [{key, label}]
    console.log(props.title)

    // 產生標題
    return title.map(function(colData) {
      return (
        <dt class="col-sm-3 text-truncate">{props.}</dt>
        <dd class="col-sm-9">{ddComponents}</dd>


        <th
          key={colData.key}
          style={{
            // 下方style轉放scss
            color: '#FFA510',
            backgroundColor: '#2B333D',
            textAlign: 'center',
          }}
        >
          {' '}
          {colData.label}{' '}
        </th>
      )
    })
  },

  generateRows: function() {
    var title = this.props.title, // [{key, label}]
      data = this.props.data
    console.log(data)

    return data.map(function(item) {
      //   產生每列的資料對應每行
      var cells = title.map(function(colData) {
        return (
          <td
            style={{
              // 下方style轉放scss
              border: 'solid 8px',
              borderColor: '#2B333D',
              color: '#D4D1CC',
            }}
          >
            {' '}
            {item[colData.key]}{' '}
          </td>
        )
      })
      return (
        <tr
          key={item.id}
          style={{
            // 下方style轉放scss
            textAlign: 'center',
            border: 'solid 8px',
            borderTop: '0px',
            borderColor: '#2B333D',
            color: '#D4D1CC',
            backgroundColor: '#394149',
          }}
        >
          {' '}
          {cells}{' '}
        </tr>
      )
    })
  },
})

export default MovieCardCntTxt
