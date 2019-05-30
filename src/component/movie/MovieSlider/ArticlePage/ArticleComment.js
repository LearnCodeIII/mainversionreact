import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ResComment from './ResComment'

class ArticleComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resComment: [],
    }
  }
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/articleResComment', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataR = await res.json()
      const resCommemtData = dataR.filter(item => item.rid === +this.props.sid)
      this.setState({ resComment: resCommemtData })
      console.log(resCommemtData)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <Row className="my-3 justify-content-md-center">
          <Col md={8} sm={12} className="box-shadow">
            <div class="media">
              <div class="media-body d-flex py-4">
                <div className="col-md-3 d-flex">
                  <div className="avatar mx-4">
                    <img
                      src="/images/article/test4.jpg"
                      class="mr-3"
                      alt="..."
                    />
                  </div>
                  <div>
                    <div>{this.props.author}</div>
                    <div>{this.props.date}</div>
                  </div>
                </div>
                <div className="col-md-9">{this.props.content}</div>
              </div>
              <div className="commentGroup">讚 留言 分享</div>
            </div>
            {this.state.resComment.map((item, index) => (
              <>
                <ResComment
                  key={index}
                  author={item.author}
                  date={item.date}
                  content={item.content}
                />
              </>
            ))}
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleComment
