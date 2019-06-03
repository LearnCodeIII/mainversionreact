import React from 'react'

class ActivityD3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "./D3.js";
    script.async = true;

    document.body.appendChild(script);
    script.src = "/src/component/activity/ActivityD3/chart.js";
    script.async = true;
    document.body.appendChild(script);
}
  render() {
    return (
      <>
        <div id = 'vis'></div>
        <p>ActivityD3</p>
      </>
    )
  }
}

export default ActivityD3
