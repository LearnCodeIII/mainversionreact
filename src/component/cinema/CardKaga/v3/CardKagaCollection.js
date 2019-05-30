import React from 'react'

const memberId = sessionStorage.getItem('memberId')
class CardKagaCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: '',
    }
  }

  componentDidMount() {
    let trueFalse = String(this.props.collection)
    this.setState({ collection: trueFalse })
    console.log('this.props')
    console.log(trueFalse)
  }

  getIdToBoss = () => {
    const upDateID = this.props.id
    const upDateCollection = this.state.collection === 'true' ? 'false' : 'true'
    this.setState({ collection: upDateCollection })
    this.props.collectionClick(upDateID, upDateCollection)
  }

  render() {
    return (
      <>
        {this.state.collection === 'true' ? (
          <a
            onClick={this.getIdToBoss}
            className="position-absolute"
            //下方style轉放scss
            style={{
              top: '20px',
              right: '20px',
              fontSize: '25px',
              cursor: 'pointer',
              color: '#ffa510',
            }}
          >
            <i className="fas fa-bookmark" />
          </a>
        ) : (
          <a
            onClick={this.getIdToBoss}
            className="position-absolute"
            //下方style轉放scss
            style={{
              top: '20px',
              right: '20px',
              fontSize: '25px',
              cursor: 'pointer',
              color: '#ffa510',
            }}
          >
            <i className="far fa-bookmark" />
          </a>
        )}
      </>
    )
  }
}

export default CardKagaCollection
