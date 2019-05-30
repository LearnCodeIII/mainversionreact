import React from 'react';

class Goback extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return <button onClick={this.goBack}>Go Back</button>;
  }
}

export default Goback;
