import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class ReadMore extends React.Component {
  constructor(props) {
    super(props)
  }
  // console.log(props);
  // const itemid = props.mykey;
  render() {
    return (
      <>
        <Link
          className="link-a"
          to={'/article/' + this.props.sid}
          // onClick={() => this.props.handleClick(1)}
        >
          (繼續閱讀)
        </Link>
      </>
    )
  }
}

export default ReadMore
