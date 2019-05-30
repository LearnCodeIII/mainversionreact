import React from 'react'
import './table.css'

const MovieTable = props => ({
  render: function() {
    var headerComponents = this.generateHeaders()
    var rowComponents = this.generateRows()
    // var checkJson=this.checkJson()

    const checkJson = () => {
      var iarray = [] //key
      var tarray = [] //value
      let datsProps = props.data
      datsProps.map(element => {
        iarray.push(Object.keys(element))
        tarray.push(Object.values(element))
        // console.log(element)
      })
      console.log(iarray)
      console.log(tarray)
      return iarray, tarray
      // var obj = eval( "(" + props.data + ")");
      // for(var o in obj){
      //       var temp = obj[o];
      //       for(var i = 0 ; i < temp.length; i++){
      //           for(var t in temp[i]){
      //     iarray=iarray.push(i)
      //     tarray=tarray.push(t)
      //               console.log(t + ";" + temp[i][t]);
      //           }
      //       }
      //   }
    }

    return (
      <table className="table-hover ">
        <tr />
        <thead
          style={{
            // 下方style轉放scss
            border: 'solid 2px',
            borderColor: '#FFA510',
            color: '#FFA510',
            backgroundColor: 'rgba(0,0,0,1)',
            // overflow: 'hidden',
            // borderBottom: 'solid 2px',
          }}
        >
          {headerComponents}
        </thead>

        <tbody
          style={{
            // 下方style轉放scss
            borderColor: '#FFA510',
            color: '#D4D1CC',
            backgroundColor: '#394149',
          }}
        >
          {rowComponents}
        </tbody>
      </table>
    )
  },

  generateHeaders: function() {
    var title = this.props.title // [{key, label}]
    console.log(props.title)

    // 產生標題
    return title.map(function(colData) {
      return (
        <th
          key={colData.key}
          style={{
            // 下方style轉放scss
            color: '#FFA510',
            backgroundColor: '#2B333D',
            textAlign: 'center',
            padding: '8px 16px',
          }}
        >
          {colData.label}
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
              padding: '8px 16px',
            }}
          >
            {item[colData.key]}
          </td>
        )
      })
      return (
        <tr
          className="px-2"
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
          {cells}
        </tr>
      )
    })
  },
})

export default MovieTable
