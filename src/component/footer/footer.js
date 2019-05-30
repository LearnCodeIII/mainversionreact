import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Row, Col, ListGroup, button, input } from 'react-bootstrap'
import {
  FaEnvelope,
  FaInstagram,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import './footer.css'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="col-md-12 justify-content-center mx-5 px-5">
        <Row className="my-4 justify-content-center">
          <Col className="" md={8}>
            <div className="">
              <h4 className="">聯絡我們</h4>
              <div className="d-flex h3">
                <div className="p-2">
                  <FaEnvelope />
                </div>
                <div className="p-2">
                  <FaInstagram />
                </div>
                <div className="p-2">
                  <FaFacebookSquare />
                </div>
                <div className="p-2">
                  <FaTwitterSquare />
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="">
              <h4 className="mb-3">訂閱我們</h4>

              <div className="input-group" style={{ width: 320 }}>
                <input
                  type="text"
                  className="form-control inp_email"
                  placeholder="Enter your e-mail here"
                />
                <div className="input-group-append">
                  <button className="btn btn_Subscribe nomarginBtn">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col>
            <h4 className="">
              <Link className="nav-link" to="/">
                會員專區
              </Link>
            </h4>
            <ul className="nav flex-column ml-1">
              <li className="nav-item my-2">
                <Link className="nav-link" to="#">
                  個人設定
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的片單
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的書籤
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的活動
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <div>
              <h4 className="">
                <Link className="nav-link" to="/">
                  電影
                </Link>
              </h4>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    電影資料庫
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門電影
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新上映
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    電影搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div>
              <h4>
                <Link className="nav-link" to="/">
                  劇場
                </Link>
              </h4>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場資訊
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場消息
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div>
              <h4>
                <Link className="nav-link" to="/article">
                  電影新聞
                </Link>
              </h4>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/article/3">
                    熱門主題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新消息
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    專欄搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div>
              <h4>
                <Link className="nav-link" to="/">
                  最新活動
                </Link>
              </h4>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門活動
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新活動
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    活動搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div>
              <h4>
                <Link className="nav-link" to="/">
                  主題討論
                </Link>
              </h4>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門話題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新話題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    影評搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="my-5 footer_brand">
          <div className="col-auto h3">.Movieee</div>
          <div className="col-auto mr-auto">
            enjoy life, every day, every one, every thing
          </div>
          <div className="col-auto col-md-4">
            © 2019 .Movieee. All Rights Reserved.
          </div>
        </Row>
      </div>
    )
  }
}

export default Footer
